import { buildClass } from "../builders/buildClass";

export default buildClass({
	id: "mage",
	order: 2,
	name: "Mage",
	description: "An arcane specialist who overwhelms enemies with powerful magic.",
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
		hitDie: "1d8",
		skillIds: ["sparks"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		armourTypes: ["cloth"],
		weaponTypes: ["staff", "wand"],
		savingThrows: ["intelligence", "wisdom"],
	},
	skillPoolIds: ["wizard", "warlock"],
	startingEquipment: {
		body: "base_robe",
		mainHand: "base_fire_staff",
	},
	tags: [],
});
