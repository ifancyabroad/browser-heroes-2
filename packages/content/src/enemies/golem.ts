import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "golem",
	name: "Golem",
	portrait: "enemies/volcano/golem.png",
	rank: "normal",
	threat: 22,
	attributes: {
		strength: 22,
		dexterity: 9,
		constitution: 20,
		intelligence: 3,
		wisdom: 11,
		charisma: 1,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 19,
		damageAffinities: {
			resistances: ["crushing", "lightning", "piercing", "slashing"],
			immunities: ["poison"],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "2d6",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["knock_down", "reconstruct", "acquire_target", "double_strike"],
		featIds: [],
		tactic: "defensive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "volcano",
		weight: 1,
	},
	tags: [],
});
