import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_dissolution",
	name: "of Dissolution",
	position: "suffix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: { itemTypes: ["weapon", "armour"] },
	modifiers: [{ type: "modifyDamage", damageType: "acid", operation: "add", value: 4 }],
});
