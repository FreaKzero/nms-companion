import { PlusCircle, ListChecksIcon, MapPlusIcon, SettingsIcon, MapPinIcon, TestTube, Globe } from 'lucide-react';

import SettingsPage from './lib/Settings';
import CurrentPage from './screens/Current';
import ListPage from './screens/List';
import ManualPage from './screens/Manual';
import MissionsPage from './screens/Missions';
import RedditPage from './screens/Reddit';
import TestPage from './screens/Test';

export const routes = [
  {
    text: 'Missions',
    location: '/',
    Icon: ListChecksIcon,
    Component: MissionsPage,
    order: 1,
    index: true
  },
  {
    text: 'Locations',
    location: '/list',
    Icon: MapPinIcon,
    Component: ListPage,
    order: 2
  },
  {
    divider: true,
    order: 3
  },
  {
    text: 'Add Current Location',
    location: '/current',
    Icon: PlusCircle,
    Component: CurrentPage,
    order: 4
  },
  {
    text: 'Add Manual Location',
    location: '/manual',
    Icon: MapPlusIcon,
    Component: ManualPage,
    order: 5
  },
  {
    divider: true,
    order: 6
  },
  {
    text: 'Reddit Feed',
    location: '/reddit',
    Icon: Globe,
    Component: RedditPage,
    order: 7
  },
  {
    text: 'Settings',
    location: '/settings',
    Icon: SettingsIcon,
    Component: SettingsPage,
    order: 8
  },
  {
    text: 'dev',
    location: '/dev',
    Icon: TestTube,
    Component: TestPage,
    order: 9
  }

].sort((a, b) => a.order - b.order);
