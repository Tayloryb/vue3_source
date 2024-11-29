export enum MANUFACTURE_TYPES {
  'COOKING' = 'cooking', // 烹饪
  'TAILORING' = 'tailoring', // 缝纫
  'MEDICINE' = 'medicine', // 制药
  'FOUNDING' = 'founding', // 锻造
  'FURNITURE' = 'furniture' // 梓匠
}

export const MANUFACTURE_LIST = [
  {
    value: MANUFACTURE_TYPES.COOKING,
    label: '烹饪'
  },
  {
    value: MANUFACTURE_TYPES.TAILORING,
    label: '缝纫'
  },
  {
    value: MANUFACTURE_TYPES.MEDICINE,
    label: '制药'
  },
  {
    value: MANUFACTURE_TYPES.FOUNDING,
    label: '锻造'
  },
  {
    value: MANUFACTURE_TYPES.FURNITURE,
    label: '梓匠'
  }
]

export interface ManufactureResponse {
  id: string
  name: string
  n_level: number
  belong: number
  quality: number
  type: MANUFACTURE_TYPES
}