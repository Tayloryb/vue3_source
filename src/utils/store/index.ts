import { createSmartStorage } from "./storage";
console.log(import.meta.env.MODE)
const hasEncrypt = import.meta.env.MODE !== 'development'
const Storage = createSmartStorage({
  prefixKey: 'vue3-admin__',
  hasEncrypt,
});

const Session = createSmartStorage({
  prefixKey: 'vue3-admin__',
  hasEncrypt,
  storage: sessionStorage,
});

export {
  Storage,
  Session,
};