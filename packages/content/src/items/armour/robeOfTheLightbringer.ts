import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "robe_of_the_lightbringer",
	name: "Robe of the Lightbringer",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OHy3_9b1f9VotGKVTvF?alt=media&token=d3fb5491-5e1e-4da5-95c8-3609e209a2eb",
	price: 780,
	rarity: "common",
	type: "armour",
	slot: "body",
	category: "cloth",
	armourClass: 10,
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "radiant",
			operation: "add",
			value: 25,
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
	tags: [],
});
