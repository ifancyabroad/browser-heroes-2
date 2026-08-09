import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "the_elder_squid",
	name: "The Elder Squid",
	portrait: "enemies/ocean/the_elder_squid.png",
	rank: "boss",
	threat: 24,
	attributes: {
		strength: 18,
		dexterity: 15,
		constitution: 18,
		intelligence: 25,
		wisdom: 22,
		charisma: 18,
	},
	combat: {
		hitDie: "1d12",
		armourClass: 17,
		damageAffinities: {
			resistances: ["cold"],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Tentacle",
			attackAttribute: "strength",
			damage: {
				dice: "2d6",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: [
			"globe_of_invulnerability",
			"drain_energy",
			"tentacle_wrap",
			"psionic_blast",
			"drain_life",
		],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["constitution", "intelligence", "wisdom"],
	},
	encounter: {
		zone: "ocean",
		weight: 1,
	},
	tags: [],
});
