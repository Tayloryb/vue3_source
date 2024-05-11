/** 服务器返回的code */
export enum ServerCode {
  /** 成功 */
  SUCCESS = 0,
  /** 错误的token */
  WRONG_TOKEN = 1000,
  /** token不能为空 */
  EMPTY_TOKEN = 1003,
  /** token已过期 */
  EXPIRE_TOKEN = 3000,
}
