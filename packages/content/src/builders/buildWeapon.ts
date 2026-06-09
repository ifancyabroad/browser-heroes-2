import type { Weapon } from "../schemas/weapon.schema";
import { weaponSchema } from "../schemas/weapon.schema";

export const buildWeapon = (weapon: Weapon) => {
	const parsed = weaponSchema.parse(weapon);
	return parsed;
};

export default buildWeapon;
