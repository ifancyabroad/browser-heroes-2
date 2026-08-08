import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "lightning_trident",
	name: "Lightning Trident",
	description:
		"A formidable trident whose three sharp prongs shimmer with electric energy, unleashing violent arcs of lightning with every impact.",
	icon: "items/weapons/spears/Spear_v2_12.png",
	price: 1260,
	rarity: "legendary",
	type: "weapon",
	weaponType: "spear",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8+4",
		type: "piercing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "lightning",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyStat",
			stat: "criticalDiceMultiplierBonus",
			value: 2,
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "lightning",
					dice: "2d6",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
