import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "urzul_the_ascended",
	name: "Urzul the Ascended",
	portrait: "enemies/plains/urzul_the_ascended.png",
	rank: "boss",
	threat: 20,
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
			attackRange: "melee",
			name: "Staff of Lightning",
			attackAttribute: "intelligence",
			damage: {
				dice: "1d8+2",
				type: "lightning",
				damageClass: "magical",
				attribute: "intelligence",
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
