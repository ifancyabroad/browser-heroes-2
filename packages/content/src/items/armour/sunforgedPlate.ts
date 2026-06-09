import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "sunforged_plate",
	name: "Sunforged Plate",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIGCEij6UUx69e-sTfO?alt=media&token=7fa124fa-c6ca-4e70-b2e4-ecaccc24e7cb",
	price: 1800,
	rarity: "common",
	type: "armour",
	slot: "body",
	category: "heavy",
	armourClass: 18,
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "wisdom",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "necrotic",
		},
	],
	tags: [],
});
