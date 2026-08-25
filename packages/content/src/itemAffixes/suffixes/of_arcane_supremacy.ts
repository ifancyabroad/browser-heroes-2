import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_arcane_supremacy",
	name: "of Arcane Supremacy",
	position: "suffix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: [{ itemTypes: ["weapon"], damageClasses: ["magical"] }, { itemTypes: ["armour"] }],
	modifiers: [
		{
			type: "modifyDamage",
			damageClass: "magical",
			operation: "add",
			value: 4,
		},
	],
});
