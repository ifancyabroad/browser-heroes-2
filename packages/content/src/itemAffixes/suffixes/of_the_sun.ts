import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_the_sun",
	name: "of the Sun",
	position: "suffix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: { itemTypes: ["weapon", "armour"] },
	modifiers: [{ type: "modifyDamage", damageType: "radiant", operation: "add", value: 4 }],
});
