import { createSmartStorage } from "./storage";

const Storage = createSmartStorage({
  prefixKey: 'vue3-admin__',
  hasEncrypt: true,
});

const Session = createSmartStorage({
  prefixKey: 'vue3-admin__',
  hasEncrypt: true,
  storage: sessionStorage,
});

export {
  Storage,
  Session,
};