interface PageLayoutOptions {
  width?: number
  MaxContainerWidth: number
  asideWidth?: number
  gap?: number
}

export interface PageLayout {
  asideWidth: number
  contentWidth: number
  paddingLeft: number
  gap: number
}

/**
 * 左右布局
 * @param options 
 * @returns 
 */
export const usePageLayout = (options: PageLayoutOptions): PageLayout => {
  const viewPortWidth = options.width || document.documentElement.clientWidth
  const contentWidth = viewPortWidth > options.MaxContainerWidth ? options.MaxContainerWidth : viewPortWidth
  const gap = options.gap || 0
  if (!contentWidth) {
    return {
      asideWidth: 0,
      contentWidth: 0,
      paddingLeft: 0,
      gap: 0,
    }
  }
  const asideWidth = options.asideWidth || 0
  const paddingLeft = viewPortWidth > options.MaxContainerWidth ? Math.floor((viewPortWidth - options.MaxContainerWidth) / 2) : 0
  return {
    asideWidth,
    contentWidth: contentWidth - asideWidth - gap,
    paddingLeft,
    gap,
  }
}