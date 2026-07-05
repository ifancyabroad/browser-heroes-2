import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "bow_of_the_fox",
	name: "Bow of the Fox",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAsd0XmXJ11SL3kS6QB?alt=media&token=f4593aa1-45d4-4cdb-b999-9cb4e62724a2",
	price: 230,
	rarity: "uncommon",
	type: "weapon",
	weaponType: "bow",
	handedness: "twoHanded",
	range: "ranged",
	damage: {
		dice: "1d8+1",
		type: "piercing",
		attribute: "dexterity",
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "dexterity",
			operation: "add",
			value: 2,
		},
	],
	attackRiders: [],
	tags: [],
});
