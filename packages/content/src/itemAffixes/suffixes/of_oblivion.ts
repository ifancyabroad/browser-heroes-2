import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_oblivion",
	name: "of Oblivion",
	position: "suffix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: { itemTypes: ["weapon", "armour"] },
	modifiers: [{ type: "modifyDamage", damageType: "necrotic", operation: "add", value: 4 }],
});
