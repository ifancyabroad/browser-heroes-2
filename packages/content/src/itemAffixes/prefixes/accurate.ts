import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "accurate",
	name: "Accurate",
	position: "prefix",
	rarity: "common",
	weight: 1,
	appliesTo: {
		itemTypes: ["weapon"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			operation: "add",
			value: 1,
		},
	],
	tags: [],
});
