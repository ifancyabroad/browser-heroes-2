import { buildClass } from "../builders/buildClass";

export default buildClass({
	id: "priest",
	order: 3,
	name: "Priest",
	description: "Dedicated to the Gods, wielding both shadow and holy energy.",
	portrait: "classes/portraits/priest.png",
	enemyPortrait: "classes/enemy_portraits/priest.png",
	icon: "classes/icons/priest.png",
	attributes: {
		charisma: 10,
		constitution: 14,
		dexterity: 14,
		intelligence: 12,
		strength: 12,
		wisdom: 18,
	},
	combat: {
		hitDie: "1d8",
		skillIds: ["holy_bolt"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		armourTypes: ["cloth", "shield"],
		weaponTypes: ["mace", "hammer", "club", "staff"],
		savingThrows: ["wisdom", "charisma"],
	},
	skillPoolIds: ["cleric", "occultist"],
	startingEquipment: {
		body: "base_robe",
		mainHand: "base_mace",
		offHand: "base_buckler",
	},
	tags: [],
});
