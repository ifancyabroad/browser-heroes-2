import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_storms",
	name: "of Storms",
	position: "suffix",
	rarity: "rare",
	weight: 0.5,
	appliesTo: { itemTypes: ["weapon", "armour"] },
	modifiers: [{ type: "modifyDamage", damageType: "lightning", operation: "add", value: 2 }],
});
