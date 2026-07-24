import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "flawless",
	name: "Flawless",
	position: "prefix",
	rarity: "epic",
	weight: 1,
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			value: 4,
		},
	],
});
