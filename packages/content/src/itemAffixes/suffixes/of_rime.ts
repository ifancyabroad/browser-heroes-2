import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_rime",
	name: "of Rime",
	position: "suffix",
	rarity: "rare",
	weight: 0.5,
	appliesTo: [{ itemTypes: ["weapon", "armour"] }],
	modifiers: [{ type: "modifyDamage", damageType: "cold", operation: "add", value: 2 }],
});
