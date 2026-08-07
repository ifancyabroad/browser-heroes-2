import { buildClass } from "../builders/buildClass";

export default buildClass({
	id: "paladin",
	order: 5,
	name: "Paladin",
	description: "A noble warrior bound by divine oath, wielding both sword and faith.",
	portrait: "classes/portraits/paladin.png",
	enemyPortrait: "classes/enemy_portraits/paladin.png",
	icon: "classes/icons/paladin.png",
	attributes: {
		charisma: 12,
		constitution: 14,
		dexterity: 12,
		intelligence: 10,
		strength: 16,
		wisdom: 16,
	},
	combat: {
		hitDie: "1d10",
		skillIds: ["holy_strike"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		armourTypes: ["heavy", "medium", "shield"],
		weaponTypes: [
			"longsword",
			"greatsword",
			"handaxe",
			"battleaxe",
			"mace",
			"morningstar",
			"flail",
			"hammer",
			"warhammer",
			"spear",
		],
		savingThrows: ["wisdom", "charisma"],
	},
	skillPoolIds: ["fighter", "cleric"],
	startingEquipment: {
		body: "base_breastplate",
		mainHand: "base_hammer",
		offHand: "base_shield",
	},
	tags: [],
});
