import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "surehanded",
	name: "Surehanded",
	position: "prefix",
	rarity: "rare",
	weight: 1,
	appliesTo: [
		{
			itemTypes: ["weapon"],
			weaponTypes: ["bow", "crossbow", "dagger", "shortsword"],
			damageClasses: ["physical"],
		},
	],
	modifiers: [
		{
			type: "modifyStat",
			stat: "dexterity",
			value: 1,
		},
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			value: 1,
		},
	],
});
