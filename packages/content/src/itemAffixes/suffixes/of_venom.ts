import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_venom",
	name: "of Venom",
	position: "suffix",
	rarity: "rare",
	weight: 0.5,
	appliesTo: [{ itemTypes: ["weapon", "armour"] }],
	modifiers: [{ type: "modifyDamage", damageType: "poison", operation: "add", value: 2 }],
});
