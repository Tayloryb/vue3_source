import { defineStore } from 'pinia'
import { MANUFACTURE_TYPES, ManufactureResponse } from '@/define/jx3/manufacture'
import { Storage } from '@/utils/store'

const LOCAL_STORAGE_KEY = 'my-manufacture'

interface ManufactureStore {
  favoriteManufactures: ManufactureResponse[],
  isInit: boolean
}
export const useManufactureStore = defineStore('manufacture', {
  state: (): ManufactureStore => ({
    favoriteManufactures: [],
    isInit: false
  }),
  getters: {
    favoriteManufactureMap: (state) => {
      const map = new Map<string, ManufactureResponse>()
      state.favoriteManufactures.forEach((item) => {
        map.set(item.id, item)
      })
      return map
    }
  },
  actions: {
    init() {
      if (this.isInit) {
        return
      }
      const favoriteManufactures: ManufactureResponse[] = Storage.get(LOCAL_STORAGE_KEY) || []
      this.favoriteManufactures = favoriteManufactures
      this.isInit = true
    },
    addFavoriteManufacture(manufacture: ManufactureResponse) {
      if (this.favoriteManufactureMap.has(manufacture.id)) {
        return
      }
      this.favoriteManufactures.push(manufacture)
      Storage.set(LOCAL_STORAGE_KEY, this.favoriteManufactures)
    },
    removeFavoriteManufacture(manufacture: ManufactureResponse) {
      const index = this.favoriteManufactures.findIndex((item) => item.id === manufacture.id)
      if (index !== -1) {
        this.favoriteManufactures.splice(index, 1)
        Storage.set(LOCAL_STORAGE_KEY, this.favoriteManufactures)
      }
    },
    getFavoriteManufactureByType(type: MANUFACTURE_TYPES) {
      return this.favoriteManufactures.filter((item) => item.type === type)
    }
  }
})