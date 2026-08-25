import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_archsorcery",
	name: "of Archsorcery",
	position: "suffix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: [{ itemTypes: ["weapon"], damageClasses: ["magical"] }],
	modifiers: [
		{
			type: "modifyDamage",
			damageClass: "magical",
			operation: "add",
			value: 4,
		},
	],
});
