import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_warmth",
	name: "of Warmth",
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
			damageType: "cold",
		},
	],
});
