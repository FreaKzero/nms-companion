import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RouterListener (): any {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (_event: any, route: string) => {
      navigate(route);
    };

    electron.ipcRenderer.on('MENU-ROUTE', handler);

    return () => {
      electron.ipcRenderer.removeListener('MENU-ROUTE', handler);
    };
  }, [navigate]);

  return null;
}
