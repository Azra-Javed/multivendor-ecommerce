import ShopInfo from "../../components/Shop/ShopInfo ";
import ShopProfileData from "../../components/Shop/ShopProfileData";
import styles from "../../styles/style";

const ShopPreviewPage = () => {
  return (
    <div className="w-full bg-[#f5f5f5] min-h-screen">
      <div className={`${styles.section}`}>
        <div className="w-full flex flex-col 800px:flex-row 800px:gap-5 py-5">
          {/* Left Side */}
          <div className="w-full 800px:w-[25%] mb-5 800px:mb-0">
            <div className="bg-white rounded-[4px] shadow-sm 800px:sticky 800px:top-10 800px:h-fit min-h-[90vh]">
              <ShopInfo isOwner={false} />
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full 800px:w-[72%]">
            <ShopProfileData isOwner={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPreviewPage;
