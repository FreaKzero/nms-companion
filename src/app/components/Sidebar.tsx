import { RefreshCcw } from 'lucide-react';
import { Link, useLocation } from 'react-router';

import routes from '../routes';
import usePositionStore from '../stores/usePositionStore';

const SideBar = () => {
  const loc = useLocation();

  return (
    <div className='fixed top-0 left-0 h-screen w-16 flex flex-col
                    bg-gray-900 shadow-lg'
    >
      <SidebarGetPosition />
      <Divider />
      {routes.map((route, idx) => {
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
