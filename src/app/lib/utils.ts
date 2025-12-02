import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function voxelToPortal (P: number, X: number, Y: number, Z: number, SSI: number) {
  const dd1 = X + 2047;
  const dd2 = Y + 127;
  const dd3 = Z + 2047;

  const g1 = dd1.toString(16).toUpperCase();
  const g2 = dd2.toString(16).toUpperCase();
  const g3 = dd3.toString(16).toUpperCase();
  const g4 = SSI.toString(16).toUpperCase();

  const dec1 = parseInt(g1, 16);
  const dec2 = parseInt(g2, 16);
  const dec3 = parseInt(g3, 16);

  const dec5 = parseInt('801', 16);
  const dec6 = parseInt('81', 16);
  const dec7 = parseInt('1000', 16);
  const dec8 = parseInt('100', 16);

  const calc1 = (dec1 + dec5) % dec7;
  const calc2 = (dec2 + dec6) % dec8;
  const calc3 = (dec3 + dec5) % dec7;

  const hexX = calc1.toString(16).toUpperCase();
  const hexY = calc2.toString(16).toUpperCase();
  const hexZ = calc3.toString(16).toUpperCase();

  const ihexX = parseInt(hexX, 16) & 0xFFF;
  const ihexY = parseInt(hexY, 16) & 0xFF;
  const ihexZ = parseInt(hexZ, 16) & 0xFFF;
  const ihexSSI = parseInt(g4, 16) & 0xFFF;

  const formattedPortalCode = `${P}${padHex(ihexSSI, 3)}${padHex(ihexY, 2)}${padHex(ihexZ, 3)}${padHex(ihexX, 3)}`;

  return formattedPortalCode;

  function padHex (number: number, length: number) {
    return number.toString(16).toUpperCase()
      .padStart(length, '0');
  }
}
