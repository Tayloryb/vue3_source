import { decrypt as aesDecrypt, encrypt as aesEncrypt } from 'crypto-js/aes';
import UTF8, { parse } from 'crypto-js/enc-utf8';
import pkcs7 from 'crypto-js/pad-pkcs7';
import CTR from 'crypto-js/mode-ctr';
import { isNil } from 'lodash';

const cacheConfig = {
  key: '1234567890123456',
  iv: '1234567890123456',
}

interface EncryptionParams {
  key: string;
  iv: string;
}

export interface Encryption {
  encrypt(plainText: string): string;
  decrypt(cipherText: string): string;
}

/**
 * 加密类简单实现
 */
class AesEncryption implements Encryption {
  private readonly key;
  private readonly iv;

  constructor({ key, iv }: EncryptionParams) {
    this.key = parse(key);
    this.iv = parse(iv);
  }

  get getOptions() {
    return {
      mode: CTR, // 加密部分不赘余，自行搜索参数学习
      padding: pkcs7, // 加密部分不赘余，自行搜索参数学习
      iv: this.iv,
    };
  }

  encrypt(plainText: string) {
    return aesEncrypt(plainText, this.key, this.getOptions).toString();
  }

  decrypt(cipherText: string) {
    return aesDecrypt(cipherText, this.key, this.getOptions).toString(UTF8);
  }
}


export interface CreateSmartStorageParams extends EncryptionParams {
  prefixKey: string;
  storage: Storage;
  hasEncrypt: boolean;
  timeout?: number | null;
}
/**
 * localStorage工厂方法实现
 * @param param0 
 * @returns 
 */
export const createSmartStorage = ({
  prefixKey = '',
  storage = localStorage, // 这里其实也可以支持sessionStorage，自行配置
  key = cacheConfig.key, // 修改为自己项目cacheConfig中的key
  iv = cacheConfig.iv, // 修改为自己项目cacheConfig中的iv
  timeout = null,
  hasEncrypt = true,
}: Partial<CreateSmartStorageParams> = {}) => {
  if (hasEncrypt && [key.length, iv.length].some((item) => item !== 16)) {
    throw new Error('When hasEncrypt is true, the key or iv must be 16 bits!');
  }
  // 
  const persistEncryption: Encryption = new AesEncryption({
    key: cacheConfig.key,// 修改为自己项目cacheConfig中的key
    iv: cacheConfig.iv,// 修改为自己项目cacheConfig中的iv
  })
  /**
   * Cache class
   * Construction parameters can be passed intolocalStorage,
   * @class Cache
   * @example
   */
  const SmartStorage = class SmartStorage {
    private storage: Storage;
    private prefixKey?: string;
    private encryption: Encryption;
    private hasEncrypt: boolean;
    /**
     *
     * @param {*} storage
     */
    constructor() {
      this.storage = storage;
      this.prefixKey = prefixKey;
      this.encryption = persistEncryption;
      this.hasEncrypt = hasEncrypt;
    }

    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase();
    }

    /**
     * Set cache
     * @param {string} key
     * @param {*} value
     * @param {*} expire Expiration time in seconds
     * @memberof Cache
     */
    set(key: string, value: any, expire: number | null = timeout) {
      const stringData = JSON.stringify({
        value,
        time: Date.now(),
        expire: !isNil(expire) ? new Date().getTime() + expire * 1000 : null,
      });
      const stringifyValue = this.hasEncrypt ? this.encryption.encrypt(stringData) : stringData;
      this.storage.setItem(this.getKey(key), stringifyValue);
    }

    /**
     * Read cache
     * @param {string} key
     * @param {*} def
     * @memberof Cache
     */
    get(key: string, def: any = null): any {
      const val = this.storage.getItem(this.getKey(key));
      if (!val) return def;

      try {
        const decVal = this.hasEncrypt ? this.encryption.decrypt(val) : val;
        const data = JSON.parse(decVal);
        const { value, expire } = data;
        if (isNil(expire) || expire >= new Date().getTime()) {
          return value;
        }
        this.remove(key);
      } catch (e) {
        return def;
      }
    }

    /**
     * Delete cache based on key
     * @param {string} key
     * @memberof Cache
     */
    remove(key: string) {
      this.storage.removeItem(this.getKey(key));
    }

    /**
     * Delete all caches of this instance
     */
    clear(): void {
      this.storage.clear();
    }
  };
  return new SmartStorage();
};
