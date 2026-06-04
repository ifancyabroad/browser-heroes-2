import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "piercing",
	description:
		"The Elven Spear is a beautifully crafted weapon made from lightweight wood and adorned with intricate carvings. Its long, slender shaft allows for quick thrusts and precise throws. Favored by elven warriors, it combines elegance and effectiveness for both hunting and combat.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O86ORpmHCRvdoJix1nA?alt=media&token=c4158c08-d37f-41ae-a8fc-68984f1c6d3c",
	level: 3,
	max: 10,
	min: 3,
	name: "Elven Spear",
	price: 480,
	properties: [
		{
			name: "dexterity",
			type: "stat",
			value: 2,
		},
		{
			name: "piercing",
			type: "damage",
			value: 20,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "spear",
	id: "elven_spear",
});
