import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { useRunHero } from "../../runs";
import { HeroDossier } from "./HeroDossier";

type HeroDossierModalProps = {
	runId: string | null;
	onClose: () => void;
};

export function HeroDossierModal({ runId, onClose }: HeroDossierModalProps) {
	const runHero = useRunHero(runId);
	return (
		<Modal
			open={Boolean(runId)}
			title="HERO DOSSIER"
			onClose={onClose}
			size="5xl"
			footer={
				<Button type="button" onClick={onClose}>
					CLOSE
				</Button>
			}
		>
			{runHero.isPending ? (
				<p className="py-12 text-center text-text-muted" aria-live="polite">
					Retrieving hero record...
				</p>
			) : runHero.isError ? null : (
				<HeroDossier view={runHero.data} />
			)}
		</Modal>
	);
}
