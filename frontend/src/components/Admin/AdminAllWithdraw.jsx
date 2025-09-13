import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";
import styles from "../../styles/style";

const AdminAllWithdraw = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [withdrawData, setWithdrawData] = useState([]);
  const dispatch = useDispatch();
  const [withdrawStatus, setWithdrawStatus] = useState(withdrawData.status);

  useEffect(() => {
    axios
      .get(`${server}/withdraw/get-allWithdraw`, { withCredentials: true })
      .then((res) => {
        setData(res.data.withdraws);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Withdraw Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Shop Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "shopId",
      headerName: "Shop Id",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "amount",
      headerName: "amount",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "status",
      headerName: "Status",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "createdAt",
      headerName: "Request Sent",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "",
      flex: 0.8,
      minWidth: 100,
      headerName: "Update Status",
      type: "number",
      sortable: false,
      renderCell: (params) => (
        <BsPencil
          size={20}
          className={`${
            params.row.status !== "Processing" ? "hidden" : "block"
          } cursor-pointer ml-5`}
          onClick={() => {
            setOpen(true);
            setWithdrawData(params.row);
            setWithdrawStatus(params.row.status);
            console.log(params.row.status);
          }}
        />
      ),
    },
  ];

  const row = [];

  data &&
    data.forEach((item) => {
      row.push({
        id: item._id,
        name: item.seller.name,
        shopId: item.seller._id,
        amount: "US$ " + item.amount,
        status: item.status,
        createdAt: item.createdAt.slice(0, 10),
      });
    });

  const handleSubmit = async () => {
    await axios
      .put(
        `${server}/withdraw/update-withdraw/${withdrawData.id}`,
        {
          sellerId: withdrawData.shopId,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setData(res.data.withdraw);
        setOpen(false);
      });
  };

  return (
    <>
      <div className="w-full mx-8 pt-1 mt-10 bg-white">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableRowSelectionOnClick
          autoHeight
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          pageSizeOptions={[8, 9, 10]}
        />

        {open && (
          <div className="w-full fixed h-screen top-0 left-0 bg-[#00000031] z-[999] flex items-center justify-center">
            <div className="w-[50%] min-h-[40vh] bg-white rounded shadow p-4">
              <div className="flex justify-end w-full">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <h1 className="text-[25px] text-center font-family-poppins">
                Update Withdraw Status
              </h1>
              <br />
              <select
                value={withdrawStatus}
                className="w-[200px] border rounded h-[35px]"
                onChange={(e) => setWithdrawStatus(e.target.value)}
              >
                <option value={withdrawData.status}>
                  {withdrawData.status}
                </option>
                <option value={"succeeded"}>Succeeded</option>
              </select>

              <button
                type="submit"
                className={`${styles.button} block text-white mt-4 !h-[42px] text-[18px]`}
                onClick={handleSubmit}
              >
                Update
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminAllWithdraw;
