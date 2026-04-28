import { createContext, useCallback, useContext, useState, lazy, Suspense, type ReactNode } from "react";

const SignupModal = lazy(() =>
  import("@/components/SignupModal").then((m) => ({ default: m.SignupModal }))
);

type Ctx = { open: () => void; close: () => void; isOpen: boolean };

const SignupModalContext = createContext<Ctx | null>(null);

export function SignupModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <SignupModalContext.Provider value={{ open, close, isOpen }}>
      {children}
      <Suspense fallback={null}>
        {isOpen && <SignupModal isOpen={isOpen} onClose={close} />}
      </Suspense>
    </SignupModalContext.Provider>
  );
}

export function useSignupModal(): Ctx {
  const ctx = useContext(SignupModalContext);
  if (!ctx) throw new Error("useSignupModal must be used within SignupModalProvider");
  return ctx;
}
