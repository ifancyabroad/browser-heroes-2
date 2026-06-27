import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "necromental",
	name: "Necromental",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC9SIL6W0nRljBdyt11?alt=media&token=5dd8e3eb-aa6d-447d-9617-ed0acccbe512",
	rank: "normal",
	threat: 17,
	attributes: {
		strength: 20,
		dexterity: 14,
		constitution: 18,
		intelligence: 8,
		wisdom: 12,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 17,
		damageAffinities: {
			resistances: ["acid", "cold", "fire", "lightning", "piercing", "slashing"],
			immunities: ["poison"],
			vulnerabilities: ["crushing", "radiant"],
		},
		basicAttack: {
			name: "Claw",
			attackAttribute: "strength",
			damage: {
				dice: "2d4+2",
				type: "slashing",
				attribute: "strength",
			},
		},
		skills: [
			{
				skillId: "double_strike",
				rank: 2,
			},
			{
				skillId: "reassemble",
				rank: 2,
			},
			{
				skillId: "devour_soul",
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
