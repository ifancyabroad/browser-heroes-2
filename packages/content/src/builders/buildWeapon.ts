import {
	legendaryWeaponSchema,
	type LegendaryWeapon,
	type LegendaryWeaponInput,
} from "../schemas/weapon.schema";

export const buildWeapon = (weapon: LegendaryWeaponInput): LegendaryWeapon => {
	return legendaryWeaponSchema.parse(weapon);
};

export default buildWeapon;
