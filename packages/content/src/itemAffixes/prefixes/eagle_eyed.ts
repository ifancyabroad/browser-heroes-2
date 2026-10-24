import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "eagle_eyed",
	name: "Eagle-Eyed",
	position: "prefix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: [
		{
			itemTypes: ["weapon"],
			weaponTypes: ["bow", "crossbow"],
			attackRanges: ["ranged"],
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
			attackRange: "ranged",
			operation: "add",
			value: 2,
		},
	],
});
