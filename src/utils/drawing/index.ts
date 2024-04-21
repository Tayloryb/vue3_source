// import type { CanvasConfig, DrawOptions } from './define'
// import { CANVAS_OPT_TYPE } from './define'

// /**
//  * Converts window coordinates to canvas coordinates.
//  * @param canvas - The HTMLCanvasElement.
//  * @param canvas_styles - The computed style of the canvas.
//  * @param x - The X coordinate in window space.
//  * @param y - The Y coordinate in window space.
//  * @returns Object with converted X and Y coordinates.
//  */
// function windowToCanvas(canvas: HTMLCanvasElement, canvas_styles: CSSStyleDeclaration, x: number, y: number): { x: number, y: number } {
//   const cbox = canvas.getBoundingClientRect();
//   return {
//     x: (x - cbox.left - parseInt(canvas_styles.paddingLeft || '0') - parseInt(canvas_styles.borderLeftWidth || '0'))
//       * (canvas.width / (parseInt(canvas_styles.width || '0') || 1)),
//     y: (y - cbox.top - parseInt(canvas_styles.paddingTop || '0') - parseInt(canvas_styles.borderTopWidth || '0'))
//       * (canvas.height / (parseInt(canvas_styles.height || '0') || 1)),
//   };
// }

// class Draw {
//   private container: HTMLElement;
//   private mode: CANVAS_OPT_TYPE = CANVAS_OPT_TYPE.BRUSH;
//   private canvas: HTMLCanvasElement | null = null;
//   private context: CanvasRenderingContext2D | null = null;
//   private isDrawing = false;
//   private originX: number | null = null;
//   private originY: number | null = null;
//   private history: ImageData[] = [];
//   private historyIndex: number = -1;
//   private brushCursor: HTMLDivElement | null = null;
//   private onChange: ((canUndo: boolean, canRedo: boolean) => void) | null = null;

//   private config: CanvasConfig = {
//     image: '',
//     dpr: window.devicePixelRatio || 1,
//     ratio: 1,
//     lineColor: '#f00',
//     lineWidth: 1,
//     eraserSize: 10,
//     canvasBgColor: '#fff',
//   }

//   constructor(private options: DrawOptions, onChange?: (canUndo: boolean, canRedo: boolean) => void) {
//     this.container = options.container
//     this.createCanvasOuterBox(options.container);
//     this.createCanvasEl();
//     this.init(options);
//     // 设置回调函数
//     this.onChange = onChange || null;
//   }

//   /**
//    * Check if undo operation is possible.
//    * @returns Boolean indicating whether undo is possible.
//    */
//   get canUndo(): boolean {
//     return this.historyIndex > 0;
//   }

//   /**
//    * Check if redo operation is possible.
//    * @returns Boolean indicating whether redo is possible.
//    */
//   get canRedo(): boolean {
//     return this.historyIndex < this.history.length - 1;
//   }
//   get dohistory(): any {
//     return this.history;
//   }
//   /**
//    * Get the current brush size.
//    * @returns The current brush size.
//    */
//   get brushSize(): number {
//     return this.config.lineWidth
//   }

//   /**
//    * Get the current eraser size.
//    * @returns The current eraser size.
//    */
//   get eraserSize(): number {
//     return this.config.eraserSize
//   }
//   /**
//    * Creates the outer container for the canvas.
//    * @param target - The HTML element to append the container to.
//    */
//   private createCanvasOuterBox(target: HTMLElement) {
//     const canvasOuterBoxDom = document.createElement('div');
//     canvasOuterBoxDom.style.height = '100%';
//     canvasOuterBoxDom.style.width = '100%';
//     canvasOuterBoxDom.style.position = 'relative';
//     canvasOuterBoxDom.style.top = '0';
//     target.appendChild(canvasOuterBoxDom);
//     this.container = canvasOuterBoxDom
//   }

//   /**
//    * Creates the canvas element and appends it to the container.
//    */
//   private createCanvasEl() {
//     this.canvas = document.createElement('canvas') as HTMLCanvasElement;
//     if (this.canvas) {
//       this.canvas.style.height = '100%';
//       this.canvas.style.width = '100%';
//       this.canvas.width = this.container.clientWidth;
//       this.canvas.height = this.container.clientHeight;
//       this.container.appendChild(this.canvas);
//       this.context = this.canvas.getContext('2d', { willReadFrequently: true });
//     }
//   }

//   /**
//    * Initializes the drawing canvas and sets up event listeners.
//    * @param options - Options for configuring the drawing canvas.
//    */
//   private init(options: DrawOptions) {
//     // init config
//     if (options) {
//       options.canvasBgColor && (this.config.canvasBgColor = options.canvasBgColor)
//       options.dpr && (this.config.dpr = options.dpr)
//       options.eraserSize && (this.config.eraserSize = options.eraserSize)
//       options.image && (this.config.image = options.image)
//       options.lineColor && (this.config.lineColor = options.lineColor)
//       options.lineWidth && (this.config.lineWidth = options.lineWidth)
//       options.ratio && (this.config.ratio = options.ratio)
//     }
//     if (this.canvas && this.context) {
//       this.context.lineCap = 'round';
//       // 初始化时保存初始状态
//       this.clear();
//       this.setBackground();
//       this.canvas.addEventListener('mousedown', this.mouseDown.bind(this));
//       this.canvas.addEventListener('mousemove', this.mouseMove.bind(this));
//       this.canvas.addEventListener('mouseup', this.endOfDrawing.bind(this));
//       this.canvas.addEventListener('mouseleave', this.endOfDrawing.bind(this));
//     }
//   }
  
//    /**
//    * Event handler for mouse down event.
//    * @param event - The MouseEvent object.
//    */
//   private mouseDown(event: MouseEvent) {
//     if (this.canvas) {
//       this.isDrawing = true;

      
//       const canvas_style = window.getComputedStyle(this.canvas)
//       const { x, y } = windowToCanvas(this.canvas, canvas_style, event.clientX, event.clientY)
//       this.originX = x;
//       this.originY = y;

//       // 隐藏原本的鼠标样式
//      this.canvas.style.cursor = 'none';
//       // 创建并显示光标
//       this.createBrushCursor(x, y);
//     }

//   }

//    /**
//    * Event handler for mouse move event.
//    * @param event - The MouseEvent object.
//    */
//   private mouseMove(event: MouseEvent) {
//     if (this.isDrawing && this.canvas && this.context) {
//       const canvas_style = window.getComputedStyle(this.canvas);
//       const { x, y } = windowToCanvas(this.canvas, canvas_style, event.clientX, event.clientY);
  
//       // 更新画笔光标的位置
//       this.updateBrushCursor(x, y);
  
//       // 绘制路径
//       this.handleDrawing(x, y);
//       // 更新起始点
//       this.originX = x;
//       this.originY = y;

//     }
//   }

//   /**
//    * Handles the drawing based on the current mode.
//    * @param x - The X coordinate in canvas space.
//    * @param y - The Y coordinate in canvas space.
//    */
//   private handleDrawing(x: number, y: number) {
//     switch (this.mode) {
//       case 'brush':
//         this.handleBrush(x, y);
//         break;
//       case 'eraser':
//         this.handleErasing(x, y);
//         break;
//       case 'paintBucket':
//         this.handlePaintBucket(x, y);
//         break;
//     }
//   }

//   private handleBrush(x: number, y: number) {
//     // 画笔逻辑
//     if (this.context) {
//       this.context.beginPath();
//       this.context.moveTo(this.originX || 0, this.originY || 0);
//       this.context.lineTo(x, y);
//       this.context.strokeStyle = this.config.lineColor;
//       this.context.lineWidth = this.config.lineWidth;
//       this.context.stroke();
//     }
//   }


//   private handleErasing(x: number, y: number) {
//     if (this.context) {
//       // 擦除操作
//       this.context.globalCompositeOperation = 'destination-out';
//       this.context.beginPath();
//       this.context.arc(x, y, this.config.eraserSize / 2, 0, Math.PI * 2);
//       this.context.fill();
//       this.context.globalCompositeOperation = 'source-over';
//     }
//   }


//   private handlePaintBucket(x: number, y: number) {
//     // 油漆桶逻辑
//     // 其他绘制逻辑...
//     console.log('x, y :>> ', x, y);
//   }


//   private updateBrushCursor(x: number, y: number) {
//     if (this.brushCursor) {
//       this.brushCursor.style.left = `${x - this.config.lineWidth / 2}px`;
//       this.brushCursor.style.top = `${y - this.config.lineWidth / 2}px`;
//     }
//   }

//   private createBrushCursor(left: number, top: number) {
//     this.brushCursor = document.createElement('div');
//     this.brushCursor.style.position = 'absolute';
//     this.brushCursor.style.border = '2px solid #6C8AFF';
//     this.brushCursor.style.borderRadius = '50%';
//     this.brushCursor.style.pointerEvents = 'none';
//     if (this.mode === CANVAS_OPT_TYPE.BRUSH) {
//       this.brushCursor.style.backgroundColor = 'rgba(108, 138, 255, 0.8)';
//       this.brushCursor.style.width = `${this.config.lineWidth}px`;
//       this.brushCursor.style.height = `${this.config.lineWidth}px`;
//     } else if (this.mode === CANVAS_OPT_TYPE.ERASER) {
//       this.brushCursor.style.borderColor = '#FFFFFF'
//       this.brushCursor.style.width = `${this.config.eraserSize}px`;
//       this.brushCursor.style.height = `${this.config.eraserSize}px`;
//     }
//     this.brushCursor.style.left = `${left}px`
//     this.brushCursor.style.top = `${top}px`
//     this.container.appendChild(this.brushCursor);
//   }

//   private removeBrushCursor() {
//     if (this.brushCursor && this.container) {
//       this.container.removeChild(this.brushCursor);
//       this.brushCursor = null;
//     }
//   }

//   private endOfDrawing() {
//     if (this.isDrawing && this.canvas && this.context) {
      
//       this.addHistory();
      
//       // 恢复原本的鼠标样式
//       this.canvas.style.cursor = 'default';
//       // 重置状态
//       this.isDrawing = false;
//       this.originX = null;
//       this.originY = null;
  
//       // 移除画笔光标
//       this.removeBrushCursor();
//     }
//   }

//    /**
//    * Adds the current canvas state to the history.
//    */
//   private addHistory() {
//     if (this.canvas && this.context) {
//       const imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
//       this.historyIndex++;
//       this.history.splice(this.historyIndex);
//       this.history.push(imageData);
//       if (this.onChange) {
//         this.onChange(this.canUndo, this.canRedo);
//       }
//     }
//   }

//   private setBackground() {
//     if (this.canvas && this.context) {
//       this.context.globalCompositeOperation = 'destination-out'
//       this.context.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight)
//       this.canvas.style.background = `url(${this.config.image})`
//       this.canvas.style.backgroundSize = '100% 100%'
//       this.canvas.style.backgroundPosition = 'center'
//       this.canvas.style.backgroundRepeat = 'no-repeat'
//       this.context.globalCompositeOperation = 'source-over'
//     }
//   }

//   private download(dataURL: string, fileName: string) {
//     const link = document.createElement('a');
//     link.href = dataURL;
//     link.download = fileName;
//     link.click();
// }

//   // Public API
//   public setMode(mode: CANVAS_OPT_TYPE) {
//     this.mode = mode;
//   }

//   public undo() {
//     if (this.canvas && this.context && this.historyIndex > 0) {
//       this.historyIndex--;
//       const imageData = this.history[this.historyIndex];
//       this.context.putImageData(imageData, 0, 0);
//       if (this.onChange) {
//         this.onChange(this.canUndo, this.canRedo);
//       }
//     }
//   }

//   public redo() {
//     if (this.canvas && this.context && this.historyIndex < this.history.length - 1) {
//       this.historyIndex++;
//       const imageData = this.history[this.historyIndex];
//       this.context.putImageData(imageData, 0, 0);
//       if (this.onChange) {
//         this.onChange(this.canUndo, this.canRedo);
//       }
//     }
//   }

//   public saveImg(options: { type: string; fileName: string }) {
//     if (this.canvas) {
//       const dataURL = this.canvas.toDataURL(options.type);
//       this.download(dataURL, options.fileName);
//     }
//   }

//   public saveMask(options: { type: string; fileName: string }) {
//     if (this.canvas) {
//       // 保存当前画布内容
//       const originalData = this.canvas.toDataURL();

//       // 设置画布背景为透明
//       this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);

//       // 保存蒙版内容
//       const dataURL = this.canvas.toDataURL(options.type);
//       this.download(dataURL, options.fileName);

//       // 恢复原始画布内容
//       const img = new Image();
//       img.src = originalData;
//       img.onload = () => {
//         this.context?.drawImage(img, 0, 0);
//       };
//     }
//   }

//   public clear(record = true) {
//     if (this.canvas && this.context) {
//       // 清除画布上的所有绘制内容
//       this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

//       // 重置背景
//       this.setBackground();

//       // 如果需要清除历史记录
//       if (record) {
//         this.history = [];
//         this.historyIndex = -1;
//       }
//       this.addHistory()
//     }
//   }

//   public setBrushSize(size: number) {
//     if (size > 0) {
//       this.config.lineWidth = size;
//     }
//   }

//   public setEraserSize(size: number) {
//     if (size > 0) {
//       this.config.eraserSize = size;
//     }
//   }
// }

// export default Draw;
