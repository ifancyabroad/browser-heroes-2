import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_handaxe",
	name: "Handaxe",
	basePrice: 50,
	type: "weapon",
	weaponType: "axe",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d6",
		type: "slashing",
		attribute: "strength",
	},
	iconPool: [
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NgK-VVeMfZnyRzNuNyK?alt=media&token=1860a772-2dba-423c-a98e-c72a50f4a751",
	],
	tags: [],
});
