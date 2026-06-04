import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "crushing",
	description:
		"The Golden Flail features a spiked, gleaming ball attached to a sturdy chain, all crafted from shimmering gold. Its unique design allows for powerful, unpredictable strikes, making it effective in combat. Favored by flamboyant warriors, this flail combines elegance with brutal effectiveness.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O86MaYcAzzh5_RPVCkD?alt=media&token=b79573c9-b849-4363-9634-4491cdf3f310",
	level: 3,
	max: 10,
	min: 3,
	name: "Golden Flail",
	price: 850,
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
	weaponType: "mace",
	id: "golden_flail",
});
