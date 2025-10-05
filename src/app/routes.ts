import { PlusCircle, ListChecksIcon, MapPlusIcon, SettingsIcon, MapPinIcon, TestTube } from 'lucide-react';

import SettingsPage from './lib/Settings';
import CurrentPage from './screens/Current';
import ListPage from './screens/List';
import ManualPage from './screens/Manual';
import MissionsPage from './screens/Missions';
import TestPage from './screens/Test';

export const routes = [
  {
    text: 'Add Current Location',
    location: '/current',
    Icon: PlusCircle,
    Component: CurrentPage,
    order: 3
  },
  {
    text: 'Add Manual Location',
    location: '/manual',
    Icon: MapPlusIcon,
    Component: ManualPage,
    order: 4
  },
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
    divider: true
  },
  {
    text: 'Settings',
    location: '/settings',
    Icon: SettingsIcon,
    Component: SettingsPage,
    order: 5
  },
  {
    text: 'test',
    location: '/test',
    Icon: TestTube,
    Component: TestPage,
    order: 6
  }

].sort((a, b) => a.order - b.order);
