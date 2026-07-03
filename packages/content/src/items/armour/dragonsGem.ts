import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "dragons_gem",
	name: "Dragon's Gem",
	description:
		"A ring housing a sparkling dragon's gem, amplifying the wearer's power and resilience.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEkYmCcJMY3uyCVbHm?alt=media&token=4cf48342-af39-48ee-aadb-97df113e7437",
	price: 1650,
	rarity: "common",
	type: "armour",
	slot: "ring",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "fire",
		},
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
