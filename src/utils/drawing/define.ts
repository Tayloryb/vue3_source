export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export interface MousePosition {
  x: number;
  y: number;
  originX: number;
  originY: number;
  newOriginX: number;
  newOriginY: number;
  distanceX: number;
  distanceY: number;
  ft_originX: number;
  ft_originY: number;
}

export interface CanvasConfig {
  image: string
  dpr: number
  ratio: number
  lineColor: string
  lineWidth: number
  eraserSize: number
  canvasBgColor: string
}

export type DrawOptions = { container: HTMLElement } & Optional<CanvasConfig, 'canvasBgColor' | 'eraserSize' | 'lineColor' | 'lineWidth' | 'ratio' | 'dpr'>

export enum CANVAS_OPT_TYPE {
  BRUSH = 'brush',
  ERASER = 'eraser',
  PAINTBUCKET = 'paintBucket'
}