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
		dice: "1d8+4",
		type: "lightning",
		attribute: "intelligence",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "lightning",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "lightning",
		},
	],
	attackRiders: [
		{
			timing: "onCrit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "lightning",
					dice: "4d6",
				},
			],
		},
	],
	tags: [],
});
