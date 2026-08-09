import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "urzul_the_ascended",
	name: "Urzul the Ascended",
	portrait: "enemies/plains/urzul_the_ascended.png",
	rank: "boss",
	threat: 19,
	attributes: {
		strength: 14,
		dexterity: 12,
		constitution: 18,
		intelligence: 18,
		wisdom: 18,
		charisma: 12,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 13,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Staff of Lightning",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+1",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: [
			"cure_major_wounds",
			"flamestrike",
			"lightning_bolt",
			"blessing_of_the_old_gods",
		],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["intelligence", "wisdom", "charisma"],
	},
	encounter: {
		zone: "plains",
		weight: 1,
	},
	tags: [],
});
