import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "will_of_galorin",
	name: "Will of Galorin",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OCje5NY8tvXxytEERmn?alt=media&token=e349508a-e35a-4b0b-bc67-697db8e39ed9",
	price: 2500,
	rarity: "legendary",
	type: "weapon",
	weaponType: "staff",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8+4",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "intelligence",
			operation: "add",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 4,
		},
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "add",
			value: 80,
		},
	],
	attackRiders: [],
	tags: [],
});
