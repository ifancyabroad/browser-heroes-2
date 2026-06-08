import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "berserker",
	name: "Berserker",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-GX-m_V2DTyU-_-ss?alt=media&token=99a36d53-e9a8-4511-a28c-76fe9530cd37",
	rank: "normal",
	level: 12,
	threat: 12,
	attributes: {
		strength: 16,
		dexterity: 12,
		constitution: 14,
		intelligence: 10,
		wisdom: 10,
		charisma: 10,
	},
	combat: {
		hitDice: "12d8+40",
		armourClass: 10,
		proficiencyBonus: 4,
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
				skillId: "armour_break",
				rank: 2,
			},
			{
				skillId: "berserk",
				rank: 2,
			},
			{
				skillId: "cleave",
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
		zone: "castle",
		weight: 1,
	},
	tags: [],
});
