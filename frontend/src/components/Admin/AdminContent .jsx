import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import {
  MdBookmarkBorder,
  MdOutlineAccountBalanceWallet,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAdminOrders } from "../../redux/features/orderSlice";
import { getAdminSellers } from "../../redux/features/sellerSlice";
import { getAdminUsers } from "../../redux/features/userSlice";
import Loader from "../Layout/Loader";

const AdminContent = () => {
  const dispatch = useDispatch();
  const { adminOrders, isLoading } = useSelector((state) => state.order);
  const { adminSellers } = useSelector((state) => state.seller);
  const { adminUsers } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAdminOrders());
    dispatch(getAdminSellers());
    dispatch(getAdminUsers());
  }, [dispatch]);

  const adminEarning =
    adminOrders?.reduce((acc, item) => acc + item.totalPrice * 0.1, 0) || 0;

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 120, flex: 0.6 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.5,
      renderCell: (params) => {
        let bg = "rgba(255, 209, 102, 0.25)";
        let color = "#7A5C00";

        if (params.row.status === "Delivered") {
          bg = "rgba(45, 106, 79, 0.15)";
          color = "#2D6A4F";
        } else if (params.row.status === "Processing refund") {
          bg = "rgba(255, 99, 71, 0.15)";
          color = "#C53030";
        }

        return (
          <span
            style={{
              backgroundColor: bg,
              color,
              padding: "4px 10px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "capitalize",
            }}
          >
            {params.row.status}
          </span>
        );
      },
    },
    { field: "itemsQty", headerName: "Qty", minWidth: 80, flex: 0.4 },
    { field: "total", headerName: "Total", minWidth: 90, flex: 0.5 },
    { field: "createdAt", headerName: "Date", minWidth: 110, flex: 0.5 },
  ];

  const rows =
    adminOrders?.map((item) => ({
      id: item._id,
      itemsQty: item.cart.length,
      total: `$${item.totalPrice.toFixed(2)}`,
      status: item.status,
      createdAt: item.createdAt.slice(0, 10),
    })) || [];

  return (
    <div className="w-[calc(100vw-5rem)] md:w-[calc(100vw-16rem)] !h-[89vh] overflow-y-auto p-3 md:pt-4 bg-[#f9fafb]">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Earnings */}
        <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center text-[#2D6A4F]">
            <MdOutlineAccountBalanceWallet size={22} className="mr-2" />
            <h3 className="text-[14px] font-medium text-gray-700">
              Total Earnings
            </h3>
          </div>
          <h5 className="text-[22px] font-semibold mt-3 text-gray-800">
            ${adminEarning.toFixed(2)}
          </h5>
        </div>

        {/* Sellers */}
        <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center text-[#2D6A4F]">
            <MdBookmarkBorder size={22} className="mr-2" />
            <h3 className="text-[14px] font-medium text-gray-700">
              Total Sellers
            </h3>
          </div>
          <h5 className="text-[22px] font-semibold mt-3 text-gray-800">
            {adminSellers?.length || 0}
          </h5>
        </div>

        {/* Orders */}
        <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center text-[#2D6A4F]">
            <AiOutlineProduct size={22} className="mr-2" />
            <h3 className="text-[14px] font-medium text-gray-700">
              Total Orders
            </h3>
          </div>
          <h5 className="text-[22px] font-semibold mt-3 text-gray-800">
            {adminOrders?.length || 0}
          </h5>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-4">
        <h4 className="text-[16px] font-medium text-gray-700 mb-2">
          Recent Orders
        </h4>
        <div className="overflow-x-auto">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 7, page: 0 } },
            }}
            pageSizeOptions={[7, 8, 10]}
            disableSelectionOnClick
            autoHeight
            density="compact"
            sx={{
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              backgroundColor: "#fff",
              fontSize: "13px",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#FFF9E6",
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
                backgroundColor: "rgba(255, 209, 102, 0.08)",
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
    </div>
  );
};

export default AdminContent;
