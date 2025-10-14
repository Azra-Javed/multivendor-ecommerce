import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShopAllOrders } from "../../redux/features/orderSlice";
import styles from "../../styles/style";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { loadSeller } from "../../redux/features/sellerSlice";
import { AiOutlineDelete } from "react-icons/ai";

const WithdrawMoney = () => {
  const [open, setOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(50);
  const { seller } = useSelector((state) => state.seller);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    bankCountry: "",
    bankSwiftCode: null,
    bankAccountNumber: null,
    accountHolderName: "",
    bankAddress: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (seller?._id) {
      dispatch(getShopAllOrders(seller._id));
    }
  }, [dispatch, seller?._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${server}/shop/update-payment-methods`,
        { withdrawMethod: bankInfo },
        { withCredentials: true }
      );

      toast.success("Withdraw method added successfully");
      setBankInfo({
        bankName: "",
        bankCountry: "",
        bankSwiftCode: "",
        bankAccountNumber: "",
        accountHolderName: "",
        bankAddress: "",
      });
      setPaymentMethod(false);
      dispatch(loadSeller());
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const deleteHandler = async () => {
    await axios
      .delete(`${server}/shop/delete-withdraw-method`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success("Withdraw method deleted successfully!");
        dispatch(loadSeller());
      })
      .then((err) => {
        toast.error(err.response.data.message);
      });
  };

  const error = () => {
    toast.error("You not have enough balance to withdraw!");
  };

  const availableBalance = seller?.availableBalance.toFixed(2);

  const withdrawHandler = async () => {
    if (withdrawAmount < 50 || withdrawAmount > availableBalance) {
      toast.error("You can't withdraw this amount!");
    } else {
      await axios
        .post(
          `${server}/withdraw/create-withdraw-request`,
          {
            amount: withdrawAmount,
            seller,
          },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success(res.data.message);
          setOpen(false);
          dispatch(loadSeller());
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  };

  return (
    <div className="w-full h-[90vh] p-6 md:p-8 ">
      <div className="w-full bg-white h-full rounded-2xl shadow-md flex items-center justify-center flex-col border border-gray-100">
        <h5 className="text-lg font-medium text-gray-500 mb-2">
          Available Balance
        </h5>
        <p className="text-4xl font-semibold text-gray-800 mb-6">
          {availableBalance}$
        </p>

        <button
          className={`${styles.button}  text-white !h-[50px] px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105`}
          onClick={() => (availableBalance < 50 ? error() : setOpen(true))}
        >
          Withdraw Money
        </button>
      </div>

      {open && (
        <div className="w-full h-screen z-[999] fixed top-0 left-0 flex items-center justify-center bg-black/20  px-4">
          <div
            className={`w-full max-w-xl bg-white rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 ${
              paymentMethod ? "h-[80vh] overflow-y-auto" : "h-auto"
            } p-5 md:p-8`}
          >
            {/* Close Button */}
            <div className="w-full flex justify-end mb-2">
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <RxCross1 size={22} className="text-gray-600" />
              </button>
            </div>

            {paymentMethod ? (
              <div>
                <h3 className="text-center text-2xl font-semibold text-gray-800 mb-6">
                  Add New Payment Method
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    ["Bank Name", "bankName"],
                    ["Bank Country", "bankCountry"],
                    ["Bank Swift Code", "bankSwiftCode"],
                    ["Bank Account Number", "bankAccountNumber"],
                    ["Account Holder Name", "accountHolderName"],
                    ["Bank Address", "bankAddress"],
                  ].map(([label, key]) => (
                    <div key={key}>
                      <label className="text-sm font-medium text-gray-600">
                        {label} <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type={key.includes("Number") ? "number" : "text"}
                        value={bankInfo[key]}
                        onChange={(e) =>
                          setBankInfo({ ...bankInfo, [key]: e.target.value })
                        }
                        className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-400 outline-none transition"
                      />
                    </div>
                  ))}

                  <button
                    type="submit"
                    className={`${styles.button} w-full mt-4  text-white py-2 rounded-md  transition`}
                  >
                    Add Method
                  </button>
                </form>
              </div>
            ) : (
              <>
                <h3 className="text-2xl text-center font-semibold text-gray-800 mb-4">
                  Available Payment Methods
                </h3>

                {seller && seller?.withdrawMethod ? (
                  <div className=" p-4">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                      <div>
                        <h5 className="text-gray-700 font-medium">
                          Account Number:{" "}
                          <span className="font-mono">
                            {"*".repeat(
                              seller?.withdrawMethod?.bankAccountNumber.length -
                                3
                            ) +
                              seller.withdrawMethod.bankAccountNumber.slice(-3)}
                          </span>
                        </h5>
                        <h5 className="text-gray-700 font-medium">
                          Bank Name: {seller.withdrawMethod?.bankName}
                        </h5>
                      </div>
                      <button
                        onClick={deleteHandler}
                        className="text-red-500 hover:text-red-600 transition flex items-center gap-1 mt-3 md:mt-0"
                      >
                        <AiOutlineDelete size={22} />
                        <span className="text-sm font-medium">Delete</span>
                      </button>
                    </div>

                    <div className="mt-6">
                      <p className="text-gray-600 font-medium mb-2">
                        Available Balance:{" "}
                        <span className="text-gray-800 font-semibold">
                          {availableBalance}$
                        </span>
                      </p>
                      <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <input
                          type="number"
                          placeholder="Enter withdraw amount..."
                          className="flex-1 border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-gray-400 outline-none"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                        />
                        <button
                          onClick={withdrawHandler}
                          className={`${styles.button} px-3 text-white !h-[42px] w-full md:w-auto`}
                        >
                          Withdraw
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center">
                    <p className="text-gray-600 text-base mb-4">
                      No Payment Method Available!
                    </p>
                    <button
                      className={`${styles.button} text-white px-6 py-2 rounded-md  transition`}
                      onClick={() => setPaymentMethod(true)}
                    >
                      Add New
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawMoney;
