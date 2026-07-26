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
			size="xl"
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
			) : runHero.isError ? (
				<div className="grid justify-items-center gap-4 py-12 text-center">
					<p className="text-error">Unable to retrieve this hero.</p>
					<Button type="button" onClick={() => void runHero.refetch()}>
						RETRY
					</Button>
				</div>
			) : (
				<HeroDossier view={runHero.data} />
			)}
		</Modal>
	);
}
