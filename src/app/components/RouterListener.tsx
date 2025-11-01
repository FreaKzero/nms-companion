import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

let initialized = false;
export default function RouterListener (): any {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (_event: any, route: string) => {
      navigate(route);
    };

    if (!initialized) {
      electron.ipcRenderer.on('MENU-ROUTE', handler);
    }

    initialized = true;
  }, [navigate]);

  return null;
}
