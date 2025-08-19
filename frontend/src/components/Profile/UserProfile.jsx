import { AiOutlineCamera } from "react-icons/ai";
import { backend_url, server } from "../../server";
import styles from "../../styles/style";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInformation } from "../../redux/features/userSlice";
import { toast } from "react-toastify";
import axios from "axios";
const UserProfile = () => {
  const { user, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation({ name, email, password, phoneNumber }));
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    await axios
      .put(`${server}/user/update-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <>
      <div className="flex justify-center w-full">
        <div className="relative">
          <img
            src={`${backend_url}${user?.avatar}`}
            alt=""
            className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
          />
          <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleImage}
            />
            <label htmlFor="image">
              {" "}
              <AiOutlineCamera />
            </label>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full px-5">
        <form onSubmit={handleSubmit} aria-required={true}>
          <div className="w-full  block 800px:flex pb-3">
            <div className="w-[100%] 800px:w-[50%]">
              <label className="block pb-2">Full Name</label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="w-[100%] 800px:w-[50%]">
              <label className="block pb-2">Email Address</label>
              <input
                type="email"
                className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full  block 800px:flex pb-3">
            <div className="w-[100%] 800px:w-[50%]">
              <label className="block pb-2">Phone Number</label>
              <input
                type="number"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="w-[100%] 800px:w-[50%]">
              <label className="block pb-2">Password</label>
              <input
                type="password"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <input
            type="submit"
            className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
            value="Update"
          />
        </form>
      </div>
    </>
  );
};

export default UserProfile;
