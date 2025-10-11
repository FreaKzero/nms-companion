import Glyphs from './Glyphs';

import usePositionStore from '../stores/usePositionStore';

const TopNavigation = () => {
  const portalCode = usePositionStore((state) => state.PortalCode);
  const galaxy = usePositionStore((state) => state.GalaxyName);
  const summary = usePositionStore((state) => state.Summary);

  const handleCopyGlyphs = () => navigator.clipboard.writeText(portalCode);
  return portalCode
    ? (
      <div className='top-navigation'>
        <div className='flex flex-row items-center justify-between p-2'>
          <div>
            <h2 className='font-bold font-nms text-3xl'>{galaxy}</h2>
            <h3 className='font-nms text-gray-400'>{summary}</h3>
          </div>
          <Glyphs portalCode={portalCode} onClick={handleCopyGlyphs} />
        </div>
      </div>
      )
    : null;
};

export default TopNavigation;
