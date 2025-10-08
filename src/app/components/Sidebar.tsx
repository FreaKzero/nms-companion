import { RefreshCcw, RefreshCcwDot } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

import Timer from './Timer';

import { routes } from '../routes';
import useMissionsStore from '../stores/useMissionsStore';

const SideBar = () => {
  const loc = useLocation();

  return (
    <div className='fixed top-0 left-0 h-screen w-16 flex flex-col
                    bg-gray-900 shadow-lg'
    >
      <SidebarAutorefresh />
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

const SidebarAutorefresh: React.FC = () => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const getMissions = useMissionsStore((s) => s.getMissions);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const error = useMissionsStore((s) => s.error);
  const nav = useNavigate();

  const toggleAutoRefresh = () => {
    getMissions();
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setAutoRefresh(false);
    } else {
      intervalRef.current = setInterval(() => getMissions(), 2 * 60 * 1000);
      setAutoRefresh(true);
    }
  };

  useEffect(() => {
    if (error) {
      nav('/settings');
    }
  }, [error]);

  useEffect(() => {
    getMissions();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      <div className='sidebar-icon group' onClick={toggleAutoRefresh}>
        {autoRefresh
          ? (
            <RefreshCcwDot className='w-6 h-6 animate-spin-pause' />
            )
          : (
            <RefreshCcwDot className='w-6 h-6' />
            )}
        <span className='sidebar-tooltip group-hover:scale-100'>
          Toggle Auto Refresh (2 min.)
        </span>
      </div>
      {autoRefresh ? <Timer active={autoRefresh} /> : <Divider />}
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
