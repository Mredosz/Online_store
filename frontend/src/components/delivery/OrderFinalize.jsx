export default function OrderFinalize() {
  return (
    <div className="flex flex-col text-lg space-y-5">
      <h1 className="text-center text-3xl font-semibold">
        Thank you for your order!
      </h1>
      <p>Your order has been successfully placed.</p>

      <div className="tracking-info">
        <p>You can track your order in the My Orders section.</p>
        <p>We will notify you once your order has been shipped.</p>
      </div>

      <div className="thank-you">
        <p>Thank you for shopping with us!</p>
        <p>You will receive an email with your invoice shortly.</p>
      </div>

      <div className="contact-support">
        <p>
          Need help? Contact our customer support at capy@store.com or call{" "}
          <strong>567 586 568</strong>.
        </p>
      </div>

      <div className="additional-info">
        <p>
          Your order is being processed. An SMS confirmation has been sent to
          your phone.
        </p>
        <p>We hope you enjoy your purchase!</p>
      </div>
    </div>
  );
}
