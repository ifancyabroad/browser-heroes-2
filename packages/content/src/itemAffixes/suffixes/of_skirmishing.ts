import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_skirmishing",
	name: "of Skirmishing",
	position: "suffix",
	rarity: "uncommon",
	weight: 0.5,
	appliesTo: [{ itemTypes: ["weapon"], attackRanges: ["melee"] }],
	modifiers: [
		{
			type: "modifyDamage",
			attackRange: "melee",
			operation: "add",
			value: 1,
		},
	],
});
