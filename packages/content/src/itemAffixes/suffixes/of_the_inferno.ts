import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_the_inferno",
	name: "of the Inferno",
	position: "suffix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: {
		itemTypes: ["armour"],
	},
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "immunity",
			operation: "add",
			damageType: "fire",
		},
	],
});
