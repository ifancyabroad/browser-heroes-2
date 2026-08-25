import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_the_deadeye",
	name: "of the Deadeye",
	position: "suffix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: [{ itemTypes: ["weapon"], attackRanges: ["ranged"] }, { itemTypes: ["armour"] }],
	modifiers: [
		{
			type: "modifyDamage",
			attackRange: "ranged",
			operation: "add",
			value: 4,
		},
	],
});
