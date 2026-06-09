import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "red_slippers",
	name: "Red Slippers",
	description: "Fire Boots that offer both defense and control over fiery environments.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDOAnwyIZqnaKvgDbO?alt=media&token=6af4b127-989a-4b95-9cda-79d6dd858438",
	price: 700,
	rarity: "common",
	type: "armour",
	slot: "boots",
	category: "accessory",
	modifiers: [
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
