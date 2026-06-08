import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "magma_elemental",
	name: "Magma Elemental",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC9T0NsJFrfYHqxt1nI?alt=media&token=4218dd9a-94df-4def-a67c-fc3378c273f9",
	rank: "normal",
	level: 19,
	threat: 19,
	attributes: {
		strength: 24,
		dexterity: 8,
		constitution: 19,
		intelligence: 8,
		wisdom: 11,
		charisma: 11,
	},
	combat: {
		hitDice: "19d8+95",
		armourClass: 19,
		proficiencyBonus: 6,
		damageAffinities: {
			resistances: ["acid", "crushing", "lightning", "piercing", "slashing"],
			immunities: ["fire", "poison"],
			vulnerabilities: ["cold"],
		},
		basicAttack: {
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+6",
				type: "crushing",
				attribute: "strength",
			},
		},
		skills: [
			{
				skillId: "double_strike",
				rank: 2,
			},
			{
				skillId: "molten_overdrive",
				rank: 2,
			},
			{
				skillId: "flame_slam",
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
