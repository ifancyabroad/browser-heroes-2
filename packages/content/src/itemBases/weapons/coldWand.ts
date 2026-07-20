import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_cold_wand",
	name: "Cold Wand",
	basePrice: 60,
	type: "weapon",
	weaponType: "wand",
	handedness: "oneHanded",
	range: "ranged",
	damage: {
		dice: "1d4",
		type: "cold",
		attribute: "intelligence",
	},
	iconPool: [
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O885N2_iJ4G2FzUXbNw?alt=media&token=9a27d4ed-9e5b-4540-a423-78fafb03a05a",
	],
	tags: [],
});
