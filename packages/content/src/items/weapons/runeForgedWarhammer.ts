import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "rune_forged_warhammer",
	name: "Rune Forged Warhammer",
	description:
		"The Rune Forged Warhammer is a powerful weapon intricately engraved with ancient runes that glow faintly. Designed for devastating strikes, it combines heavy weight with exceptional balance. Favored by seasoned warriors, this warhammer channels magical energy, enhancing its impact in battle.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O83BrerEM0juYkEM_QP?alt=media&token=ed18597c-8651-4c53-9f5f-7e5929dc4542",
	price: 800,
	rarity: "common",
	type: "weapon",
	weaponType: "hammer",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d10+2",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "slashing",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "crushing",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "piercing",
		},
	],
	attackRiders: [],
	tags: [],
});
