import { buildClass } from "../builders/buildClass";

export default buildClass({
	id: "battlemage",
	order: 7,
	name: "Battlemage",
	description: "Proficient in both the arcane arts and melee combat.",
	portrait: "classes/portraits/battlemage.png",
	enemyPortrait: "classes/enemy_portraits/battlemage.png",
	icon: "classes/icons/battlemage.png",
	attributes: {
		charisma: 10,
		constitution: 14,
		dexterity: 14,
		intelligence: 16,
		strength: 16,
		wisdom: 10,
	},
	combat: {
		hitDie: "1d8",
		skillIds: ["flame_arrow"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		armourTypes: ["light", "medium"],
		weaponTypes: [
			"longsword",
			"greatsword",
			"battleaxe",
			"spear",
			"warhammer",
			"quarterstaff",
			"staff",
		],
		savingThrows: ["constitution", "intelligence"],
	},
	skillPoolIds: ["barbarian", "warlock"],
	startingEquipment: {
		body: "base_hide_armour",
		mainHand: "base_quarterstaff",
	},
	tags: [],
});
