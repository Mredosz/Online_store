import { createPortal } from "react-dom";
import styles from "./ProductModel.module.scss";
import { buyNow, delivery, warranty } from "./content.jsx";
import ReviewAdd from "../review/add/ReviewAdd.jsx";

export default function ProductModal({ onClose, content }) {
  const getContent = () => {
    switch (content) {
      case "warranty":
        return warranty;
      case "delivery":
        return delivery;
      case "buy_now":
        return buyNow;
      case "add_review":
        return <ReviewAdd />;
      default:
        return null;
    }
  };

  return createPortal(
    <>
      <div className={styles.modalOverlay} onClick={onClose}></div>
      <div className={styles.modalContent}>
        {getContent()}
        <form method="dialog">
          <button type="button" onClick={onClose} className={styles.button}>
            Close
          </button>
        </form>
      </div>
    </>,
    document.getElementById("modal"),
  );
}
