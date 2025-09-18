import Glyphs from './ui/Glyphs';

import usePositionStore from '../stores/usePositionStore';

const TopNavigation = () => {
  const portalCode = usePositionStore((state) => state.PortalCode);
  const galaxy = usePositionStore((state) => state.GalaxyName);
  const summary = usePositionStore((state) => state.Summary);

  return (
    <div className='top-navigation'>
      <div className='flex flex-row items-center justify-between p-2'>
        <div>
          <h2 className='font-bold'>{galaxy}</h2>
          <h3 className='italic'>{summary}</h3>
        </div>
        <Glyphs portalCode={portalCode} />
      </div>
    </div>
  );
};

export default TopNavigation;
