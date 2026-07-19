import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_fire_wand",
	name: "Fire Wand",
	type: "weapon",
	weaponType: "wand",
	handedness: "oneHanded",
	range: "ranged",
	damage: {
		dice: "1d4",
		type: "fire",
		attribute: "intelligence",
	},
	iconPool: [
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O8858iCEuFLCYHw_B8r?alt=media&token=c4b6372c-c137-4609-a2e1-1fbedf1c903a",
	],
	tags: [],
});
