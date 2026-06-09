import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "unholy_treads",
	name: "Unholy Treads",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OD683rsaEy2yBxeo8Fw?alt=media&token=c33fc687-7c41-41f7-8523-718a76267dee",
	price: 1600,
	rarity: "common",
	type: "armour",
	slot: "boots",
	category: "accessory",
	modifiers: [
		{
			type: "modifyStat",
			stat: "dexterity",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "strength",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "fire",
		},
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "add",
			value: 40,
		},
	],
	tags: [],
});
