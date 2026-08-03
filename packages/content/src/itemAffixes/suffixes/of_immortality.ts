import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_immortality",
	name: "of Immortality",
	position: "suffix",
	rarity: "epic",
	appliesTo: [
		{
			itemTypes: ["weapon", "armour"],
		},
	],
	modifiers: [
		{
			type: "modifyStat",
			stat: "maxHpBonus",
			value: 20,
		},
	],
});
