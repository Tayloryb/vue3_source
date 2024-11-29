import api from './config/config'
import { MANUFACTURE_TYPES } from '@d/jx3/manufacture'

/**
 * get manufacture list by type
 * @param type {MANUFACTURE_TYPES}
 * @returns 
 */
export const getManufactureList = (type: MANUFACTURE_TYPES) => {
  return api.request({
    method: 'GET',
    url: `/manufacture/list`,
    params: {
      type: type
    }
  })
}