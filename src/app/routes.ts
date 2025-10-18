import { PlusCircle, ListChecksIcon, MapPlusIcon, SettingsIcon, MapPinIcon, TestTube, Rss } from 'lucide-react';
import { FC } from 'react';

import LocationForm from './components/LocationForm';
import SettingsPage from './lib/Settings';
import CurrentPage from './screens/Current';
import EditLocationPage from './screens/EditLocation';
import ListPage from './screens/List';
import MissionsPage from './screens/Missions';
import RedditPage from './screens/Reddit';
import TestPage from './screens/Test';

export interface RouteItem {
  text?: string;
  location?: string;
  Icon?: FC;
  Component?: FC;
  order: number;
  divider?: boolean;
  index?: boolean;
}

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
    Component: LocationForm,
    order: 5
  },
  {
    divider: true,
    order: 6
  },
  {
    text: 'Reddit Feed',
    location: '/reddit',
    Icon: Rss,
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
  },
  {
    text: 'edit',
    location: '/edit/:id',
    Icon: null,
    Component: EditLocationPage,
    order: 10
  }

].sort((a, b) => a.order - b.order);
