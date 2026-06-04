import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "crushing",
	description:
		"The Gold Hammer is a striking weapon with a heavy, gleaming head made of solid gold and an intricately designed handle. While it exudes elegance, its solid construction allows for powerful strikes. Favored by wealthy warriors, it blends opulence with the effectiveness of a formidable weapon.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O83BRpUJVDVaFdO4Ji1?alt=media&token=f997f2e0-34e4-4027-8442-9f2fe7bc57d9",
	level: 3,
	max: 8,
	min: 3,
	name: "Gold Hammer",
	price: 780,
	properties: [
		{
			name: "cold",
			type: "resistance",
			value: 15,
		},
		{
			name: "fire",
			type: "resistance",
			value: 15,
		},
		{
			name: "lightning",
			type: "resistance",
			value: 15,
		},
	],
	size: "oneHanded",
	type: "weapon",
	weaponType: "hammer",
	id: "gold_hammer",
});
