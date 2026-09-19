import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "dunzarak_the_deceived",
	name: "Dunzarak the Deceived",
	description:
		"An ancient dragon lured into the abyss by a promise of dominion and bound there instead. He visits his fury on every newcomer, convinced each serves the one who betrayed him.",
	portrait: "enemies/abyss/dunzarak_the_deceived.png",
	rank: "boss",
	threat: 28,
	attributes: {
		strength: 27,
		dexterity: 14,
		constitution: 25,
		intelligence: 16,
		wisdom: 15,
		charisma: 24,
	},
	combat: {
		hitDie: "1d12",
		armourClass: 22,
		damageAffinities: {
			resistances: [
				"acid",
				"cold",
				"crushing",
				"fire",
				"lightning",
				"piercing",
				"poison",
				"slashing",
			],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Bite",
			icon: "skills/common/bite.png",
			attackAttribute: "strength",
			damage: {
				dice: "2d10",
				type: "piercing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["fire_breath", "tail_swipe", "double_strike", "summon_storm", "dragon_focus"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution", "wisdom", "charisma"],
	},
	encounter: {
		zone: "abyss",
		weight: 1,
	},
	tags: [],
});
