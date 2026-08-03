import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "accurate",
	name: "Accurate",
	position: "prefix",
	rarity: "uncommon",
	weight: 1,
	appliesTo: [
		{
			itemTypes: ["weapon"],
		},
	],
	modifiers: [
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			value: 1,
		},
	],
	tags: [],
});
