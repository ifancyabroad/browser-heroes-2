import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "unholy_bolter",
	name: "Unholy Bolter",
	description:
		"The Unholy Bolter is a sinister crossbow adorned with dark symbols and a blackened finish. It fires cursed bolts that deal extra damage and drain vitality. Favored by dark sorcerers, this weapon embodies malevolence and relentless power in battle.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O839Fwy6z4MdXojSNBz?alt=media&token=6e194bb4-0ded-4bc6-9221-f52888a19361",
	price: 1200,
	rarity: "common",
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
					dice: "1d8+3",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
