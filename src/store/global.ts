import { defineStore } from "pinia";
import { Storage } from '@/utils/store/index'
type Store = {
  userToken: string
}

const LOCAL_TOKEN = 'LOCAL_TOKEN'

export const useGlobalStore = defineStore('common', {
  state: (): Store => ({
    userToken: ''
  }),
  getters: {
    isLogin: (state) => !!state.userToken
  },
  actions: {
    setUserToken(payload: string) {
      this.userToken = payload
      Storage.set(LOCAL_TOKEN, payload)
    },
    init() {
      this.userToken = Storage.get(LOCAL_TOKEN)
    }
  }
})