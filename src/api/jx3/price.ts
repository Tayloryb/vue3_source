import api from './config/config'

export const getGoodsInfo = (keyword: string) => {
  return api.request({
    method: 'GET',
    url: `https://node.jx3box.com/item/name/${keyword}`,
    params: {
      page: 1,
      per: 10
    }
  })
}

export const getPriceItems = (ids: string[], server = '龙争虎斗') => {
  return api.request({
    method: 'POST',
    url: '/getPrice',
    data: {
      server: server,
      item_ids: ids
    }
  })
}

