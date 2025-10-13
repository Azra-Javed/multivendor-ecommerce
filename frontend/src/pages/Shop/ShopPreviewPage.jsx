import ShopInfo from "../../components/Shop/ShopInfo ";
import ShopProfileData from "../../components/Shop/ShopProfileData";
import styles from "../../styles/style";

const ShopPreviewPage = () => {
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <div className="w-full flex flex-col gap-5 800px:flex-row 800px:justify-between">
        {/* Left Side */}
        <div className="w-full 800px:w-[25%] bg-white rounded-[4px] shadow-sm 800px:sticky top-10 left-0 z-10">
          <ShopInfo isOwner={false} />
        </div>

        {/* Right Side */}
        <div className="w-full 800px:w-[72%] mt-5 800px:mt-0 rounded-[4px]">
          <ShopProfileData isOwner={false} />
        </div>
      </div>
    </div>
  );
};

export default ShopPreviewPage;
