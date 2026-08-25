import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_devastating_force",
	name: "of Devastating Force",
	position: "suffix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: [{ itemTypes: ["weapon"], damageClasses: ["physical"] }],
	modifiers: [
		{
			type: "modifyDamage",
			damageClass: "physical",
			operation: "add",
			value: 4,
		},
	],
});
