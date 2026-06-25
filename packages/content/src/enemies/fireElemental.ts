import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "fire_elemental",
	name: "Fire Elemental",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC9R-HzyJPG_LQJmkym?alt=media&token=2a7ee4c5-a919-44f8-80e8-ca931bb2e545",
	rank: "normal",
	threat: 16,
	attributes: {
		strength: 12,
		dexterity: 19,
		constitution: 18,
		intelligence: 8,
		wisdom: 12,
		charisma: 7,
	},
	combat: {
		hitDice: "1d8+5",
		armourClass: 14,
		proficiencyBonus: 5,
		damageAffinities: {
			resistances: ["acid", "crushing", "lightning", "piercing", "slashing"],
			immunities: ["fire", "poison"],
			vulnerabilities: ["cold"],
		},
		basicAttack: {
			name: "Burning Touch",
			attackAttribute: "dexterity",
			damage: {
				dice: "2d4+2",
				type: "fire",
				attribute: "dexterity",
			},
		},
		skills: [
			{
				skillId: "double_strike",
				rank: 2,
			},
			{
				skillId: "burning_rampage",
				rank: 2,
			},
		],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution"],
	},
	encounter: {
		zone: "tower",
		weight: 1,
	},
	tags: [],
});
