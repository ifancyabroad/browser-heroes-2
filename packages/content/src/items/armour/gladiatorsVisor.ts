import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "gladiators_visor",
	name: "Gladiator's Visor",
	description:
		"A battle-scarred visor that combines brutal strength, deadly precision, and the protection needed to survive the arena.",
	icon: "items/armour/helms/Helm_25_gladiator.png",
	price: 1620,
	rarity: "legendary",
	type: "armour",
	slot: "helmet",
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "strength",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "criticalRangeBonus",
			value: 4,
		},
	],
	tags: [],
});
