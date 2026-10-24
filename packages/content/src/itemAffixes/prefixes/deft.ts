import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "deft",
	name: "Deft",
	position: "prefix",
	rarity: "rare",
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
			value: 1,
		},
		{
			type: "modifyDamage",
			attackRange: "melee",
			operation: "add",
			value: 1,
		},
	],
});
