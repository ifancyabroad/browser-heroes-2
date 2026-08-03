import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "precise",
	name: "Precise",
	position: "prefix",
	rarity: "rare",
	weight: 1,
	appliesTo: [
		{ itemTypes: ["weapon"] },
		{ itemTypes: ["armour"], armourSlots: ["helmet", "gloves", "ring"] },
	],
	modifiers: [
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			value: 2,
		},
	],
});
