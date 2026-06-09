import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "golden_flail",
	name: "Golden Flail",
	description:
		"The Golden Flail features a spiked, gleaming ball attached to a sturdy chain, all crafted from shimmering gold. Its unique design allows for powerful, unpredictable strikes, making it effective in combat. Favored by flamboyant warriors, this flail combines elegance with brutal effectiveness.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O86MaYcAzzh5_RPVCkD?alt=media&token=b79573c9-b849-4363-9634-4491cdf3f310",
	price: 850,
	rarity: "common",
	type: "weapon",
	weaponType: "mace",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d8+2",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "cold",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "fire",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "lightning",
		},
	],
	attackRiders: [],
	tags: [],
});
