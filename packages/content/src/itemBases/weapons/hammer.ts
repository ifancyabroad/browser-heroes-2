import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_hammer",
	name: "Hammer",
	basePrice: 50,
	type: "weapon",
	weaponType: "hammer",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d6",
		type: "crushing",
		attribute: "strength",
	},
	iconPool: [
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NNwPg099VI_pDe9E_Zd?alt=media&token=6a1a583c-8f1f-47d9-8105-e7a0af2ed7c6",
	],
	tags: [],
});
