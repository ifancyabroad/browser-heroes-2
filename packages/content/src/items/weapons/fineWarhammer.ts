import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "fine_warhammer",
	name: "Fine Warhammer",
	description:
		"The Fine Warhammer is a beautifully crafted weapon with a polished head and intricate engravings on the handle. Designed for both strength and aesthetics, it delivers powerful blows with precision. This warhammer is favored by warriors who appreciate elegance and effectiveness in combat.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NgO1hZuxcjitw8l7yjz?alt=media&token=9fce3516-784c-4a9f-9d78-debcf7dcf48e",
	price: 140,
	rarity: "common",
	type: "weapon",
	weaponType: "hammer",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d10+1",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [],
	attackRiders: [],
	tags: [],
});
