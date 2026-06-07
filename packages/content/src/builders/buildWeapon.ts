import type { Weapon } from "../schemas/item.schema";
import { weaponSchema } from "../schemas/item.schema";

export const buildWeapon = (weapon: Weapon) => {
	const parsed = weaponSchema.parse(weapon);
	return parsed;
};

export default buildWeapon;
