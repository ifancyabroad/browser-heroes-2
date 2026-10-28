import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "mind_warper",
	name: "Mind Warper",
	description:
		"A crawling psychic organism cultivated within the temple's thought-vaults. Its keepers release it among prisoners before questioning those who retain enough memory to answer.",
	portrait: "enemies/temple/mind_warper.png",
	rank: "normal",
	threat: 15,
	attributes: {
		strength: 6,
		dexterity: 14,
		constitution: 14,
		intelligence: 18,
		wisdom: 16,
		charisma: 10,
	},
	combat: {
		hitDie: "1d6",
		armourClass: 14,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Claws",
			icon: "skills/common/claw_strike.png",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d6",
				type: "slashing",
				damageClass: "physical",
				attribute: "dexterity",
			},
		},
		skillIds: ["mind_lance", "power_word_confusion"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["intelligence", "wisdom"],
	},
	encounter: {
		zone: "temple",
		weight: 1,
	},
	tags: [],
});
