import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "golem",
	name: "Golem",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NgTqLUaOc0-qU_ug8Ly?alt=media&token=6f22be7b-9965-4091-abb4-725b0592f1ee",
	rank: "normal",
	threat: 19,
	attributes: {
		strength: 22,
		dexterity: 9,
		constitution: 20,
		intelligence: 3,
		wisdom: 11,
		charisma: 1,
	},
	combat: {
		hitDie: "1d8",
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
				dice: "2d4+2",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["knock_down", "reconstruct", "acquire_target", "double_strike"],
		featIds: [],
		tactic: "default",
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
