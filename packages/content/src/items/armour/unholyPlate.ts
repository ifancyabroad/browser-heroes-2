import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "unholy_plate",
	name: "Unholy Plate",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8Hs3ZHXox-pIZAXvRF?alt=media&token=89559693-3e4b-4ca4-851d-14a962478b7e",
	price: 1800,
	rarity: "legendary",
	type: "armour",
	slot: "body",
	category: "heavy",
	armourClass: 18,
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "crushing",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "crushing",
		},
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "strength",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
