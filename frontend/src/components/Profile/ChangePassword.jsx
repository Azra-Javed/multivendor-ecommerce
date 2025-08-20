import { useState } from "react";
import styles from "../../styles/style";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    const res = await axios
      .put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || error.message);
      });
  };

  return (
    <div className="w-full px-5">
      <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2 text-center">
        Change Password
      </h1>

      <div className="w-full">
        <form
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className="w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Enter your old password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Enter your new password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Confirm password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <input
              type="submit"
              className="w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer"
              value="Update"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
