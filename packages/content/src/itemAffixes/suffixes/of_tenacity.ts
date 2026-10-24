import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_tenacity",
	name: "of Tenacity",
	position: "suffix",
	rarity: "epic",
	weight: 1,
	appliesTo: [
		{
			itemTypes: ["weapon", "armour"],
		},
	],
	modifiers: [
		{
			type: "modifyStat",
			stat: "maxHpBonus",
			value: 10,
		},
		{
			type: "modifyStat",
			stat: "savingThrowBonus",
			value: 2,
		},
	],
});
