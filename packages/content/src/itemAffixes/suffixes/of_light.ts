import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_light",
	name: "of Light",
	position: "suffix",
	rarity: "rare",
	weight: 0.5,
	appliesTo: { itemTypes: ["weapon", "armour"] },
	modifiers: [{ type: "modifyDamage", damageType: "radiant", operation: "add", value: 2 }],
});
