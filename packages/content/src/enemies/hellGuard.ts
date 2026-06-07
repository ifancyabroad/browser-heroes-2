import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "hell_guard",
	name: "Hell Guard",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC9OdqzOPN2-Z14tnxO?alt=media&token=37d332a9-9861-4c88-85ca-6c9ff2a0796c",
	rank: "normal",
	level: 16,
	threat: 16,
	attributes: {
		strength: 16,
		dexterity: 22,
		constitution: 18,
		intelligence: 10,
		wisdom: 12,
		charisma: 14,
	},
	combat: {
		maxHp: 154,
		armourClass: 16,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: [
				"acid",
				"cold",
				"crushing",
				"fire",
				"lightning",
				"piercing",
				"poison",
				"slashing",
			],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Slam",
			attackBonus: 8,
			damage: {
				dice: "1d4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["multi_shot", "drop_from_above", "hunters_s_mark"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "dungeon",
		weight: 1,
	},
	tags: [],
});
