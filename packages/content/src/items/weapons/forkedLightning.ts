import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "forked_lightning",
	name: "Forked Lightning",
	description:
		"Forked Lightning is a striking staff adorned with two jagged tips that crackle with electric energy. Designed to channel powerful lightning spells, it allows the wielder to unleash devastating bolts of electricity. Favored by storm mages, this staff embodies the raw fury of a thunderstorm.",
	icon: "items/weapons/staves/staff_40.png",
	price: 1450,
	rarity: "legendary",
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
			value: 2,
		},
	],
	attackRiders: [],
	tags: [],
});
