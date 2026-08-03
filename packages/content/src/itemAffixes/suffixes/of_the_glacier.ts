import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_the_glacier",
	name: "of the Glacier",
	position: "suffix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: { itemTypes: ["weapon", "armour"] },
	modifiers: [{ type: "modifyDamage", damageType: "cold", operation: "add", value: 4 }],
});
