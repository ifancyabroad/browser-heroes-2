import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "nature_elemental",
	name: "Nature Elemental",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC9S8vQ1mIwHqZ4JlBC?alt=media&token=c663ee31-ab03-453f-8cd0-97d15e750740",
	rank: "normal",
	level: 18,
	threat: 18,
	attributes: {
		strength: 18,
		dexterity: 14,
		constitution: 20,
		intelligence: 8,
		wisdom: 12,
		charisma: 10,
	},
	combat: {
		hitDice: "18d8+109",
		armourClass: 16,
		proficiencyBonus: 6,
		damageAffinities: {
			resistances: ["acid", "cold", "crushing", "lightning", "piercing", "slashing"],
			immunities: ["poison"],
			vulnerabilities: ["fire"],
		},
		basicAttack: {
			name: "Venomous Bite",
			attackAttribute: "constitution",
			damage: {
				dice: "2d4+2",
				type: "poison",
				attribute: "constitution",
			},
		},
		skills: [
			{
				skillId: "nature_s_blessing",
				rank: 2,
			},
			{
				skillId: "poison_cloud",
				rank: 2,
			},
		],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["constitution", "strength"],
	},
	encounter: {
		zone: "tower",
		weight: 1,
	},
	tags: [],
});
