import LoadingSpinner from "./LoadingSpinner.jsx";
import ErrorBanner from "./ErrorBanner.jsx";

export default function StateInfo({ isLoading, error }) {
  return (
    <>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorBanner error={error} />}
    </>
  );
}
