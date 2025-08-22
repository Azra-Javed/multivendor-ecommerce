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
    <>
      <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
        <h5 className="text-[18px] font-[500]">Shipping Address</h5>
        <br />

        <form>
          <div className="w-full flex pb-3">
            <div className="w-[50%]">
              <label className="block pb-2">Full Name</label>
              <input
                type="text"
                required
                className={`${styles.input} !w-[95%]`}
                value={user && user.name}
              />
            </div>
            <div className="w-[50%]">
              <label className="block pb-2">Email Address</label>
              <input
                type="email"
                required
                className={`${styles.input}`}
                value={user && user.email}
              />
            </div>
          </div>

          <div className="w-full flex pb-3">
            <div className="w-[50%]">
              <label className="block pb-2">Phone Number</label>
              <input
                type="number"
                required
                className={`${styles.input} !w-[95%]`}
                value={user && user.phoneNumber}
              />
            </div>
            <div className="w-[50%]">
              <label className="block pb-2">Zip Code</label>
              <input
                type="number"
                required
                className={`${styles.input}`}
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full flex pb-3">
            <div className="w-[50%]">
              <label className="block pb-2">Country</label>
              <select
                className="w-[95%] border h-[40px] rounded-[5px]"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Choose your country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="w-[50%]">
              <label className="block pb-2">City</label>
              <select
                className="w-[95%] border h-[40px] rounded-[5px]"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option className="block pb-2">Choose your City</option>
                {State &&
                  State.getStatesOfCountry(country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="w-full flex pb-3">
            <div className="w-[50%]">
              <label className="block pb-2">Address1</label>
              <input
                type="address"
                required
                className={`${styles.input} !w-[95%]`}
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
              />
            </div>
            <div className="w-[50%]">
              <label className="block pb-2">Address2</label>
              <input
                type="address"
                required
                className={`${styles.input}`}
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </div>
          </div>
        </form>

        <h5
          className="text-[18px] cursor-pointer inline-block"
          onClick={() => setUserInfo(!userInfo)}
        >
          Choose From saved address
        </h5>
        {userInfo && (
          <div>
            {user &&
              user?.addresses?.map((item, index) => (
                <div className="w-full flex" key={index}>
                  <input
                    type="radio"
                    className="mr-3"
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
                  <span>{item.addressType}</span>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ShippingInfo;
