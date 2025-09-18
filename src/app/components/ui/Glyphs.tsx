import g0 from 'assets/0.png';
import g1 from 'assets/1.png';
import g2 from 'assets/2.png';
import g3 from 'assets/3.png';
import g4 from 'assets/4.png';
import g5 from 'assets/5.png';
import g6 from 'assets/6.png';
import g7 from 'assets/7.png';
import g8 from 'assets/8.png';
import g9 from 'assets/9.png';
import gA from 'assets/A.png';
import gB from 'assets/B.png';
import gC from 'assets/C.png';
import gD from 'assets/D.png';
import gE from 'assets/E.png';
import gF from 'assets/F.png';

export const glyphMap: Record<string, string> = {
  0: g0,
  1: g1,
  2: g2,
  3: g3,
  4: g4,
  5: g5,
  6: g6,
  7: g7,
  8: g8,
  9: g9,
  A: gA,
  B: gB,
  C: gC,
  D: gD,
  E: gE,
  F: gF
};

const Glyphs = ({ portalCode, width = 'w-10' }: { portalCode?: string; width?: string }) => {
  return (
    <div>
      {portalCode && portalCode.split('').map((a, i) => <img key={`glyph-${i}`} src={glyphMap[a]} className={`inline-block ${width}`} />)}
    </div>
  );
};

export default Glyphs;
