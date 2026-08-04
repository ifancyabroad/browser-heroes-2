import { buildClass } from "../builders/buildClass";

export default buildClass({
	id: "artificer",
	order: 8,
	name: "Artificer",
	description: "An ingenious arcanist who wields enchanted devices and volatile compounds.",
	portrait: "classes/portraits/artificer.png",
	enemyPortrait: "classes/enemy_portraits/artificer.png",
	icon: "classes/icons/artificer.png",
	attributes: {
		charisma: 10,
		constitution: 14,
		dexterity: 16,
		intelligence: 18,
		strength: 10,
		wisdom: 12,
	},
	combat: {
		hitDie: "1d8",
		skillIds: ["acid_strike"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		armourTypes: ["cloth", "light"],
		weaponTypes: ["crossbow", "dagger", "staff", "wand"],
		savingThrows: ["dexterity", "intelligence"],
	},
	skillPoolIds: ["mage", "rogue"],
	startingEquipment: {
		body: "base_padded_armour",
		mainHand: "base_crossbow",
	},
	tags: [],
});
