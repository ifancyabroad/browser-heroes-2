import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "longbow",
	name: "Longbow",
	description:
		"The Longbow is a tall, flexible weapon crafted from sturdy wood, designed for long-range accuracy. Its simple design allows skilled archers to deliver powerful, precise shots. ",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NgK0I2STX7An8WjEeUN?alt=media&token=1a253ef1-574f-4cca-b064-848f5c57bb90",
	price: 70,
	rarity: "common",
	type: "weapon",
	weaponType: "bow",
	handedness: "twoHanded",
	range: "ranged",
	damage: {
		dice: "1d8",
		type: "piercing",
		attribute: "dexterity",
	},
	modifiers: [],
	attackRiders: [],
	tags: [],
});
