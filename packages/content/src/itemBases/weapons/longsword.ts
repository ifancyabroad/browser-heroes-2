import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_longsword",
	name: "Longsword",
	type: "weapon",
	weaponType: "sword",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d6",
		type: "slashing",
		attribute: "strength",
	},
	iconPool: [
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NMmvhpTgBUrely_XRJ7?alt=media&token=566098e0-cf7d-4431-a066-928fbe833c0f",
	],
	tags: [],
});
