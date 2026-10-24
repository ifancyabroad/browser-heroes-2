import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "dexterous",
	name: "Dexterous",
	position: "prefix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: [
		{
			itemTypes: ["weapon"],
			weaponTypes: ["dagger", "shortsword"],
			attackRanges: ["melee"],
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
			type: "modifyDamage",
			attackRange: "melee",
			operation: "add",
			value: 2,
		},
	],
});
