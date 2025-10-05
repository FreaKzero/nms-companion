import { RefreshCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

import { OptionManagerType } from '../lib/OptionManager';
import { routes } from '../routes';
import usePositionStore from '../stores/usePositionStore';

const SideBar = () => {
  const loc = useLocation();

  const [noSave, setNoSave] = useState(false);

  useEffect(() => {
    const buildSidebar = async () => {
      const settings = await electron.ipcRenderer.invoke('GET_SETTINGS') as OptionManagerType;
      setNoSave(settings.savePath !== '');
    };

    buildSidebar();
  }, []);

  const menu = routes.filter(() => noSave);

  return (
    <div className='fixed top-0 left-0 h-screen w-16 flex flex-col
                    bg-gray-900 shadow-lg'
    >
      <SidebarGetPosition />
      <Divider />
      {menu.map((route, idx) => {
        return route.divider
          ? <Divider key={`loc-${idx}`} />
          : (
            <SideBarIcon key={`loc-${route.location}`} location={route.location} text={route.text} Icon={route.Icon} active={loc.pathname === route.location} />
            );
      })}
    </div>
  );
};

const SidebarGetPosition: React.FC = () => {
  const handleGetCurrentPosition = usePositionStore((state) => state.getCurrent);

  return (
    <div className='sidebar-icon group' onClick={handleGetCurrentPosition}>
      <RefreshCcw size='20' />
      <span className='sidebar-tooltip group-hover:scale-100'>
        Get current position
      </span>
    </div>
  );
};

const SideBarIcon: React.FC<{ Icon: React.FC; location: string; text?: string; active: boolean }> = ({ Icon, location, text = 'tooltip 💡', active = false }) => {
  return (
    <Link to={location}>
      <div className={`${active ? 'sidebar-icon-active' : 'sidebar-icon'} group`}>
        <Icon />
        <span className='sidebar-tooltip group-hover:scale-100'>
          {text}
        </span>
      </div>
    </Link>
  );
};

const Divider = () => <hr className='sidebar-hr' />;

export default SideBar;
