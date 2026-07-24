import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_invincibility",
	name: "of Invincibility",
	position: "suffix",
	rarity: "epic",
	weight: 1,
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "savingThrowBonus",
			value: 4,
		},
	],
});
