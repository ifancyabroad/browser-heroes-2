import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "acid_bow",
	name: "Acid Bow",
	description:
		"The Acid Bow is a sleek, dark weapon that fires arrows tipped with corrosive acid. Its smooth draw and precision allow for swift shots that can melt armor and flesh alike. Favored by rogues and alchemists, this bow is a deadly choice for those who want to inflict lingering damage on their foes.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O837-alsOZeCZ2LfXYn?alt=media&token=80415919-cad9-4c8f-99bc-ac573690bb88",
	price: 620,
	rarity: "rare",
	type: "weapon",
	weaponType: "bow",
	handedness: "twoHanded",
	range: "ranged",
	damage: {
		dice: "1d8+2",
		type: "piercing",
		attribute: "dexterity",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "acid",
			operation: "add",
			value: 20,
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
