import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_force",
	name: "of Force",
	position: "suffix",
	rarity: "rare",
	weight: 0.5,
	appliesTo: [{ itemTypes: ["weapon"], damageClasses: ["physical"] }],
	modifiers: [
		{
			type: "modifyDamage",
			damageClass: "physical",
			operation: "add",
			value: 2,
		},
	],
});
