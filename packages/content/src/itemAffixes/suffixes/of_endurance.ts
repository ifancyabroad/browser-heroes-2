import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_endurance",
	name: "of Endurance",
	position: "suffix",
	rarity: "rare",
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
			value: 5,
		},
		{
			type: "modifyStat",
			stat: "savingThrowBonus",
			value: 1,
		},
	],
});
