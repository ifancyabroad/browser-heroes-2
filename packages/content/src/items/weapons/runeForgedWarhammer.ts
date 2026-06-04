import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "crushing",
	description:
		"The Rune Forged Warhammer is a powerful weapon intricately engraved with ancient runes that glow faintly. Designed for devastating strikes, it combines heavy weight with exceptional balance. Favored by seasoned warriors, this warhammer channels magical energy, enhancing its impact in battle.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O83BrerEM0juYkEM_QP?alt=media&token=ed18597c-8651-4c53-9f5f-7e5929dc4542",
	level: 3,
	max: 12,
	min: 3,
	name: "Rune Forged Warhammer",
	price: 800,
	properties: [
		{
			name: "slashing",
			type: "resistance",
			value: 15,
		},
		{
			name: "crushing",
			type: "resistance",
			value: 15,
		},
		{
			name: "piercing",
			type: "resistance",
			value: 15,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "hammer",
	id: "rune_forged_warhammer",
});
