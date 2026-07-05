import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "divine_candle",
	name: "Divine Candle",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OI6WPS67ruK5CEZybAn?alt=media&token=d882c531-920d-4cde-8657-5574b841233c",
	price: 1460,
	rarity: "epic",
	type: "weapon",
	weaponType: "staff",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8+3",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "radiant",
			operation: "add",
			value: 50,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "necrotic",
		},
		{
			type: "modifyStat",
			stat: "wisdom",
			operation: "add",
			value: 2,
		},
	],
	attackRiders: [],
	tags: [],
});
