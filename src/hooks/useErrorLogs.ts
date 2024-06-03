const useErrorLogs = () => {
  window.addEventListener('error', (event) => {
    console.log('this is a test error log')
    const errorInfo = {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error,
      pageUrl: window.location.href,
      userAgent: navigator.userAgent,
      stack: event.error.stack
    };

    console.log('errorInfo:', errorInfo);
  })

  window.addEventListener('unhandledrejection', (event) => {
    console.log('this is a test unhandled rejection log')
    const { reason } = event;

    const errorInfo = {
      stack: reason.stack,
      message: reason.message,
      pageUrl: window.location.href,
      userAgent: navigator.userAgent
    };

    console.log('errorInfo:', errorInfo);
  })
}

export {
  useErrorLogs
}