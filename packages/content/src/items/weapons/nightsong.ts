import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "nightsong",
	name: "Nightsong",
	description:
		"Nightsong is an elegant sword with a sleek, dark blade that shimmers in low light. Infused with shadow magic, it grants its wielder enhanced stealth and agility. Favored by assassins and rogue warriors, this sword embodies the silent beauty and deadly precision of the night.",
	icon: "items/weapons/swords/Sword_27.png",
	price: 1050,
	rarity: "legendary",
	type: "weapon",
	weaponType: "shortsword",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d6+4",
		type: "slashing",
		attribute: "dexterity",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "necrotic",
			operation: "add",
			value: 5,
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
