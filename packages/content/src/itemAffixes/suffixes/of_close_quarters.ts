import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_close_quarters",
	name: "of Close Quarters",
	position: "suffix",
	rarity: "rare",
	weight: 0.5,
	appliesTo: [{ itemTypes: ["weapon"], attackRanges: ["melee"] }],
	modifiers: [
		{
			type: "modifyDamage",
			attackRange: "melee",
			operation: "add",
			value: 2,
		},
	],
});
