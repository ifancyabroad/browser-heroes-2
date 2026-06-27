import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "wraith_lord_malakar",
	name: "Wraith Lord Malakar",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NhkYK7-G0lWSQ6VxFJy?alt=media&token=b67f50e4-ec95-44e3-b32d-b76baa23a53e",
	rank: "boss",
	threat: 21,
	attributes: {
		strength: 6,
		dexterity: 16,
		constitution: 16,
		intelligence: 12,
		wisdom: 14,
		charisma: 15,
	},
	combat: {
		hitDie: "1d12",
		armourClass: 16,
		damageAffinities: {
			resistances: ["acid", "cold", "crushing", "fire", "lightning", "piercing", "slashing"],
			immunities: ["necrotic", "poison"],
			vulnerabilities: ["radiant"],
		},
		basicAttack: {
			name: "Withering Touch",
			attackAttribute: "charisma",
			damage: {
				dice: "1d8",
				type: "necrotic",
				attribute: "charisma",
			},
		},
		skills: [
			{
				skillId: "corrupting_touch",
				rank: 3,
			},
			{
				skillId: "wail",
				rank: 3,
			},
		],
		featIds: ["cloak_of_shadows"],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution", "charisma"],
	},
	encounter: {
		zone: "hills",
		weight: 1,
	},
	tags: [],
});
