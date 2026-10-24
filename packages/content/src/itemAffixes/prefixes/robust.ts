import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "robust",
	name: "Robust",
	position: "prefix",
	rarity: "rare",
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
			value: 1,
		},
		{
			type: "modifyStat",
			stat: "maxHpBonus",
			value: 5,
		},
	],
});
