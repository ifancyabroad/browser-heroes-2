import { CLASSES_BY_ID } from "@app/content";
import { selectHeroView } from "@app/engine";
import type { RunView } from "@app/shared";
import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { HeroStatsDetails } from "./HeroStatsDetails";
import { useGameModalStore } from "../../../stores/gameModalStore";

export function HeroStatsModal({ run }: { run: RunView }) {
	const isOpen = useGameModalStore((state) => state.modal === "stats");
	const close = useGameModalStore((state) => state.close);
	if (!isOpen) {
		return null;
	}
	const heroView = selectHeroView(run.state.hero);
	const heroClass = CLASSES_BY_ID[heroView.classId];
	return (
		<Modal
			open
			title="Stats"
			size="lg"
			onClose={close}
			footer={
				<Button type="button" onClick={close}>
					Close
				</Button>
			}
		>
			<article className="grid min-w-0 gap-6">
				<header className="grid min-w-0 gap-2">
					<h2 className="text-primary wrap-anywhere">
						{heroView.name} the {heroClass.name}
					</h2>
					<p>Level {heroView.level}</p>
				</header>
				<div className="min-w-0">
					<HeroStatsDetails heroView={heroView} />
				</div>
			</article>
		</Modal>
	);
}
