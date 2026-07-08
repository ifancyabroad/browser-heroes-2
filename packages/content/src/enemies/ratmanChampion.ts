import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ratman_champion",
	name: "Ratman Champion",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9_WjPXKCDzDO9idJPs?alt=media&token=0ac491ce-0402-4a7c-b7ba-05758f70dc21",
	rank: "normal",
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
		hitDie: "1d8",
		armourClass: 12,
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
		skillIds: ["shield_wall", "disarm", "rend"],
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
