import { buildClass } from "../builders/buildClass";

export default buildClass({
	id: "fighter",
	order: 1,
	name: "Fighter",
	description: "Proud and honorable, specialising in brute strength. ",
	portrait: "classes/portraits/fighter.png",
	enemyPortrait: "classes/enemy_portraits/fighter.png",
	icon: "classes/icons/fighter.png",
	attributes: {
		charisma: 12,
		constitution: 16,
		dexterity: 14,
		intelligence: 10,
		strength: 18,
		wisdom: 10,
	},
	combat: {
		hitDie: "1d10",
		skillIds: ["armour_break"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		armourTypes: ["heavy", "medium", "shield"],
		weaponTypes: ["sword", "axe", "club", "hammer", "mace", "spear"],
		savingThrows: ["strength", "constitution"],
	},
	skillPoolIds: ["warrior", "barbarian"],
	startingEquipment: {
		body: "base_hide_armour",
		mainHand: "base_longsword",
	},
	tags: [],
});
