import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_embers",
	name: "of Embers",
	position: "suffix",
	rarity: "rare",
	weight: 0.5,
	appliesTo: [{ itemTypes: ["weapon", "armour"] }],
	modifiers: [{ type: "modifyDamage", damageType: "fire", operation: "add", value: 2 }],
});
