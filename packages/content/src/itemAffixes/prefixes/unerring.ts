import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "unerring",
	name: "Unerring",
	position: "prefix",
	rarity: "epic",
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
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			value: 2,
		},
	],
});
