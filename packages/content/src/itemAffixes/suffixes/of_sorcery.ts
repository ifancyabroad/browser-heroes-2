import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_sorcery",
	name: "of Sorcery",
	position: "suffix",
	rarity: "rare",
	weight: 0.5,
	appliesTo: [{ itemTypes: ["weapon"], damageClasses: ["magical"] }],
	modifiers: [
		{
			type: "modifyDamage",
			damageClass: "magical",
			operation: "add",
			value: 2,
		},
	],
});
