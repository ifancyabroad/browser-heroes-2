import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_conflagration",
	name: "of Conflagration",
	position: "suffix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: { itemTypes: ["weapon", "armour"] },
	modifiers: [{ type: "modifyDamage", damageType: "fire", operation: "add", value: 4 }],
});
