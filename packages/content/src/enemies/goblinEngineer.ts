import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "goblin_engineer",
	name: "Goblin Engineer",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC4PtHUmQIZX6B7gfXs?alt=media&token=e4fbcd11-2c14-4df7-a6e1-c2c65f497abf",
	rank: "normal",
	threat: 12,
	attributes: {
		strength: 8,
		dexterity: 14,
		constitution: 10,
		intelligence: 10,
		wisdom: 8,
		charisma: 8,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 12,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "1d4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skills: [
			{
				skillId: "acid_bomb",
				rank: 2,
			},
			{
				skillId: "poison_bomb",
				rank: 2,
			},
		],
		featIds: ["corrosive_craft"],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution"],
	},
	encounter: {
		zone: "abyss",
		weight: 1,
	},
	tags: [],
});
