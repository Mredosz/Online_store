import styles from "./ProductModel.module.scss";

export const delivery = (
  <div>
    <h2 className={styles.h2}>Delivery Information</h2>
    <p>In our store, we offer several delivery methods to suit your needs:</p>
    <h3 className={styles.h3}>Delivery to Parcel Locker</h3>
    <p>
      By choosing delivery to a Parcel Locker, your order will be sent to the
      selected InPost Parcel Locker. You will receive an SMS and an email with a
      pickup code when the package is ready for collection. Parcel Lockers are
      available 24/7, allowing you to pick up your package at your convenience.
    </p>
    <div className={styles.pDiv}>
      <p>Price: </p>
      <p>12.99 PLN</p>
    </div>

    <h3 className={styles.h3}>Courier Delivery</h3>
    <p>
      You can also choose courier delivery directly to your home or workplace.
      We work with the best courier companies to ensure fast and secure
      delivery. The courier will contact you by phone before delivering the
      package.
    </p>
    <div className={styles.pDiv}>
      <p>Price: </p>
      <p>19.99 PLN</p>
    </div>

    <h3 className={styles.h3}>Order Processing Time</h3>
    <p>
      The delivery time depends on the chosen method. Typically, delivery to a
      Parcel Locker takes 1-2 business days, while courier delivery takes 1
      business day.
    </p>

    <p>
      Choose the most convenient delivery option for you when placing your
      order.
    </p>
  </div>
);

export const warranty = (
  <div>
    <h2 className={styles.h2}>Warranty Information</h2>
    <p className={styles.p}>
      All products purchased in our store come with a 24-month warranty,
      starting from the date of purchase. During this period, if the product has
      any defects or malfunctions, we will repair or replace it free of charge.
    </p>
    <p className={styles.p}>
      Please keep your receipt as proof of purchase, as it will be required to
      make any warranty claims. The warranty does not cover damage caused by
      improper use, accidents, or unauthorized modifications.
    </p>
    <p className={styles.p}>
      For more detailed information about the warranty terms and conditions,
      please refer to the product's user manual or contact our customer support.
    </p>
  </div>
);

export const buyNow = (
  <div>
    <h3 className={styles.h3}>Buy now, get within two days</h3>
    <p className={styles.p}>
      Place your order today, and you'll receive your items within a maximum of
      two business days. Our fast and reliable shipping ensures timely delivery
      for your convenience.
    </p>
  </div>
);
