import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "wandering_fiend",
	name: "Wandering Fiend",
	shortName: "Fiend",
	description:
		"A horned island predator that wanders between ruined settlements in search of prey. Its tracks often follow abandoned roads long after the surrounding jungle has reclaimed them.",
	portrait: "enemies/island/wandering_fiend.png",
	rank: "normal",
	threat: 14,
	attributes: {
		strength: 16,
		dexterity: 12,
		constitution: 16,
		intelligence: 4,
		wisdom: 12,
		charisma: 6,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 14,
		initiative: 11,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Claws",
			icon: "skills/common/claw_strike.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d8",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["leap_attack", "frenzy"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["constitution"],
	},
	encounter: {
		zone: "island",
		weight: 1,
	},
	tags: [],
});
