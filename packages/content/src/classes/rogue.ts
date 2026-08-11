import { buildClass } from "../builders/buildClass";

export default buildClass({
	id: "rogue",
	order: 4,
	name: "Rogue",
	description: "An agile opportunist who uses poison, precision, and ranged weapons.",
	portrait: "classes/portraits/rogue.png",
	enemyPortrait: "classes/enemy_portraits/rogue.png",
	icon: "classes/icons/rogue.png",
	attributes: {
		charisma: 14,
		constitution: 14,
		dexterity: 18,
		intelligence: 12,
		strength: 12,
		wisdom: 10,
	},
	combat: {
		hitDie: "1d8",
		skillIds: ["poison_bomb"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		armourTypes: ["light"],
		weaponTypes: ["dagger", "shortsword", "crossbow", "bow"],
		savingThrows: ["dexterity", "charisma"],
	},
	skillPoolIds: ["thief", "assassin"],
	startingEquipment: {
		body: "base_padded_armour",
		mainHand: "base_dagger",
	},
	tags: [],
});
