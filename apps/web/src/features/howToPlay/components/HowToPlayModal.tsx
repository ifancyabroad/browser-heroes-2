import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { useHowToPlayModalStore } from "../stores/howToPlayModalStore";

const sections = [
	{
		title: "FIGHT",
		body: "Combat is turn-based. Use basic attacks, class skills, and healing potions to defeat each enemy before they defeat you.",
	},
	{
		title: "GROW STRONGER",
		body: "Victories award XP and gold. Level up to learn skills and feats, and defeat bosses to earn valuable reward choices.",
	},
	{
		title: "CHOOSE YOUR PACE",
		body: "After a victory, continue fighting to build a more rewarding streak or return to town to prepare. Returning to town ends your streak.",
	},
	{
		title: "PREPARE IN TOWN",
		body: "Spend gold on equipment and healing potions, rest to recover health, reroll the shop, and inspect your hero before the next battle.",
	},
	{
		title: "SURVIVE THE JOURNEY",
		body: "Bosses guard every tenth battle. Push toward the final boss, but choose your risks carefully: if your hero dies, the run ends.",
	},
] as const;

export function HowToPlayModal() {
	const isOpen = useHowToPlayModalStore((state) => state.isOpen);
	const close = useHowToPlayModalStore((state) => state.close);

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
				<p className="text-text-bright">
					Guide your hero through a dangerous ladder of battles, growing stronger with
					every victory.
				</p>

				<div className="grid gap-4">
					{sections.map((section) => (
						<section key={section.title} className="grid gap-1">
							<h2 className="text-primary">{section.title}</h2>
							<p className="text-text">{section.body}</p>
						</section>
					))}
				</div>

				<p className="text-text-muted">
					There is no retreat after combat begins. Prepare well, then choose each action
					carefully.
				</p>
			</div>
		</Modal>
	);
}
