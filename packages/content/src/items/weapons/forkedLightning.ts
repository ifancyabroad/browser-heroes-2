import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "forked_lightning",
	name: "Forked Lightning",
	description:
		"Forked Lightning is a striking staff adorned with two jagged tips that crackle with electric energy. Designed to channel powerful lightning spells, it allows the wielder to unleash devastating bolts of electricity. Favored by storm mages, this staff embodies the raw fury of a thunderstorm.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O882xmUlhB07RJmbt_a?alt=media&token=1c0d3884-6bfb-4b63-b25b-5de584796590",
	price: 1450,
	rarity: "common",
	type: "weapon",
	weaponType: "staff",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8+3",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "lightning",
			operation: "add",
			value: 50,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "lightning",
		},
		{
			type: "modifyStat",
			stat: "intelligence",
			operation: "add",
			value: 2,
		},
	],
	attackRiders: [],
	tags: [],
});
