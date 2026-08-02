import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "unholy_bolter",
	name: "Unholy Bolter",
	description:
		"The Unholy Bolter is a sinister crossbow adorned with dark symbols and a blackened finish. It fires cursed bolts that deal extra damage and drain vitality. Favored by dark sorcerers, this weapon embodies malevolence and relentless power in battle.",
	icon: "items/weapons/crossbows/Crossbow_v2_06.png",
	price: 1200,
	rarity: "legendary",
	type: "weapon",
	weaponType: "crossbow",
	handedness: "twoHanded",
	range: "ranged",
	damage: {
		dice: "1d8+4",
		type: "piercing",
		attribute: "dexterity",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "necrotic",
			operation: "add",
			value: 50,
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "necrotic",
					dice: "2d6",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
