import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_corrosion",
	name: "of Corrosion",
	position: "suffix",
	rarity: "rare",
	weight: 0.5,
	appliesTo: { itemTypes: ["weapon", "armour"] },
	modifiers: [{ type: "modifyDamage", damageType: "acid", operation: "add", value: 2 }],
});
