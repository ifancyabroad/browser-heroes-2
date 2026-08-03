import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "potent",
	name: "Potent",
	position: "prefix",
	rarity: "rare",
	weight: 1,
	appliesTo: [
		{ itemTypes: ["weapon"], weaponTypes: ["staff", "wand"] },
		{ itemTypes: ["armour"], armourSlots: ["helmet", "gloves", "amulet", "ring"] },
		{ itemTypes: ["armour"], armourSlots: ["body"], armourCategories: ["cloth"] },
	],
	modifiers: [
		{
			type: "modifyStat",
			stat: "saveDcBonus",
			value: 2,
		},
	],
});
