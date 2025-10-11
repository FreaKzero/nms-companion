import { glyphMap } from './Glyphs';

const GlyphInput: React.FC<{ active: boolean; onClick: (glyph: string) => void }> = ({ onClick, active }) => {
  const glyphs = Object.keys(glyphMap);

  return active
    ? (
      <div className='sticky bottom-0 backdrop-blur-xl bg-black/30 pb-15 rounded-md border pt-5 w-3/4 m-auto'>
        <div className='m-auto max-w-max mt-5'>
          <div className='grid gap-x-5 gap-y-5 sm:grid-cols-8'>
            {glyphs.map((a, i) => {
              return (
                <img
                  key={`glyphmanual-${i}`} src={glyphMap[a]}
                  onClick={() => onClick(a)}
                  onMouseDown={(e) => e.preventDefault()}
                  width='60' className={`border border-white rounded-2xl hover:cursor-pointer 
                       hover:saturate-[10000%] hover:hue-rotate-30 transition-all duration-150 ease-in`}
                />
              );
            })}
          </div>
        </div>
      </div>
      )
    : null;
};

export default GlyphInput;
