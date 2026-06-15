import { useState } from "react";
import { Modal } from "../../../components/Modal";

type HeroNameModalProps = {
	open: boolean;
	isSubmitting?: boolean;
	onClose: () => void;
	onConfirm: (heroName: string) => void;
};

export function HeroNameModal({
	open,
	isSubmitting = false,
	onClose,
	onConfirm,
}: HeroNameModalProps) {
	const [heroName, setHeroName] = useState("");

	const trimmedName = heroName.trim();

	function handleSubmit(event: React.FormEvent) {
		event.preventDefault();

		if (!trimmedName) {
			return;
		}

		onConfirm(trimmedName);
	}

	return (
		<Modal
			open={open}
			title="Name your hero"
			onClose={onClose}
			closeOnBackdropClick={!isSubmitting}
			footer={
				<>
					<button type="button" onClick={onClose} disabled={isSubmitting}>
						Cancel
					</button>

					<button
						type="submit"
						form="hero-name-form"
						disabled={!trimmedName || isSubmitting}
					>
						{isSubmitting ? "Creating..." : "Start Game"}
					</button>
				</>
			}
		>
			<form id="hero-name-form" onSubmit={handleSubmit}>
				<label>
					Hero name
					<input
						value={heroName}
						onChange={(event) => setHeroName(event.target.value)}
						disabled={isSubmitting}
						autoFocus
					/>
				</label>
			</form>
		</Modal>
	);
}
