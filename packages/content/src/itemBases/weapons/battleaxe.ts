import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_battleaxe",
	name: "Battleaxe",
	basePrice: 125,
	type: "weapon",
	weaponType: "battleaxe",
	handedness: "twoHanded",
	attackRange: "melee",
	damage: {
		dice: "1d10",
		type: "slashing",
		damageClass: "physical",
		attribute: "strength",
	},
	iconPool: [
		"items/weapons/axes/Axe_01.png",
		"items/weapons/axes/Axe_02.png",
		"items/weapons/axes/Axe_05.png",
		"items/weapons/axes/Axe_06.png",
		"items/weapons/axes/Axe_09.png",
		"items/weapons/axes/Axe_10.png",
		"items/weapons/axes/Axe_11.png",
	],
	tags: [],
});
