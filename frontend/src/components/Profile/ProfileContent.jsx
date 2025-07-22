import AllOrders from "../../components/Profile/AllOrders.jsx";
import AllRefundOrders from "../../components/Profile/AllRefundOrders";
import TrackOrder from "../../components/Profile/TrackOrder";
import PaymentMethod from "../../components/Profile/PaymentMethod";
import Address from "../../components/Profile/Address.jsx";
import UserProfile from "../../components/Profile/UserProfile.jsx";

const ProfileContent = ({ active }) => {
  return (
    <div className="w-full">
      {/* profile */}
      {active === 1 && <UserProfile />}

      {/* order */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* refund  */}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {/* Track order */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}

      {/* payment methods */}
      {active === 6 && (
        <div>
          <PaymentMethod />
        </div>
      )}

      {/* address */}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

export default ProfileContent;
