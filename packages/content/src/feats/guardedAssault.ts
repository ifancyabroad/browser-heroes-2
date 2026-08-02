import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "guarded_assault",
	name: "Guarded Assault",
	description: "Critical hits grant an 8-point shield for 2 turns.",
	icon: "skills/feats/Skill_ShieldHit_nb.png",
	kind: "training",
	category: "defensive",
	modifiers: [],
	attackRiders: [
		{
			timing: "onCrit",
			effects: [
				{
					type: "shield",
					target: "self",
					amount: 8,
					durationTurns: 2,
				},
			],
		},
	],
	tags: [],
});
