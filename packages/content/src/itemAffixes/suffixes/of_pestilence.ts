import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_pestilence",
	name: "of Pestilence",
	position: "suffix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: { itemTypes: ["weapon", "armour"] },
	modifiers: [{ type: "modifyDamage", damageType: "poison", operation: "add", value: 4 }],
});
