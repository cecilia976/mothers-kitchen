import { useToast } from '../../context/ToastContext';
import { HiOutlineXMark, HiOutlineCheckCircle, HiOutlineExclamationCircle, HiOutlineInformationCircle, HiOutlineExclamationTriangle } from 'react-icons/hi2';
import './Toast.css';

const icons = {
  success: HiOutlineCheckCircle,
  error: HiOutlineExclamationCircle,
  warning: HiOutlineExclamationTriangle,
  info: HiOutlineInformationCircle,
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="toast-container" aria-live="polite" aria-label="Notifications">
      {toasts.map(toast => {
        const Icon = icons[toast.type] || icons.info;
        return (
          <div key={toast.id} className={`toast ${toast.type}`} role="alert">
            <Icon className="toast-icon" />
            <span className="toast-message">{toast.message}</span>
            <button className="toast-close" onClick={() => removeToast(toast.id)} aria-label="Dismiss">
              <HiOutlineXMark />
            </button>
          </div>
        );
      })}
    </div>
  );
}
