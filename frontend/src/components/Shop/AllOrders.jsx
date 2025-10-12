import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import Loader from "../Layout/Loader";
import { getShopAllOrders } from "../../redux/features/orderSlice";

const AllOrders = () => {
  const dispatch = useDispatch();
  const { shopOrders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  useEffect(() => {
    if (seller?._id) {
      dispatch(getShopAllOrders(seller._id));
    }
  }, [dispatch, seller?._id]);

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
    { field: "itemsQty", headerName: "Items Qty", minWidth: 90, flex: 0.5 },
    { field: "total", headerName: "Total", minWidth: 100, flex: 0.5 },
    {
      field: "view",
      headerName: "",
      minWidth: 80,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/order/${params.id}`}>
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
    })) || [];

  if (isLoading) return <Loader />;

  return (
    <div className="w-full p-4 md:p-6 bg-[#f9fafb] min-h-screen">
      <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-4">
        <h4 className="text-[16px] font-medium text-gray-700 mb-2">
          Latest Orders
        </h4>
        <div className="overflow-x-auto">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel: { pageSize: 12 } } }}
            pageSizeOptions={[12, 14, 18]}
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

export default AllOrders;
