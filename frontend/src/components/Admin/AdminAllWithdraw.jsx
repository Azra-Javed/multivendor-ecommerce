import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";
import styles from "../../styles/style";

const AdminAllWithdraw = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [withdrawData, setWithdrawData] = useState([]);
  const dispatch = useDispatch();
  const [withdrawStatus, setWithdrawStatus] = useState("");

  useEffect(() => {
    axios
      .get(`${server}/withdraw/get-allWithdraw`, { withCredentials: true })
      .then((res) => setData(res.data.withdraws))
      .catch((err) => toast.error(err.response?.data?.message));
  }, [dispatch]);

  const handleSubmit = async () => {
    await axios
      .put(
        `${server}/withdraw/update-withdraw/${withdrawData.id}`,
        { sellerId: withdrawData.shopId, status: withdrawStatus },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setData(res.data.withdraw);
        setOpen(false);
        window.location.reload();
      });
  };

  const columns = [
    { field: "id", headerName: "Withdraw Id", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Shop Name", minWidth: 180, flex: 1.4 },
    { field: "shopId", headerName: "Shop Id", minWidth: 180, flex: 1.4 },
    { field: "amount", headerName: "Amount", minWidth: 100, flex: 0.6 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      flex: 0.6,
      renderCell: (params) => {
        let bg = "#FFF4CC"; // default yellow
        let color = "#856404";

        if (params.value === "Processing") {
          bg = "#FFE5B4"; // light orange
          color = "#B85C00";
        } else if (params.value === "Succeeded") {
          bg = "#E6F4EA"; // light green
          color = "#256D3B";
        } else if (params.value === "Refund") {
          bg = "#FBEAEA"; // light red
          color = "#B71C1C";
        }

        return (
          <span
            style={{
              backgroundColor: bg,
              color,
              padding: "3px 10px",
              borderRadius: "20px",
              fontWeight: 500,
              fontSize: "13px",
              textTransform: "capitalize",
            }}
          >
            {params.value}
          </span>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Request Sent",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "update",
      headerName: "Update Status",
      minWidth: 120,
      flex: 0.8,
      sortable: false,
      renderCell: (params) => (
        <BsPencil
          size={20}
          className={`${
            params.row.status !== "Processing" ? "hidden" : "block"
          } cursor-pointer`}
          onClick={() => {
            setOpen(true);
            setWithdrawData(params.row);
            setWithdrawStatus(params.row.status);
          }}
        />
      ),
    },
  ];

  const rows = Array.isArray(data)
    ? data.map((item) => ({
        id: item._id,
        name: item.seller.name,
        shopId: item.seller._id,
        amount: "US$ " + item.amount,
        status: item.status,
        createdAt: item.createdAt.slice(0, 10),
      }))
    : [];

  return (
    <div className="w-full mx-8 pt-1 mt-10 bg-white rounded-lg shadow-sm p-3">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableRowSelectionOnClick
        autoHeight
        density="compact"
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
        }}
        pageSizeOptions={[8, 10, 12]}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#E6F4EA",
            color: "#256D3B",
            fontSize: "14px",
            fontWeight: 600,
          },
          "& .MuiDataGrid-row:hover": { backgroundColor: "#F1FDF4" },
        }}
      />

      {open && (
        <div className="fixed inset-0 bg-[#00000050] z-[999] flex items-center justify-center">
          <div className="bg-white w-[90%] sm:w-[450px] rounded-lg shadow-lg p-6">
            <div className="flex justify-end">
              <RxCross1
                size={22}
                className="cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={() => setOpen(false)}
              />
            </div>
            <h3 className="text-[20px] text-center font-medium text-gray-700 py-3">
              Update Withdraw Status
            </h3>
            <select
              value={withdrawStatus}
              className="w-[220px] border rounded h-[35px] mb-4"
              onChange={(e) => setWithdrawStatus(e.target.value)}
            >
              <option value={withdrawData.status}>{withdrawData.status}</option>
              <option value="Succeeded">Succeeded</option>
              <option value="Refund">Refund</option>
            </select>
            <button
              type="submit"
              className={`${styles.button} block w-full text-white !h-[42px] text-[16px]`}
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAllWithdraw;
