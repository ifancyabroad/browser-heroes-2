import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_battleaxe",
	name: "Battleaxe",
	basePrice: 70,
	type: "weapon",
	weaponType: "axe",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d10",
		type: "slashing",
		attribute: "strength",
	},
	iconPool: [
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NgK-mAaFXHeapzVbWAb?alt=media&token=9844fb54-3d24-47d6-be21-4a488771e2f1",
	],
	tags: [],
});
