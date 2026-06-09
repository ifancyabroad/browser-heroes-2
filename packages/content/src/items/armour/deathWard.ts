import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "death_ward",
	name: "Death Ward",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEffxrjZ2Fu9zSmWW9?alt=media&token=b9663a5f-69a9-411a-b872-21adf66a0e07",
	price: 730,
	rarity: "common",
	type: "armour",
	slot: "shield",
	category: "shield",
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "necrotic",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "poison",
		},
	],
	tags: [],
});
