import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "titanforged",
	name: "Titanforged",
	position: "prefix",
	rarity: "epic",
	weight: 0.5,
	appliesTo: [
		{
			itemTypes: ["weapon"],
			weaponTypes: ["battleaxe", "greatclub", "greatsword", "warhammer"],
			damageClasses: ["physical"],
		},
	],
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
			value: 2,
		},
		{
			type: "modifyDamage",
			damageClass: "physical",
			operation: "add",
			value: 2,
		},
	],
});
