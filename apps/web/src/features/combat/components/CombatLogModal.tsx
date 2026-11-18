import type { RunView } from "@app/shared";
import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { CombatLogPanel } from "./CombatLogPanel";
import { useGameModalStore } from "../../../stores/gameModalStore";

export function CombatLogModal({ run }: { run: RunView }) {
	const isOpen = useGameModalStore((state) => state.modal === "combatLog");
	const close = useGameModalStore((state) => state.close);
	if (!isOpen || !run.state.combat) {
		return null;
	}
	return (
		<Modal
			open
			title="Combat Log"
			size="lg"
			onClose={close}
			footer={
				<Button type="button" onClick={close}>
					Close
				</Button>
			}
		>
			<CombatLogPanel entries={run.state.combat.log} className="max-h-[60dvh]" />
		</Modal>
	);
}
