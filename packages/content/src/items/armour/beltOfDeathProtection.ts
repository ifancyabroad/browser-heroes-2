import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "belt_of_death_protection",
	name: "Belt of Death Protection",
	icon: "items/armour/belts/Belt_12.png",
	price: 2700,
	rarity: "legendary",
	type: "armour",
	slot: "belt",
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "immunity",
			operation: "add",
			damageType: "necrotic",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "immunity",
			operation: "add",
			damageType: "poison",
		},
		{
			type: "modifyStat",
			stat: "constitution",
			value: 4,
		},
	],
	tags: [],
});
