import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "magic_sentry",
	name: "Magic Sentry",
	description:
		"A suit of island wargear animated by a sealed enchantment. Its cold-burning crown still answers commands inscribed before the surrounding fortress fell into ruin.",
	portrait: "enemies/island/magic_sentry.png",
	rank: "normal",
	threat: 16,
	attributes: {
		strength: 16,
		dexterity: 10,
		constitution: 16,
		intelligence: 3,
		wisdom: 10,
		charisma: 1,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 18,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Fine Frostblade",
			icon: "items/weapons/swords/Sword_17.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+1",
				type: "cold",
				damageClass: "magical",
				attribute: "strength",
			},
		},
		skillIds: ["acquire_target", "power_word_shield"],
		featIds: [],
		tactic: "defensive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "island",
		weight: 1,
	},
	tags: [],
});
