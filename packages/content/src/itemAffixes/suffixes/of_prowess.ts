import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_prowess",
	name: "of Prowess",
	position: "suffix",
	rarity: "uncommon",
	weight: 0.5,
	appliesTo: [{ itemTypes: ["weapon"], damageClasses: ["physical"] }],
	modifiers: [
		{
			type: "modifyDamage",
			damageClass: "physical",
			operation: "add",
			value: 1,
		},
	],
});
