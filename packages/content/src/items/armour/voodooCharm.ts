import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "voodoo_charm",
	name: "Voodoo Charm",
	description: "The Voodoo Necklace, harnessing the primal forces of voodoo magic.",
	icon: "items/armour/neck/necklace_21_doll.png",
	price: 1420,
	rarity: "legendary",
	type: "armour",
	slot: "amulet",
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "necrotic",
		},
		{
			type: "modifyDamage",
			damageType: "necrotic",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyStat",
			stat: "intelligence",
			value: 2,
		},
	],
	tags: [],
});
