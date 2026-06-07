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
		maxHp: 94,
		armourClass: 10,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Slam",
			attackBonus: 7,
			damage: {
				dice: "1d4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["armour_break", "berserk", "cleave"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "castle",
		weight: 1,
	},
	tags: [],
});
