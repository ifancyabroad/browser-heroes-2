import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "fine_longsword",
	name: "Fine Longsword",
	description:
		"The Fine Longsword is a masterfully crafted blade with a polished, gleaming surface and intricate hilt designs. Its balanced weight allows for swift, precise strikes in combat. Favored by knights and nobles, this longsword combines elegance with deadly effectiveness on the battlefield.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NgO0_TN42Pqrd5WQENu?alt=media&token=33d9061b-5b71-4a86-a4fe-cb9f8edc7fe3",
	price: 100,
	rarity: "common",
	type: "weapon",
	weaponType: "sword",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d6+1",
		type: "slashing",
		attribute: "strength",
	},
	modifiers: [],
	attackRiders: [],
	tags: [],
});
