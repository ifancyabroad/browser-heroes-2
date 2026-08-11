import { buildClass } from "../builders/buildClass";

export default buildClass({
	id: "shadowblade",
	order: 6,
	name: "Shadowblade",
	description: "A swift assassin who blends shadow magic with precise weapon attacks.",
	portrait: "classes/portraits/shadowblade.png",
	enemyPortrait: "classes/enemy_portraits/shadowblade.png",
	icon: "classes/icons/shadowblade.png",
	attributes: {
		charisma: 10,
		constitution: 14,
		dexterity: 16,
		intelligence: 10,
		strength: 14,
		wisdom: 16,
	},
	combat: {
		hitDie: "1d8",
		skillIds: ["inflict_wounds"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		armourTypes: ["light"],
		weaponTypes: ["dagger", "shortsword", "longsword"],
		savingThrows: ["dexterity", "intelligence"],
	},
	skillPoolIds: ["assassin", "occultist"],
	startingEquipment: {
		body: "base_padded_armour",
		mainHand: "base_shortsword",
	},
	tags: [],
});
