import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_quickness",
	name: "of Quickness",
	position: "suffix",
	rarity: "uncommon",
	weight: 1,
	appliesTo: [
		{
			itemTypes: ["weapon", "armour"],
		},
	],
	modifiers: [
		{
			type: "modifyStat",
			stat: "initiative",
			value: 1,
		},
	],
});
