import { ThemeProvider } from '@/app/components/theme-provider';

import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import { registerBiomeSearch } from './BiomeSearchModal';
import ContentContainer from './components/ContentContainer';
import { registerRouletteModal } from './components/RouletteModal';
import RouterListener from './components/RouterListener';
import SideBar from './components/Sidebar';
import { registerTimerModal } from './components/TimerModal';
import { routes } from './routes';
import { registerWikiSearch } from './WikiSearchModal';

registerBiomeSearch();
registerWikiSearch();
registerRouletteModal();
registerTimerModal();

export default function App () {
  return (
    <ThemeProvider storageKey='vite-ui-theme'>
      <Router>
        <RouterListener />
        <div className='flex pl-16'>
          <SideBar />
          <ContentContainer>
            <Routes>
              {routes.map((item, idx) => {
                return (<Route key={`route-${idx}`} path={item.location} Component={item.Component} index={item?.index} />);
              })}
            </Routes>
          </ContentContainer>
        </div>
      </Router>
    </ThemeProvider>
  );
}
