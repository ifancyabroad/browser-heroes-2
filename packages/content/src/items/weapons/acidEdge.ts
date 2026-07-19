import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "acid_edge",
	name: "Acid Edge",
	description:
		"The Acid Edge is a wickedly curved blade coated with a corrosive substance that glows faintly green. Designed for swift strikes, it can melt through armor and inflict lingering damage. Favored by assassins and alchemists, this weapon combines lethality with a sinister touch.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O4a7oqRZJo49hIlWxgw?alt=media&token=b72cdcdb-5f01-40aa-80fb-ba8375717454",
	price: 1020,
	rarity: "legendary",
	type: "weapon",
	weaponType: "axe",
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
			damageType: "acid",
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
					damageType: "acid",
					dice: "1d8",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
