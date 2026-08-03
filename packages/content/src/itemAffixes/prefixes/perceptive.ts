import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "perceptive",
	name: "Perceptive",
	position: "prefix",
	rarity: "rare",
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "wisdom",
			value: 2,
		},
	],
});
