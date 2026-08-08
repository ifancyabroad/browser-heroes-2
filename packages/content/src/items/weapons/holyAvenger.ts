import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "holy_avenger",
	name: "Holy Avenger",
	description:
		"The Holy Avenger is an ornate mace featuring a radiant head and intricate engravings of celestial symbols. Infused with divine energy, it delivers powerful strikes that smite evil and bolster allies. Favored by paladins, this mace embodies righteousness and the relentless fight against darkness.",
	icon: "items/weapons/clubs/Club_v2_14.png",
	price: 3400,
	rarity: "legendary",
	type: "weapon",
	weaponType: "mace",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d6+4",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyHealing",
			multiplier: 1.5,
		},
		{
			type: "modifyDamage",
			damageType: "radiant",
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
					damageType: "radiant",
					dice: "1d8",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
