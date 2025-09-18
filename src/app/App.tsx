import { ThemeProvider } from '@/app/components/theme-provider';

import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import ContentContainer from './components/ContentContainer';
import SideBar from './components/Sidebar';
import routes from './routes';

export default function App () {
  return (
    <ThemeProvider storageKey='vite-ui-theme'>
      <Router>
        <div className='flex pl-16'>
          <SideBar />
          <ContentContainer>
            <Routes>
              {routes.map((item, idx) => {
                return (<Route key={`route-${idx}`} path={item.location} Component={item.Component} />);
              })}
            </Routes>
          </ContentContainer>
        </div>
      </Router>
    </ThemeProvider>
  );
}
