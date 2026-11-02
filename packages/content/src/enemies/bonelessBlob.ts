import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "boneless_blob",
	name: "Boneless Blob",
	description:
		"A mindless heap of demonic flesh that seizes prey with tendrils slick with digestive acid. Lesser fiends lure it towards refuse pits, then pick through what remains.",
	portrait: "enemies/hell/boneless_blob.png",
	rank: "normal",
	threat: 23,
	attributes: {
		strength: 18,
		dexterity: 6,
		constitution: 20,
		intelligence: 1,
		wisdom: 6,
		charisma: 1,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 8,
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
			attackRange: "melee",
			name: "Grasping Tendril",
			icon: "skills/common/tentacle_wrap.png",
			attackAttribute: "strength",
			damage: {
				dice: "2d8",
				type: "crushing",
				damageClass: "physical",
				attribute: "strength",
			},
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "damage",
							target: "enemy",
							damageType: "acid",
							damageClass: "other",
							dice: "3d4",
						},
					],
				},
			],
		},
		skillIds: ["reform", "consume"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["constitution"],
	},
	encounter: {
		zone: "hell",
		weight: 1,
	},
	tags: [],
});
