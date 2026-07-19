import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "voodoo_charm",
	name: "Voodoo Charm",
	description: "The Voodoo Necklace, harnessing the primal forces of voodoo magic.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-Nz9ZE3_8GkLUJ5oYCw7?alt=media&token=f9feca84-47e0-4e62-92d6-1cd34c6af964",
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
			value: 40,
		},
		{
			type: "modifyStat",
			stat: "intelligence",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
