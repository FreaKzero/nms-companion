import { PlusCircle, ListChecksIcon, MapPlusIcon, ListTodo, SettingsIcon } from 'lucide-react';

import SettingsPage from './lib/Settings';
import CurrentPage from './screens/Current';
import ListPage from './screens/List';
import ManualPage from './screens/Manual';
import MissionsPage from './screens/Missions';

const routes = [
  {
    text: 'Add Current Position',
    location: '/current',
    Icon: PlusCircle,
    Component: CurrentPage,
    order: 1
  },
  {
    text: 'Add Manual Position',
    location: '/manual',
    Icon: MapPlusIcon,
    Component: ManualPage,
    order: 2
  },
  {
    text: 'Missions',
    location: '/',
    Icon: ListTodo,
    Component: MissionsPage,
    order: 3
  },
  {
    text: 'List',
    location: '/list',
    Icon: ListChecksIcon,
    Component: ListPage,
    order: 4
  },
  {
    divider: true
  },
  {
    text: 'Settings',
    location: '/settings',
    Icon: SettingsIcon,
    Component: SettingsPage,
    order: 5
  }
];

export default routes;
