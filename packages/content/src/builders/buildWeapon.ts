import type { Weapon, WeaponInput } from "../schemas/weapon.schema";
import { weaponSchema } from "../schemas/weapon.schema";

export const buildWeapon = (weapon: WeaponInput): Weapon => {
	const parsed = weaponSchema.parse(weapon);
	return parsed;
};

export default buildWeapon;
