import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_the_duelist",
	name: "of the Duelist",
	position: "suffix",
	rarity: "rare",
	weight: 0.5,
	appliesTo: [{ itemTypes: ["weapon"], attackRanges: ["melee"] }, { itemTypes: ["armour"] }],
	modifiers: [
		{
			type: "modifyDamage",
			attackRange: "melee",
			operation: "add",
			value: 2,
		},
	],
});
