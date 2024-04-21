export const isHTMLElement = (el: HTMLElement | string): el is HTMLElement => {
  return el instanceof HTMLElement
}

export const isString = (el: HTMLElement | string): el is string => {
  return typeof el === "string"
}