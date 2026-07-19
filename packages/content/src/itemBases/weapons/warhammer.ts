import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_warhammer",
	name: "Warhammer",
	type: "weapon",
	weaponType: "hammer",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d10",
		type: "crushing",
		attribute: "strength",
	},
	iconPool: [
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NgK07SpTQiVML_pBgQ4?alt=media&token=28026b31-3cf7-4b80-a9c0-3f5a1560f120",
	],
	tags: [],
});
