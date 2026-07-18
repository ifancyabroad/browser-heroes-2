import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_longsword",
	name: "Longsword",
	type: "weapon",
	weaponType: "sword",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d8",
		type: "slashing",
		attribute: "strength",
	},
	iconPool: ["sword_01", "sword_02", "sword_03"],
	tags: [],
});
