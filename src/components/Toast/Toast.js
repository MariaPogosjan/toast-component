import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from 'react-feather';


import { ToastContext } from '../ToastProvider/ToastProvider';
import VisuallyHidden from '../VisuallyHidden';

import styles from './Toast.module.css';

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({ id, children, variant }) {
  const { disMiss } = React.useContext(ToastContext);
  const className = `${styles.toast} ${styles[variant]}`;
  const Icon = ICONS_BY_VARIANT[variant]

  return (
    <div className={className}>
      <div className={styles.iconContainer}>
        <Icon size={24} />
      </div>
      <p className={styles.content}>
        <VisuallyHidden>{variant} -</VisuallyHidden>
        {children}
      </p>
      <button 
        aria-label="Dismiss message"
        aria-live="off"
        className={styles.closeButton}
      >
        <X size={24} onClick={() => disMiss(id)}/>
        <VisuallyHidden>Dismiss message</VisuallyHidden>
      </button>
    </div>
  );
}

export default Toast;
