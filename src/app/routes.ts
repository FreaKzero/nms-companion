import { PlusCircle, ListChecksIcon, MapPlusIcon, ListTodo } from 'lucide-react';

import CurrentPage from './screens/Current';
import { LandingScreen } from './screens/landing';
import ListPage from './screens/List';
import ManualPage from './screens/Manual';

const routes = [
  {
    text: 'Add Current Position',
    location: '/current',
    Icon: PlusCircle,
    Component: CurrentPage,
    order: 1
  },
  {
    text: 'Missions',
    location: '/',
    Icon: ListTodo,
    Component: LandingScreen,
    order: 2
  },
  {
    text: 'Add Manual Position',
    location: '/manual',
    Icon: MapPlusIcon,
    Component: ManualPage,
    order: 3
  },
  {
    text: 'List',
    location: '/list',
    Icon: ListChecksIcon,
    Component: ListPage,
    order: 4
  }

];

export default routes;
