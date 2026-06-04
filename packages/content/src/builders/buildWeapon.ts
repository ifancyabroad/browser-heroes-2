import type { IWeapon } from "../types/item";
import { WeaponSchema } from "../schemas/item.schema";

export const buildWeapon = (weapon: IWeapon) => {
	const parsed = WeaponSchema.parse(weapon);
	return parsed;
};

export default buildWeapon;
