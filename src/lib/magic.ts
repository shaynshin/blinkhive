import { Magic } from 'magic-sdk';

let magic: Magic | null = null;

export const createMagic = () => {
  if (typeof window !== 'undefined' && !magic) {
    magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY!);
  }
  return magic;
};