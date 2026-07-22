import { buildClass } from "../builders/buildClass";

export default buildClass({
	id: "mage",
	name: "Mage",
	description: "Master of the arcane arts and proficient with all forms of magic.",
	portrait: "classes/portraits/mage.png",
	enemyPortrait: "classes/enemy_portraits/mage.png",
	icon: "classes/icons/mage.png",
	attributes: {
		charisma: 12,
		constitution: 14,
		dexterity: 14,
		intelligence: 18,
		strength: 10,
		wisdom: 12,
	},
	combat: {
		hitDie: "1d6",
		skillIds: ["sparks"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		armourTypes: ["cloth"],
		weaponTypes: ["staff", "wand"],
		savingThrows: ["intelligence", "wisdom"],
	},
	skillPoolIds: ["mage", "warlock"],
	startingEquipment: {
		body: "base_robe",
		mainHand: "base_staff",
	},
	tags: [],
});
