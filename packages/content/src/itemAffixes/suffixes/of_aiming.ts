import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_aiming",
	name: "of Aiming",
	position: "suffix",
	rarity: "uncommon",
	weight: 0.5,
	appliesTo: [{ itemTypes: ["weapon"], attackRanges: ["ranged"] }],
	modifiers: [
		{
			type: "modifyDamage",
			attackRange: "ranged",
			operation: "add",
			value: 1,
		},
	],
});
