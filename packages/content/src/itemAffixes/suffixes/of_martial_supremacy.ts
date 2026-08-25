import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_martial_supremacy",
	name: "of Martial Supremacy",
	position: "suffix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: [{ itemTypes: ["weapon"], damageClasses: ["physical"] }, { itemTypes: ["armour"] }],
	modifiers: [
		{
			type: "modifyDamage",
			damageClass: "physical",
			operation: "add",
			value: 4,
		},
	],
});
