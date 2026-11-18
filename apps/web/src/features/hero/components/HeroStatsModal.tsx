import { CLASSES_BY_ID } from "@app/content";
import { selectHeroView } from "@app/engine";
import type { RunView } from "@app/shared";
import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { resolveImageUrl } from "../../../utils/image";
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
			size="3xl"
			onClose={close}
			footer={
				<Button type="button" onClick={close}>
					Close
				</Button>
			}
		>
			<article className="grid items-start gap-6 md:grid-cols-[minmax(0,3fr)_minmax(0,5fr)] md:grid-rows-[min-content_1fr]">
				<header className="grid min-w-0 gap-2 md:col-start-2">
					<h2 className="text-primary wrap-anywhere">
						{heroView.name} the {heroClass.name}
					</h2>
					<p>Level {heroView.level}</p>
				</header>
				<div className="flex h-56 justify-center overflow-hidden bg-bg-base md:sticky md:top-0 md:col-start-1 md:row-span-2 md:row-start-1 md:h-96">
					<img
						src={resolveImageUrl(heroClass.portrait)}
						alt={`${heroClass.name} class portrait`}
						className="h-full w-auto max-w-none shrink-0"
					/>
				</div>
				<div className="min-w-0 md:col-start-2">
					<HeroStatsDetails heroView={heroView} />
				</div>
			</article>
		</Modal>
	);
}
