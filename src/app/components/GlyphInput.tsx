import { glyphMap } from './Glyphs';

const GlyphInput: React.FC<{ onClick: (glyph: string) => void }> = ({ onClick }) => {
  const glyphs = Object.keys(glyphMap);

  return (
    <div className='w-full'>
      <div className='m-auto max-w-max mt-10'>
        <div className='grid gap-x-5 gap-y-5 sm:grid-cols-8'>
          {glyphs.map((a, i) => {
            return (
              <img
                key={`glyphmanual-${i}`} src={glyphMap[a]}
                onClick={() => onClick(a)}
                width='60' className={`border border-white rounded-2xl hover:cursor-pointer 
                       hover:saturate-[10000%] hover:hue-rotate-30 transition-all duration-300 ease-in`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GlyphInput;
