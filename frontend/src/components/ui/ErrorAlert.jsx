import { Alert } from "antd";

export default function ErrorAlert({ error }) {
  return (
    <Alert
      type="error"
      message={error}
      className="text-lg mb-2 text-wrap max-w-96"
    />
  );
}
