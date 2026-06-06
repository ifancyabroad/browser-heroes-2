import type { IWeapon } from "../types/item";
import { weaponSchema } from "../schemas/item.schema";

export const buildWeapon = (weapon: IWeapon) => {
	const parsed = weaponSchema.parse(weapon);
	return parsed;
};

export default buildWeapon;
