import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "abyss_rider",
	name: "Abyss Rider",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC4WTNNAtwspArSOQjX?alt=media&token=488c44be-c89e-4501-bd74-6e1f9132ea10",
	rank: "normal",
	threat: 17,
	attributes: {
		strength: 18,
		dexterity: 16,
		constitution: 16,
		intelligence: 12,
		wisdom: 14,
		charisma: 18,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 16,
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
			attackAttribute: "strength",
			damage: {
				dice: "1d4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["armour_break", "deafening_roar", "leap_attack", "wind_strike"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "charisma"],
	},
	encounter: {
		zone: "abyss",
		weight: 1,
	},
	tags: [],
});
