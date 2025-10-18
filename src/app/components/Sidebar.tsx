import { RefreshCcwDot } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

import Timer from './Timer';

import { RouteItem, routes } from '../routes';
import useMissionsStore from '../stores/useMissionsStore';
import useRedditStore from '../stores/useRedditStore';
import { useAutoRefreshStore } from '../stores/useRefreshStore';

const SideBar = () => {
  const loc = useLocation();
  const newEntries = useRedditStore((s) => s.newEntries);
  const needSettlementAction = useMissionsStore((s) => s.needAction);

  const getBadgeCount = (route: RouteItem) => {
    let badgeCount = 0;
    if (route.location === '/reddit') {
      badgeCount = newEntries;
    }

    if (route.location === '/') {
      badgeCount = needSettlementAction;
    }

    return badgeCount;
  };

  return (
    <div className='fixed top-0 left-0 h-screen w-16 flex flex-col
                    bg-gray-900 shadow-lg'
    >
      <SidebarAutorefresh />
      {routes.map((route, idx) => {
        return route.divider
          ? <Divider key={`loc-${idx}`} />
          : route.Icon !== null
            ? (
              <SideBarIcon badgeCount={getBadgeCount(route)} key={`loc-${route.location}`} location={route.location} text={route.text} Icon={route.Icon} active={loc.pathname === route.location} />
              )
            : null;
      })}
    </div>
  );
};

const SidebarAutorefresh: React.FC = () => {
  const error = useMissionsStore((s) => s.error);
  const nav = useNavigate();
  const toggleAutoRefresh = useAutoRefreshStore((s) => s.toggleAutoRefresh);
  const stopAutoRefresh = useAutoRefreshStore((s) => s.stop);
  const autoRefresh = useAutoRefreshStore((s) => s.autoRefresh);

  useEffect(() => {
    if (error) {
      stopAutoRefresh();
      nav('/settings');
    }
  }, [error]);

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
interface SideBarIconProps {
  Icon: React.FC;
  location: string;
  text?: string;
  active?: boolean;
  badgeCount?: number;
}

const SideBarIcon: React.FC<SideBarIconProps> = ({
  Icon,
  location,
  text = 'tooltip 💡',
  active = false,
  badgeCount
}) => {
  return (
    <Link to={location}>
      <div className={`${active ? 'sidebar-icon-active' : 'sidebar-icon'} group relative`}>
        <Icon />

        <span className='sidebar-tooltip group-hover:scale-100'>
          {text}
        </span>

        {badgeCount !== undefined && badgeCount > 0 && (
          <div
            className='absolute top-1 right-1 translate-x-2 -translate-y-2 bg-gradient-to-t from-amber-700 to-amber-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md'
            style={{ textShadow: '1px 1px 0px black' }}
          >
            {badgeCount > 99 ? '99+' : badgeCount}
          </div>
        )}
      </div>
    </Link>
  );
};

const Divider = () => <hr className='sidebar-hr' />;

export default SideBar;
