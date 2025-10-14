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
    <div className="w-[calc(100vw-5rem-20px)] md:w-[calc(100vw-16rem-20px)] !h-[89vh] overflow-y-auto p-3 md:pt-4 bg-[#f9fafb]">
      <div className="">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 12 } },
          }}
          pageSizeOptions={[10, 12, 15]}
          disableSelectionOnClick
          autoHeight
          density="compact"
          sx={{
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            backgroundColor: "#fff",
            fontSize: "13px",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#E3F2E1",
              color: "#2D6A4F",
              fontWeight: 600,
              fontSize: "13px",
            },
            "& .MuiDataGrid-cell": {
              padding: "6px 8px",
              color: "#333",
              borderBottom: "1px solid #f0f0f0",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "rgba(45, 106, 79, 0.08)",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid #eee",
              backgroundColor: "#fafafa",
              color: "#2D6A4F",
            },
          }}
        />
      </div>
    </div>
  );
};

export default AdminAllWithdraw;
