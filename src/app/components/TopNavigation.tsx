import Glyphs from './Glyphs';

import useSaveStore from '../stores/useSaveStore';

const TopNavigation = () => {
  const portalCode = useSaveStore((state) => state.position.PortalCode);
  const galaxy = useSaveStore((state) => state.position.GalaxyName);
  const summary = useSaveStore((state) => state.position.Summary);
  const isMultiplayer = useSaveStore((state) => state.isMultiplayer);

  if (isMultiplayer) {
    return (
      <div className='top-navigation'>
        <div className='flex flex-row items-center justify-between p-2'>
          <h2 className='font-bold font-nms text-xl text-gray-400'>In Multiplayer Lobby • Tracking Disabled</h2>
        </div>
      </div>
    );
  } else if (portalCode) {
    return (
      <div className='top-navigation'>
        <div className='flex flex-row items-center justify-between p-2'>
          <div>
            <h2 className='font-bold font-nms text-3xl'>{galaxy}</h2>
            <h3 className='font-nms text-gray-400'>{summary}</h3>
          </div>
          <Glyphs portalCode={portalCode} />
        </div>
      </div>
    );
  } else {
    return JSON.stringify(isMultiplayer);
  }
};

export default TopNavigation;
