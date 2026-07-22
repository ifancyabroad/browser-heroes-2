import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "basilisk",
	name: "Basilisk",
	portrait: "enemies/volcano/basilisk.png",
	rank: "normal",
	threat: 11,
	attributes: {
		strength: 12,
		dexterity: 13,
		constitution: 11,
		intelligence: 2,
		wisdom: 10,
		charisma: 3,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 11,
		damageAffinities: {
			resistances: ["fire"],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Bite",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d6",
				type: "piercing",
				attribute: "dexterity",
			},
		},
		skillIds: ["petrifying_gaze", "leap_attack", "toxic_bite"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "strength"],
	},
	encounter: {
		zone: "volcano",
		weight: 1,
	},
	tags: [],
});
