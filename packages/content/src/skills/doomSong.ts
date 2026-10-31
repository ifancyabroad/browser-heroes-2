import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "doom_song",
	name: "Doom Song",
	description: "Prevent the enemy from healing on a failed Wisdom saving throw.",
	icon: "skills/unique/doom_song.png",
	pool: "unique",
	kind: "spell",
	category: "debuff",
	rarity: "legendary",
	maxUses: 1,
	effects: [
		{
			type: "modifyHealing",
			target: "enemy",
			multiplier: 0,
			duration: { unit: "battles", value: 3 },
			save: {
				attribute: "wisdom",
				onSuccess: "noEffect",
				dc: { attribute: "charisma", bonus: 6 },
			},
		},
	],
	tags: [],
});
