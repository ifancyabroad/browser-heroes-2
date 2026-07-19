import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_quarterstaff",
	name: "Quarterstaff",
	type: "weapon",
	weaponType: "staff",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8",
		type: "crushing",
		attribute: "strength",
	},
	iconPool: [
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-Nc46CPWJz2atC_uII9i?alt=media&token=3bbe8a10-42ee-4987-8c65-aa9bd79730fa",
	],
	tags: [],
});
