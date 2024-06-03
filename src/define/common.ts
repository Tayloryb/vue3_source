export type ErrorInfo = {
  type: 'js_error' | 'promise_rejection'
  message: string
  stack: string
  page_url: string
  user_agent: string
}

export type JSErrorInfo = ErrorInfo & {
  type: 'js_error'
  filename: string
  lineno: number
  colno: number
  error: Error
}

export type PromiseRejectionInfo = ErrorInfo & {
  type: 'promise_rejection'
}
