import { useState } from "react";
import styles from "../../styles/style";
import { Country, State } from "country-state-city";

const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
}) => {
  const [userInfo, setUserInfo] = useState(false);

  return (
    <div className="w-full 800px:w-[95%] bg-white shadow-xl rounded-md p-4">
      <h5 className="text-[16px] md:text-[18px] font-[600] text-[#2D6A4F]">
        Shipping Address
      </h5>
      <br />

      <form>
        {/* Name & Email */}
        <div className="w-full flex flex-col md:flex-row gap-3 md:gap-4 pb-3">
          <div className="w-full md:w-1/2">
            <label className="block pb-1 text-[#2D6A4F] font-[500]">
              Full Name
            </label>
            <input
              type="text"
              required
              className={`${styles.input} w-full`}
              value={user?.name || ""}
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className="block pb-1 text-[#2D6A4F] font-[500]">
              Email Address
            </label>
            <input
              type="email"
              required
              className={`${styles.input} w-full`}
              value={user?.email || ""}
            />
          </div>
        </div>

        {/* Phone & Zip */}
        <div className="w-full flex flex-col md:flex-row gap-3 md:gap-4 pb-3">
          <div className="w-full md:w-1/2">
            <label className="block pb-1 text-[#2D6A4F] font-[500]">
              Phone Number
            </label>
            <input
              type="number"
              required
              className={`${styles.input} w-full`}
              value={user?.phoneNumber || ""}
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className="block pb-1 text-[#2D6A4F] font-[500]">
              Zip Code
            </label>
            <input
              type="number"
              required
              className={`${styles.input} w-full`}
              value={zipCode || ""}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
        </div>

        {/* Country & City */}
        <div className="w-full flex flex-col md:flex-row gap-3 md:gap-4 pb-3">
          <div className="w-full md:w-1/2">
            <label className="block pb-1 text-[#2D6A4F] font-[500]">
              Country
            </label>
            <select
              className="w-full h-10 rounded-md border border-[#2D6A4F] px-2 text-[#2D6A4F]"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Choose your country</option>
              {Country.getAllCountries().map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/2">
            <label className="block pb-1 text-[#2D6A4F] font-[500]">City</label>
            <select
              className="w-full h-10 rounded-md border border-[#2D6A4F] px-2 text-[#2D6A4F]"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option>Choose your city</option>
              {State.getStatesOfCountry(country).map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Address 1 & 2 */}
        <div className="w-full flex flex-col md:flex-row gap-3 md:gap-4 pb-3">
          <div className="w-full md:w-1/2">
            <label className="block pb-1 text-[#2D6A4F] font-[500]">
              Address 1
            </label>
            <input
              type="text"
              required
              className={`${styles.input} w-full`}
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className="block pb-1 text-[#2D6A4F] font-[500]">
              Address 2
            </label>
            <input
              type="text"
              required
              className={`${styles.input} w-full`}
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
            />
          </div>
        </div>
      </form>

      {/* Saved addresses toggle */}
      <h5
        className="text-[16px] md:text-[18px] cursor-pointer inline-block text-[#2D6A4F] mt-3 font-[500]"
        onClick={() => setUserInfo(!userInfo)}
      >
        Choose From Saved Address
      </h5>

      {userInfo && (
        <div className="mt-2">
          {user?.addresses?.map((item, index) => (
            <div className="w-full flex items-center mb-2" key={index}>
              <input
                type="radio"
                className="mr-2"
                value={item.addressType}
                name="address"
                onChange={() => {
                  setAddress1(item.address1);
                  setAddress2(item.address2);
                  setZipCode(item.zipCode);
                  setCountry(item.country);
                  setCity(item.city);
                }}
              />
              <span className="text-[#2D6A4F] font-[500]">
                {item.addressType}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShippingInfo;
