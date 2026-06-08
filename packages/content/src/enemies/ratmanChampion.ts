import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ratman_champion",
	name: "Ratman Champion",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9_WjPXKCDzDO9idJPs?alt=media&token=0ac491ce-0402-4a7c-b7ba-05758f70dc21",
	rank: "normal",
	level: 15,
	threat: 15,
	attributes: {
		strength: 16,
		dexterity: 16,
		constitution: 14,
		intelligence: 10,
		wisdom: 12,
		charisma: 6,
	},
	combat: {
		hitDice: "15d8+47",
		armourClass: 12,
		proficiencyBonus: 5,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Claw",
			attackAttribute: "strength",
			damage: {
				dice: "1d4",
				type: "slashing",
				attribute: "strength",
			},
		},
		skills: [
			{
				skillId: "shield_wall",
				rank: 2,
			},
			{
				skillId: "disarm",
				rank: 2,
			},
			{
				skillId: "rend",
				rank: 2,
			},
		],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "dexterity"],
	},
	encounter: {
		zone: "desert",
		weight: 1,
	},
	tags: [],
});
