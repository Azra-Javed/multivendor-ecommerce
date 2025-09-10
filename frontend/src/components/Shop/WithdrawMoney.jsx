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

      // reset form
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
    <div className="w-full h-[90vh] p-8">
      <div className="w-full bg-white h-full rounded flex items-center justify-center flex-col">
        <h5 className="text-[20px] font-medium text-gray-600 mb-2">
          Available Balance
        </h5>
        <p className="text-3xl font-bold text-gray-900 mb-6">
          {availableBalance}$
        </p>

        <button
          className={`${styles.button} text-white  !h-[42px] rounded-lg transition-transform duration-200 hover:scale-105 cursor-pointer`}
          onClick={() => (availableBalance < 50 ? error() : setOpen(true))}
        >
          Withdraw Money
        </button>
      </div>
      {open && (
        <div className="w-full h-screen z-[999] fixed top-0 left-0 flex items-center justify-center bg-[#0000004e]">
          <div
            className={`w-[95%] 800px:w-[50%] bg-white rounde ${
              paymentMethod ? "h-[80vh] overflow-y-auto" : "h-[unset]"
            } min-h-[40vh] p-3`}
          >
            <div className="w-full flex justify-end cursor-pointer">
              <RxCross1 onClick={() => setOpen(false)} size={20} />
            </div>
            {paymentMethod ? (
              <div>
                <h3 className="font-family-poppins text-[22px] text-center font-[600]">
                  Add new Payment Method
                </h3>

                <form onSubmit={handleSubmit}>
                  <div className="pt-3">
                    <label>
                      Bank Name
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={bankInfo.bankName}
                      onChange={(e) =>
                        setBankInfo({ ...bankInfo, bankName: e.target.value })
                      }
                      className={`${styles.input} mt-2`}
                    />
                  </div>

                  <div className="pt-3">
                    <label>
                      Bank Country
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={bankInfo.bankCountry}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankCountry: e.target.value,
                        })
                      }
                      className={`${styles.input} mt-2`}
                    />
                  </div>

                  <div className="pt-3">
                    <label>
                      Bank Swift Code
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={bankInfo.bankSwiftCode}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankSwiftCode: e.target.value,
                        })
                      }
                      className={`${styles.input} mt-2`}
                    />
                  </div>

                  <div className="pt-3">
                    <label>
                      Bank Account Number{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      value={bankInfo.bankAccountNumber}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankAccountNumber: e.target.value,
                        })
                      }
                      type="number"
                      className={`${styles.input} mt-2`}
                    />
                  </div>

                  <div className="pt-3">
                    <label>
                      Account holder name
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={bankInfo.accountHolderName}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          accountHolderName: e.target.value,
                        })
                      }
                      className={`${styles.input} mt-2`}
                    />
                  </div>

                  <div className="pt-3">
                    <label>
                      Bank Address
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      required
                      value={bankInfo.bankAddress}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankAddress: e.target.value,
                        })
                      }
                      className={`${styles.input} mt-2`}
                    />
                  </div>

                  <button
                    className={`${styles.button} text-white`}
                    type="submit"
                  >
                    Add
                  </button>
                </form>
              </div>
            ) : (
              <>
                <h3 className="font-family-poppins text-[22px]">
                  Available Payment Methods:
                </h3>

                {seller && seller?.withdrawMethod ? (
                  <div>
                    <div className="800px:flex w-full justify-between items-center">
                      <div className="800px:w-[50%]">
                        <h5>
                          Account Number:{" "}
                          {"*".repeat(
                            seller?.withdrawMethod?.bankAccountNumber.length - 3
                          ) + seller.withdrawMethod.bankAccountNumber.slice(-3)}
                        </h5>

                        <h5>Bank Name: {seller.withdrawMethod?.bankName}</h5>
                      </div>

                      <div className="w-full flex">
                        <div className="w-[50%]">
                          <AiOutlineDelete
                            size={25}
                            className="cursor-pointer"
                            onClick={() => deleteHandler()}
                          />
                        </div>
                      </div>
                    </div>
                    <br />

                    <h4>Avaiable Balance: {availableBalance}$</h4>
                    <br />
                    <div className="800px:flex w-full items-center">
                      <input
                        type="number"
                        placeholder="Enter you withdraw amount..."
                        className="w-full border 800px:mr-5 p-2 rounded"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                      />
                      <div
                        className={`${styles.button} text-white !h-[42px]`}
                        onClick={withdrawHandler}
                      >
                        Withdraw
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-[18px] pt-2">
                      No Payment Method Available!
                    </p>

                    <div className="w-full flex items-center justify-center">
                      <button
                        className={`${styles.button} text-white mt-4 text-[18px]`}
                        onClick={() => setPaymentMethod(true)}
                      >
                        Add New
                      </button>
                    </div>
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
