import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ice_elemental",
	name: "Ice Elemental",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC9RSTcdzO5pmuTfjSM?alt=media&token=e7f747be-4aeb-4e67-ba18-2cbde44ffdb5",
	rank: "normal",
	threat: 20,
	attributes: {
		strength: 24,
		dexterity: 18,
		constitution: 19,
		intelligence: 8,
		wisdom: 11,
		charisma: 11,
	},
	combat: {
		hitDice: "20d8+100",
		armourClass: 20,
		proficiencyBonus: 6,
		damageAffinities: {
			resistances: ["acid", "crushing", "lightning", "piercing", "slashing"],
			immunities: ["cold", "poison"],
			vulnerabilities: ["fire"],
		},
		basicAttack: {
			name: "Freezing Touch",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+6",
				type: "cold",
				attribute: "strength",
			},
		},
		skills: [
			{
				skillId: "double_strike",
				rank: 2,
			},
			{
				skillId: "ice_punch",
				rank: 2,
			},
		],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "tower",
		weight: 1,
	},
	tags: [],
});
