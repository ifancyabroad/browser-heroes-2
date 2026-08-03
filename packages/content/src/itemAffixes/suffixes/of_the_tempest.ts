import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_the_tempest",
	name: "of the Tempest",
	position: "suffix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: { itemTypes: ["weapon", "armour"] },
	modifiers: [{ type: "modifyDamage", damageType: "lightning", operation: "add", value: 4 }],
});
