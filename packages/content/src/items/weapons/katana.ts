import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "katana",
	name: "Katana",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAszjI5aLEjg2Bkd7Da?alt=media&token=e0edf43f-c7ad-4013-a893-f9f505a9f5d3",
	price: 270,
	rarity: "uncommon",
	type: "weapon",
	weaponType: "sword",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d10",
		type: "slashing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "dexterity",
			operation: "add",
			value: 1,
		},
	],
	attackRiders: [],
	tags: [],
});
