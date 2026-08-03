import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "astute",
	name: "Astute",
	position: "prefix",
	rarity: "rare",
	appliesTo: [
		{
			itemTypes: ["weapon", "armour"],
		},
	],
	modifiers: [
		{
			type: "modifyStat",
			stat: "intelligence",
			value: 2,
		},
	],
});
