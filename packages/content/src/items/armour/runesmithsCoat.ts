import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "runesmiths_coat",
	name: "Runesmith's Coat",
	description: "A reinforced workshop coat fitted with hidden plates and insulated seams.",
	icon: "items/armour/sets/cloth/Cloth14_Chest.png",
	price: 3800,
	rarity: "legendary",
	restrictedToClassIds: ["artificer"],
	type: "armour",
	slot: "body",
	category: "light",
	armourClass: 16,
	modifiers: [
		{
			type: "modifyStat",
			stat: "intelligence",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			value: 4,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "crushing",
		},
	],
	tags: [],
});
