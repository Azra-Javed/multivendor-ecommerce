import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Loader from "../Layout/Loader";
import { Link } from "react-router-dom";
import { getShopAllOrders } from "../../redux/features/orderSlice";
import { AiOutlineArrowRight } from "react-icons/ai";

const AllRefundOrders = () => {
  const { shopOrders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    if (seller?._id) dispatch(getShopAllOrders(seller._id));
  }, [dispatch, seller?._id]);

  const refundOrders =
    shopOrders &&
    shopOrders.filter(
      (item) =>
        item.status === "Processing refund" || item.status === "Refund Success"
    );

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      renderCell: (params) => {
        let bg = "rgba(255, 209, 102, 0.25)"; // default yellow
        let color = "#7A5C00";
        if (params.row.status === "Refund Success") {
          bg = "rgba(45, 106, 79, 0.15)"; // green tint
          color = "#2D6A4F";
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
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "action",
      headerName: "",
      flex: 1,
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => (
        <Link to={`/order/${params.id}`}>
          <Button sx={{ color: "#2D6A4F", minWidth: 0 }}>
            <AiOutlineArrowRight size={20} />
          </Button>
        </Link>
      ),
    },
  ];

  const rows =
    refundOrders?.map((item) => ({
      id: item._id,
      itemsQty: item.cart.length,
      total: "US$ " + item.totalPrice.toFixed(2),
      status: item.status,
    })) || [];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[calc(100vw-5rem-20px)] md:w-[calc(100vw-16rem-20px)] !h-[89vh] overflow-y-auto p-3 md:pt-4 bg-[#f9fafb]">
          <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-4">
            <h4 className="text-[16px] font-medium text-gray-700 mb-2">
              All Events
            </h4>
            <div className="overflow-x-auto">
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[7, 10, 15]}
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
      )}
    </>
  );
};

export default AllRefundOrders;
