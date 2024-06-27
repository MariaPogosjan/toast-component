import React from 'react';

export const ToastContext = React.createContext();

import useKey from '../../hooks/use-key';

function ToastProvider({children}) {

  const [toasts, setToasts] = React.useState([
    {
      id: crypto.randomUUID(),
      message: 'It works',
      variant: 'notice',
    }, 
    {
      id: crypto.randomUUID(),
      message : 'This is a warning message', 
      variant: 'warning'
    }
  ]);

  function createToast(message, variant) {
    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      }
    ]

    setToasts(nextToasts);
  }

  function disMiss(id) {
    const nextToasts = toasts.filter(toast => {
      return toast.id !== id
    })
    setToasts(nextToasts)
  }

  const handleEscape = React.useCallback(() => {
    setToasts([])
  }, []);

  useKey('Escape', handleEscape);


  return <ToastContext.Provider value={{ toasts, createToast, disMiss }}>{children}</ToastContext.Provider>;
}

export default ToastProvider;
