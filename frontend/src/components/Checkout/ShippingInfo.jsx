import { useState } from "react";
import styles from "../../styles/style";
import { Country, State } from "country-state-city";

const ShippingInfo = () => {
  const [country, setCountry] = useState("");

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
              />
            </div>
            <div className="w-[50%]">
              <label className="block pb-2">Email Address</label>
              <input type="email" required className={`${styles.input}`} />
            </div>
          </div>

          <div className="w-full flex pb-3">
            <div className="w-[50%]">
              <label className="block pb-2">Phone Number</label>
              <input
                type="number"
                required
                className={`${styles.input} !w-[95%]`}
              />
            </div>
            <div className="w-[50%]">
              <label className="block pb-2">Zip Code</label>
              <input type="number" required className={`${styles.input}`} />
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
              <select className="w-[95%] border h-[40px] rounded-[5px]">
                <option className="block pb-2" value="">
                  Choose your City
                </option>
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
              />
            </div>
            <div className="w-[50%]">
              <label className="block pb-2">Address2</label>
              <input type="address" required className={`${styles.input}`} />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShippingInfo;
