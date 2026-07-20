import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_mace",
	name: "Mace",
	basePrice: 50,
	type: "weapon",
	weaponType: "mace",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d6",
		type: "crushing",
		attribute: "strength",
	},
	iconPool: [
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NgO--jUsGrVSzpmk0lB?alt=media&token=03bd826e-b171-415c-b3b9-817a68ca3053",
	],
	tags: [],
});
