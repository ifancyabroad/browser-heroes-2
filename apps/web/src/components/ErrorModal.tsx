import { Modal } from "./Modal";
import { useErrorModalStore } from "../stores/errorModalStore";
import { Button } from "./Button";

export function ErrorModal() {
	const message = useErrorModalStore((state) => state.message);
	const hideError = useErrorModalStore((state) => state.hideError);

	return (
		<Modal
			open={message !== null}
			title="Something went wrong"
			onClose={hideError}
			footer={
				<Button variant="primary" type="button" onClick={hideError}>
					Close
				</Button>
			}
		>
			<p>{message}</p>
		</Modal>
	);
}
