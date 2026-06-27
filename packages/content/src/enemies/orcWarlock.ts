import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "orc_warlock",
	name: "Orc Warlock",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-mYiqLTBYHHTIpxuO?alt=media&token=30a31701-e47a-4b63-a934-08850c3cb20a",
	rank: "normal",
	threat: 15,
	attributes: {
		strength: 14,
		dexterity: 12,
		constitution: 16,
		intelligence: 18,
		wisdom: 14,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 13,
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
				skillId: "fireball",
				rank: 2,
			},
		],
		featIds: ["shadow_focus", "iron_skin", "embrace_shadows"],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["intelligence", "constitution"],
	},
	encounter: {
		zone: "plains",
		weight: 1,
	},
	tags: [],
});
