import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { useGameModalStore } from "../../../stores/gameModalStore";

const sections = [
	{
		title: "OBJECTIVE",
		body: "Progress as far as you can against a neverending queue of enemies. If your hero dies, the run ends.",
	},
	{
		title: "COMBAT",
		body: "Combat is turn-based. Use attacks, skills and healing potions to defeat enemies. You cannot retreat once a battle begins.",
	},
	{
		title: "LEVEL UP",
		body: "Defeat enemies to earn XP and gold. Level up to choose new skills and feats. Defeat bosses for additional rewards.",
	},
	{
		title: "TOWN",
		body: "Buy equipment at the shop and healing potions at the alchemist. Rest at the tavern to restore health and skill uses.",
	},
	{
		title: "STREAKS",
		body: "After a victory, keep fighting to increase your gold multiplier or return to town to recover and buy supplies. Returning to town resets your streak.",
	},
] as const;

export function HowToPlayModal() {
	const isOpen = useGameModalStore((state) => state.modal === "howToPlay");
	const close = useGameModalStore((state) => state.close);

	return (
		<Modal
			open={isOpen}
			title="HOW TO PLAY"
			size="xl"
			onClose={close}
			footer={
				<Button variant="primary" type="button" onClick={close}>
					Close
				</Button>
			}
		>
			<div className="grid gap-4 text-base">
				<p className="text-text-bright">Welcome to Safehaven.</p>
				<p className="text-text-bright">
					You are an adventurer that has been tasked with ridding the area of monsters.
					Unfortunately for you, this particular town happens to be surrounded by evil,
					each zone more deadly than the last.
				</p>

				<p className="text-text-bright">
					With that said, what are adventurers for if not slaying monsters? Now get out
					there and kill everything in sight!
				</p>

				<div className="grid gap-4">
					{sections.map((section) => (
						<section key={section.title} className="grid gap-1">
							<h2 className="text-primary">{section.title}</h2>
							<p className="text-text">{section.body}</p>
						</section>
					))}
				</div>
			</div>
		</Modal>
	);
}
