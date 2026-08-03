import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_decay",
	name: "of Decay",
	position: "suffix",
	rarity: "rare",
	weight: 0.5,
	appliesTo: [{ itemTypes: ["weapon", "armour"] }],
	modifiers: [{ type: "modifyDamage", damageType: "necrotic", operation: "add", value: 2 }],
});
