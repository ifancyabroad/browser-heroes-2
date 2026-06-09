import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "gold_hammer",
	name: "Gold Hammer",
	description:
		"The Gold Hammer is a striking weapon with a heavy, gleaming head made of solid gold and an intricately designed handle. While it exudes elegance, its solid construction allows for powerful strikes. Favored by wealthy warriors, it blends opulence with the effectiveness of a formidable weapon.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O83BRpUJVDVaFdO4Ji1?alt=media&token=f997f2e0-34e4-4027-8442-9f2fe7bc57d9",
	price: 780,
	rarity: "common",
	type: "weapon",
	weaponType: "hammer",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d6+2",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "cold",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "fire",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "lightning",
		},
	],
	attackRiders: [],
	tags: [],
});
