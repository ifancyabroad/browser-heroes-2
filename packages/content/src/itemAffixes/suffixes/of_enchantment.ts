import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_enchantment",
	name: "of Enchantment",
	position: "suffix",
	rarity: "uncommon",
	weight: 0.5,
	appliesTo: [{ itemTypes: ["weapon"], damageClasses: ["magical"] }],
	modifiers: [
		{
			type: "modifyDamage",
			damageClass: "magical",
			operation: "add",
			value: 1,
		},
	],
});
