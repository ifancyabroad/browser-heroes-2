import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "divine_candle",
	name: "Divine Candle",
	description: "",
	icon: "items/weapons/staves/Staff_v2_35.png",
	price: 1460,
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
			type: "modifyDamage",
			damageType: "radiant",
			operation: "add",
			value: 5,
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
			value: 2,
		},
	],
	attackRiders: [],
	tags: [],
});
