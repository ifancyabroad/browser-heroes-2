import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "unyielding",
	name: "Unyielding",
	position: "prefix",
	rarity: "epic",
	weight: 1,
	appliesTo: [
		{
			itemTypes: ["armour"],
			armourSlots: ["body", "belt", "shield"],
		},
	],
	modifiers: [
		{
			type: "modifyStat",
			stat: "constitution",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "maxHpBonus",
			value: 10,
		},
	],
});
