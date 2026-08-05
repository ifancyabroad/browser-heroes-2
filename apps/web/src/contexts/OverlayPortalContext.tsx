import { createContext, useContext, type PropsWithChildren } from "react";

const OverlayPortalContext = createContext<HTMLElement | null>(null);

type OverlayPortalProviderProps = PropsWithChildren<{
	container: HTMLElement | null;
}>;

export function OverlayPortalProvider({ container, children }: OverlayPortalProviderProps) {
	return (
		<OverlayPortalContext.Provider value={container}>{children}</OverlayPortalContext.Provider>
	);
}

export function useOverlayPortalContainer() {
	return useContext(OverlayPortalContext);
}
