import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "deathstalker_hood",
	name: "Deathstalker Hood",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OD1bqrUJTE8odQKcULI?alt=media&token=ed8d231a-7b4d-4747-b162-1db8262f9e03",
	price: 1700,
	rarity: "epic",
	type: "armour",
	slot: "helmet",
	modifiers: [
		{
			type: "modifyStat",
			stat: "charisma",
			operation: "add",
			value: -4,
		},
		{
			type: "modifyDamage",
			damageType: "poison",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "poison",
		},
		{
			type: "modifyStat",
			stat: "critChance",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "dexterity",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
