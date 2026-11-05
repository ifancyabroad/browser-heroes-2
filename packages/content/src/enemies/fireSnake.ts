import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "fire_snake",
	name: "Fire Snake",
	shortName: "Fire Snake",
	description:
		"A volcanic constrictor whose bite sears flesh as deeply as its fangs pierce it. It shelters in warm fissures and emerges to hunt as the slopes cool.",
	portrait: "enemies/volcano/fire_snake.png",
	rank: "normal",
	threat: 20,
	attributes: {
		strength: 19,
		dexterity: 14,
		constitution: 16,
		intelligence: 1,
		wisdom: 10,
		charisma: 3,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 16,
		initiative: 11,
		damageAffinities: {
			resistances: ["fire", "lightning"],
			immunities: [],
			vulnerabilities: ["cold"],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Bite",
			icon: "skills/common/bite.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d8",
				type: "piercing",
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
							damageType: "fire",
							damageClass: "other",
							dice: "2d6",
						},
					],
				},
			],
		},
		skillIds: ["constrict", "flame_spit"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity"],
	},
	encounter: {
		zone: "volcano",
		weight: 1,
	},
	tags: [],
});
