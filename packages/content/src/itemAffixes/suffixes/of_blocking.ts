import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_blocking",
	name: "of Blocking",
	position: "suffix",
	rarity: "common",
	minLevel: 1,
	weight: 1,
	appliesTo: {
		armourSlots: ["shield"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			operation: "add",
			value: 1,
		},
	],
	tags: [],
});
