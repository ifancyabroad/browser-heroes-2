import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "slashing",
	description:
		"The Acid Edge is a wickedly curved blade coated with a corrosive substance that glows faintly green. Designed for swift strikes, it can melt through armor and inflict lingering damage. Favored by assassins and alchemists, this weapon combines lethality with a sinister touch.",
	effects: [
		{
			damageType: "acid",
			max: 8,
			min: 1,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O4a7oqRZJo49hIlWxgw?alt=media&token=b72cdcdb-5f01-40aa-80fb-ba8375717454",
	level: 4,
	max: 9,
	min: 4,
	name: "Acid Edge",
	price: 1020,
	properties: [
		{
			name: "acid",
			type: "damage",
			value: 50,
		},
	],
	size: "oneHanded",
	type: "weapon",
	weaponType: "axe",
	id: "acid_edge",
});
