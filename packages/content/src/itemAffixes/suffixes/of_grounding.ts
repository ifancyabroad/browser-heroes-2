import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_grounding",
	name: "of Grounding",
	position: "suffix",
	rarity: "rare",
	appliesTo: {
		itemTypes: ["armour"],
	},
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "lightning",
		},
	],
});
