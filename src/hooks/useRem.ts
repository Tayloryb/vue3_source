import { throttle } from 'lodash-es'

const maxWidth = 1560
const baseFontSize = 20

export const useRem = () => {

  const setRem = throttle((width: number) => {
    const rem = baseFontSize * (width / maxWidth)
    document.documentElement.style.fontSize = `${rem}px`
  }, 500)

  const init = () => {
    const width = document.documentElement.clientWidth
    setRem(width > maxWidth ? maxWidth : width)
  }

  init()
  window.addEventListener('resize', init)
}

/**
 * px to rem
 * @param px number 
 * @returns 
 */
export const px2rem = (px: number, places = 9) => {
  return `${(px / baseFontSize).toFixed(places)}rem`
}
