import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "water_elemental",
	name: "Water Elemental",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC9R4bc-LU3XAlwo921?alt=media&token=ec97df23-e33f-4e06-9aca-46dd9da7495b",
	rank: "normal",
	threat: 17,
	attributes: {
		strength: 20,
		dexterity: 16,
		constitution: 18,
		intelligence: 5,
		wisdom: 10,
		charisma: 8,
	},
	combat: {
		hitDice: "17d8+86",
		armourClass: 15,
		proficiencyBonus: 6,
		damageAffinities: {
			resistances: ["acid", "cold", "crushing", "fire", "lightning", "piercing", "slashing"],
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
		skills: [
			{
				skillId: "double_strike",
				rank: 2,
			},
			{
				skillId: "whelm",
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
