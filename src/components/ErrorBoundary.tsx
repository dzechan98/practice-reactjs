import { useState, useEffect } from "react";
import type { ReactNode, FC } from "react";

interface Props {
  children: ReactNode;
  fallbackRender?: (error: Error, resetError: () => void) => ReactNode;
}

const ErrorBoundary: FC<Props> = ({ children, fallbackRender }) => {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (error) {
      console.error("Error handled by ErrorBoundary:", error);
    }
  }, [error]);

  const resetError = (): void => {
    setError(null);
  };

  if (error) {
    if (fallbackRender) {
      return fallbackRender(error, resetError);
    }
    return (
      <div role="alert">
        <h1>Something went wrong.</h1>
        {error.message && <p>{error.message}</p>}
        <button type="button" onClick={resetError}>
          Try again
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
