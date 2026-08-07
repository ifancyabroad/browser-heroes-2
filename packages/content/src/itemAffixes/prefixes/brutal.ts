import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "brutal",
	name: "Brutal",
	position: "prefix",
	rarity: "epic",
	weight: 0.75,
	appliesTo: [
		{
			itemTypes: ["weapon"],
			weaponTypes: ["battleaxe", "greatclub", "greatsword", "warhammer"],
		},
	],
	modifiers: [
		{
			type: "modifyStat",
			stat: "criticalDiceMultiplierBonus",
			value: 4,
		},
	],
});
