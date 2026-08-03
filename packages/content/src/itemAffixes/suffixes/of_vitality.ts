import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_vitality",
	name: "of Vitality",
	position: "suffix",
	rarity: "rare",
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
	],
});
