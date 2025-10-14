import Header from "../components/Layout/Header";
import styles from "../styles/style";
import ProfileSidebar from "../components/Profile/ProfileSidebar";
import ProfileContent from "../components/Profile/ProfileContent";
import { useState } from "react";

const ProfilePage = () => {
  const [active, setActive] = useState(1);
  return (
    <>
      <Header />
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
        <div className="w-[50px] 800px:w-[335px] sticky mt-[3%] sm:ml-3 800px:mt-0">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
        <div className="mt-[3%] md:mt-0 mx-auto w-full">
          <ProfileContent active={active} />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
