import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_prowess",
	name: "of Prowess",
	position: "suffix",
	rarity: "rare",
	weight: 0.5,
	appliesTo: [{ itemTypes: ["weapon"], damageClasses: ["physical"] }, { itemTypes: ["armour"] }],
	modifiers: [
		{
			type: "modifyDamage",
			damageClass: "physical",
			operation: "add",
			value: 2,
		},
	],
});
