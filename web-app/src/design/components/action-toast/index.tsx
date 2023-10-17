import React from 'react';
import { Id, Slide, ToastContainer, ToastContainerProps, ToastContent, TypeOptions, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToasterProps {
  className?: string;
  children?: ToastContent;
}

export const Toaster: React.FC<ToasterProps> = ({ className: additionalClassName = '', children }) => {
  const componentClassName = 'c-toaster';
  const className = `${componentClassName} ${additionalClassName}`.trim();

  return (
    <div className={className}>
      <>{children}</>
    </div>
  );
};

let toastId: Id | null = null;

export const NotifyToast = (label?: React.ReactNode, type?: TypeOptions, onOpen?: () => void) => {
  if (toastId && toast.isActive(toastId)) toast.dismiss(toastId);

  if (label) {
    toastId = toast(label, {
      delay: 200,
      type,
      onOpen: () => {
        onOpen?.();
      },
    });
  } else {
    onOpen?.();
  }
};

export const ActionToast: React.FC<ToastContainerProps> = props => (
  <ToastContainer
    {...props}
    transition={Slide}
    autoClose={4000}
    position="top-right"
    newestOnTop
    enableMultiContainer
    closeOnClick
    closeButton={false}
    theme="colored"
  />
);
