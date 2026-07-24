import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_blocking",
	name: "of Blocking",
	position: "suffix",
	rarity: "uncommon",
	weight: 1,
	appliesTo: {
		armourSlots: ["shield"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			value: 1,
		},
	],
	tags: [],
});
