import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "elven_spear",
	name: "Elven Spear",
	description:
		"The Elven Spear is a beautifully crafted weapon made from lightweight wood and adorned with intricate carvings. Its long, slender shaft allows for quick thrusts and precise throws. Favored by elven warriors, it combines elegance and effectiveness for both hunting and combat.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O86ORpmHCRvdoJix1nA?alt=media&token=c4158c08-d37f-41ae-a8fc-68984f1c6d3c",
	price: 480,
	rarity: "common",
	type: "weapon",
	weaponType: "spear",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8+2",
		type: "piercing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "dexterity",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyDamage",
			damageType: "piercing",
			operation: "add",
			value: 20,
		},
	],
	attackRiders: [],
	tags: [],
});
