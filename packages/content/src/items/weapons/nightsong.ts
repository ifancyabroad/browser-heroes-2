import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "nightsong",
	name: "Nightsong",
	description:
		"Nightsong is an elegant sword with a sleek, dark blade that shimmers in low light. Infused with shadow magic, it grants its wielder enhanced stealth and agility. Favored by assassins and rogue warriors, this sword embodies the silent beauty and deadly precision of the night.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O86i64bPy3o78ynB5JW?alt=media&token=57ad1820-9961-49a9-816d-322c87af1f3e",
	price: 1050,
	rarity: "epic",
	type: "weapon",
	weaponType: "sword",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d6+3",
		type: "slashing",
		attribute: "strength",
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
					dice: "1d8",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
