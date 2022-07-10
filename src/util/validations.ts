import { colorNameToHex } from "./helpers";

export const isHexColor = (color: string) => {
  const reg =/^#([0-9a-f]{6}){1,2}$/i;

  return reg.test(color);
}

export const isValidColor = (color: string): boolean => {
  return isHexColor(color) || colorNameToHex(color) !== '';
}