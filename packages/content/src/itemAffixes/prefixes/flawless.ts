import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "flawless",
	name: "Flawless",
	position: "prefix",
	rarity: "epic",
	weight: 1,
	appliesTo: [
		{ itemTypes: ["weapon"] },
		{ itemTypes: ["armour"], armourSlots: ["helmet", "gloves", "ring"] },
	],
	modifiers: [
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			value: 4,
		},
	],
});
