import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "warlocks_staff",
	name: "Warlock's Staff",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAsxyHjQ-ZKF19tCLPX?alt=media&token=3e2dc877-ed7a-4eb8-8bb3-a833f05d8077",
	price: 720,
	rarity: "rare",
	type: "weapon",
	weaponType: "staff",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8+2",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "necrotic",
			operation: "add",
			value: 50,
		},
		{
			type: "modifyStat",
			stat: "intelligence",
			operation: "add",
			value: 2,
		},
	],
	attackRiders: [],
	tags: [],
});
