import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/style";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { loadSeller } from "../../redux/actions/seller.actions";

const ShopSetting = () => {
  const { seller, error } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  const [name, setName] = useState(seller?.name);
  const [description, setDescription] = useState(seller?.description);
  const [address, setAddress] = useState(seller?.address);
  const [phoneNumber, setPhoneNumber] = useState(seller?.phoneNumber);
  const [zipCode, setZipCode] = useState(seller?.zipCode);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    await axios
      .put(`${server}/shop/update-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        dispatch(loadSeller());
        toast.success("avatar updated successfully!");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };

  const updateHandler = (e) => {
    e.preventDefault();
    axios
      .put(
        `${server}/shop/update-shop-info`,
        {
          name,
          address,
          description,
          phoneNumber,
          zipCode,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success("Seller updated successfully!");
        dispatch(loadSeller());
      })
      .catch((error) => console.log(error?.response?.data?.message));
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5">
        <div className="flex justify-center w-full">
          <div className="relative">
            <img
              src={
                avatar
                  ? URL.createObjectURL(avatar)
                  : `${backend_url}/${seller?.avatar}`
              }
              alt=""
              className="w-[150px] h-[150px] rounded-full object-cover"
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

        {/* shop info */}

        <form
          className="flex flex-col items-center p-5"
          onSubmit={updateHandler}
        >
          <div className="w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Shop Name</label>
            <input
              type="text"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              placeholder={`${seller?.name}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Shop Description</label>
            <input
              type="text"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              placeholder={`${
                seller?.description ? seller.description : "Enter description"
              } `}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Shop Address</label>
            <input
              type="text"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              placeholder={seller?.address}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Shop Contact</label>
            <input
              type="number"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              placeholder={seller?.phoneNumber}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Shop ZipCode</label>
            <input
              type="number"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              placeholder={seller?.zipcode}
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>

          <div className="w-[100%] 800px:w-[50%] mt-5">
            <input
              type="submit"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value="Update Shop"
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSetting;
