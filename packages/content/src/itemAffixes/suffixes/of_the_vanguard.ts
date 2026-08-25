import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_the_vanguard",
	name: "of the Vanguard",
	position: "suffix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: [{ itemTypes: ["weapon"], attackRanges: ["melee"] }],
	modifiers: [
		{
			type: "modifyDamage",
			attackRange: "melee",
			operation: "add",
			value: 4,
		},
	],
});
