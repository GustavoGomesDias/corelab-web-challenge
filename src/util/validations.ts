import { colorNameToHex } from "./helpers";

export const validationField = (field: unknown) => field === '' || field === ' ' || field === null || field === undefined;

export const validationPlate = (plate: string) => /^[a-zA-Z]{3}[0-9]{4}$/.test(plate);

export const validationYear = (year: number) => !Number.isNaN(year) && year > 1900;

export const isHexColor = (color: string) => {
  const reg =/^#([0-9a-f]{6}){1,2}$/i;

  return reg.test(color);
}

export const isValidColor = (color: string): boolean => {
  return isHexColor(color) || colorNameToHex(color) !== '';
}