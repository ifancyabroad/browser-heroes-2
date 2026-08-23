import { Button } from "./Button";
import { Modal } from "./Modal";

type AbandonRunModalProps = {
	heroName: string;
	onClose: () => void;
	onConfirm: () => void;
};

export function AbandonRunModal({ heroName, onClose, onConfirm }: AbandonRunModalProps) {
	return (
		<Modal
			open
			title="ABANDON CURRENT RUN?"
			onClose={onClose}
			footer={
				<>
					<Button type="button" onClick={onClose}>
						CANCEL
					</Button>
					<Button type="button" variant="danger" onClick={onConfirm}>
						ABANDON RUN
					</Button>
				</>
			}
		>
			<p>
				Starting a new run will permanently abandon your current run with {heroName}. This
				cannot be undone.
			</p>
		</Modal>
	);
}
