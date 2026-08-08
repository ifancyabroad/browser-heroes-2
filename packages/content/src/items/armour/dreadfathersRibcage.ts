import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "dreadfathers_ribcage",
	name: "Dreadfather's Ribcage",
	icon: "items/armour/sets/cloth/Cloth7_Chest.png",
	price: 1800,
	rarity: "legendary",
	type: "armour",
	slot: "body",
	category: "cloth",
	armourClass: 14,
	modifiers: [
		{
			type: "modifyStat",
			stat: "constitution",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "maxHpBonus",
			value: 25,
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
