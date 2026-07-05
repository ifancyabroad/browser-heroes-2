import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "holy_avenger",
	name: "Holy Avenger",
	description:
		"The Holy Avenger is an ornate mace featuring a radiant head and intricate engravings of celestial symbols. Infused with divine energy, it delivers powerful strikes that smite evil and bolster allies. Favored by paladins, this mace embodies righteousness and the relentless fight against darkness.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O86LPbrpdPf46hvIISe?alt=media&token=3a9f2df0-5a06-4ee6-bb33-2b058db69425",
	price: 1280,
	rarity: "epic",
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
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "necrotic",
		},
		{
			type: "modifyDamage",
			damageType: "radiant",
			operation: "add",
			value: 40,
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
