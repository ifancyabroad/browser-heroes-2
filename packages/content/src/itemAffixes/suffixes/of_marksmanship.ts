import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_marksmanship",
	name: "of Marksmanship",
	position: "suffix",
	rarity: "rare",
	weight: 0.5,
	appliesTo: [{ itemTypes: ["weapon"], attackRanges: ["ranged"] }, { itemTypes: ["armour"] }],
	modifiers: [
		{
			type: "modifyDamage",
			attackRange: "ranged",
			operation: "add",
			value: 2,
		},
	],
});
