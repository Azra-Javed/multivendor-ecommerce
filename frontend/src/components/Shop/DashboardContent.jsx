import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { AiOutlineArrowRight, AiOutlineProduct } from "react-icons/ai";
import {
  MdBookmarkBorder,
  MdOutlineAccountBalanceWallet,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop } from "../../redux/features/productSlice";
import { getShopAllOrders } from "../../redux/features/orderSlice";
import Loader from "../Layout/Loader";

const DashboardContent = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const { shopOrders, isLoading } = useSelector((state) => state.order);

  useEffect(() => {
    if (seller?._id) {
      dispatch(getShopAllOrders(seller._id));
      dispatch(getAllProductsShop(seller._id));
    }
  }, [dispatch, seller?._id]);

  const availableBalance = seller?.availableBalance.toFixed(2);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 120, flex: 0.6 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.5,
      renderCell: (params) => {
        let bg = "rgba(255, 209, 102, 0.25)"; // default yellow
        let color = "#7A5C00";

        if (params.row.status === "Delivered") {
          bg = "rgba(45, 106, 79, 0.15)"; // green tint
          color = "#2D6A4F";
        } else if (params.row.status === "Processing refund") {
          bg = "rgba(255, 99, 71, 0.15)"; // red tint
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
    {
      field: "view",
      headerName: "",
      minWidth: 90,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/user/order/${params.id}`}>
          <AiOutlineArrowRight size={20} className="text-[#2D6A4F]" />
        </Link>
      ),
    },
  ];

  const rows =
    shopOrders?.map((item) => ({
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
        {/* Account Balance */}
        <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center text-[#2D6A4F]">
            <MdOutlineAccountBalanceWallet size={22} className="mr-2" />
            <h3 className="text-[14px] font-medium text-gray-700">
              Account Balance
            </h3>
          </div>
          <h5 className="text-[22px] font-semibold mt-3 text-gray-800">
            ${availableBalance}
          </h5>
        </div>

        {/* All Orders */}
        <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center text-[#2D6A4F]">
            <MdBookmarkBorder size={22} className="mr-2" />
            <h3 className="text-[14px] font-medium text-gray-700">
              All Orders
            </h3>
          </div>
          <h5 className="text-[22px] font-semibold mt-3 text-gray-800">
            {shopOrders?.length || 0}
          </h5>
        </div>

        {/* All Products */}
        <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center text-[#2D6A4F]">
            <AiOutlineProduct size={22} className="mr-2" />
            <h3 className="text-[14px] font-medium text-gray-700">
              All Products
            </h3>
          </div>
          <h5 className="text-[22px] font-semibold mt-3 text-gray-800">
            {products?.length || 0}
          </h5>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-4">
        <h4 className="text-[16px] font-medium text-gray-700 mb-2">
          Latest Orders
        </h4>
        <div className="overflow-x-auto">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel: { pageSize: 7 } } }}
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
    </div>
  );
};

export default DashboardContent;
