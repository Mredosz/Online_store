import { Alert } from "antd";

export default function ErrorBanner({ error }) {
  return <Alert type="error" message={error} banner className="text-3xl" />;
}
