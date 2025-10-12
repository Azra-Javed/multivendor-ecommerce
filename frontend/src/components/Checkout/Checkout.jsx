import styles from "../../styles/style";

const CheckoutSteps = ({ active }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[90%] 800px:w-[50%] flex items-center flex-wrap justify-center">
        {/* Step 1 */}
        <div className={`${styles.noramlFlex}`}>
          <div
            className={`${styles.cart_button} ${
              active >= 1 ? "bg-[#2D6A4F]" : "bg-[#FFF7CC]"
            }`}
          >
            <span
              className={`${styles.cart_button_text} ${
                active >= 1 ? "text-white" : "text-[#2D6A4F]"
              }`}
            >
              1. Shipping
            </span>
          </div>

          <div
            className={`${
              active > 1
                ? "w-[35px] 800px:w-[70px] h-[3px] bg-[#2D6A4F]"
                : "w-[35px] 800px:w-[70px] h-[3px] bg-[#E5E7EB]"
            }`}
          />
        </div>

        {/* Step 2 */}
        <div className={`${styles.noramlFlex}`}>
          <div
            className={`${styles.cart_button} ${
              active >= 2 ? "bg-[#2D6A4F]" : "bg-[#FFF7CC]"
            }`}
          >
            <span
              className={`${styles.cart_button_text} ${
                active >= 2 ? "text-white" : "text-[#2D6A4F]"
              }`}
            >
              2. Payment
            </span>
          </div>
        </div>

        {/* Step 3 */}
        <div className={`${styles.noramlFlex}`}>
          <div
            className={`${
              active > 2
                ? "w-[35px] 800px:w-[70px] h-[3px] bg-[#2D6A4F]"
                : "w-[35px] 800px:w-[70px] h-[3px] bg-[#E5E7EB]"
            }`}
          />

          <div
            className={`${styles.cart_button} ${
              active >= 3 ? "bg-[#2D6A4F]" : "bg-[#FFF7CC]"
            }`}
          >
            <span
              className={`${styles.cart_button_text} ${
                active >= 3 ? "text-white" : "text-[#2D6A4F]"
              }`}
            >
              3. Success
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
