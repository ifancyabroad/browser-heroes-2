import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_flail",
	name: "Flail",
	basePrice: 280,
	type: "weapon",
	weaponType: "mace",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d8",
		type: "crushing",
		attribute: "strength",
	},
	iconPool: [
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O86LrSuGHIRtQuAJJAq?alt=media&token=910719f5-7fc8-4fbd-aa17-761da5c9ed1b",
	],
	tags: [],
});
