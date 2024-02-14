import React, {ReactNode, createContext, useContext, useState} from 'react';
import {
  Toast as UILibToast,
  ToastProps,
} from 'react-native-ui-lib/src/incubator';

type ToastContextType = {
  show: (msg: string, cfg?: ToastProps) => void;
};

const ToastContext = createContext<ToastContextType>({
  show: () => {},
});

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({children}: {children: ReactNode}) => {
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState<ToastProps>({});

  const show = (msg: string, cfg?: ToastProps) => {
    const dismiss = 3000;

    setVisible(true);
    setConfig({
      message: msg,
      position: 'bottom',
      autoDismiss: dismiss,
      ...cfg,
    });

    setTimeout(() => {
      setVisible(false);
    }, dismiss);
  };

  return (
    <ToastContext.Provider value={{show}}>
      <UILibToast visible={visible} {...config} />
      {children}
    </ToastContext.Provider>
  );
};
