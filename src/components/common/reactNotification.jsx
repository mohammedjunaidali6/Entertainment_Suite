import { NotificationManager } from 'react-notifications';

export default function createNotification(type,msg) {
      switch (type) {
        case 'info':
          NotificationManager.info(msg);
          break;
        case 'success':
          NotificationManager.success(msg);
          break;
        case 'warning':
          NotificationManager.warning(msg);
          break;
        case 'error':
          NotificationManager.error(msg);
          break;
      }
  };
