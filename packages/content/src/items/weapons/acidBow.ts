import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "piercing",
	description:
		"The Acid Bow is a sleek, dark weapon that fires arrows tipped with corrosive acid. Its smooth draw and precision allow for swift shots that can melt armor and flesh alike. Favored by rogues and alchemists, this bow is a deadly choice for those who want to inflict lingering damage on their foes.",
	effects: [
		{
			damageType: "acid",
			max: 8,
			min: 1,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O837-alsOZeCZ2LfXYn?alt=media&token=80415919-cad9-4c8f-99bc-ac573690bb88",
	level: 3,
	max: 10,
	min: 3,
	name: "Acid Bow",
	price: 620,
	properties: [
		{
			name: "acid",
			type: "damage",
			value: 20,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "bow",
	id: "acid_bow",
});
