import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_longbow",
	name: "Longbow",
	type: "weapon",
	weaponType: "bow",
	handedness: "twoHanded",
	range: "ranged",
	damage: {
		dice: "1d8",
		type: "piercing",
		attribute: "dexterity",
	},
	iconPool: [
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NgK0I2STX7An8WjEeUN?alt=media&token=1a253ef1-574f-4cca-b064-848f5c57bb90",
	],
	tags: [],
});
