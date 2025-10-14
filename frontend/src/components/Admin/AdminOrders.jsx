import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminOrders } from "../../redux/features/orderSlice";
import Loader from "../Layout/Loader";

const AdminOrders = () => {
  const { adminOrders, isLoading } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminOrders());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.8 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      flex: 0.5,
      renderCell: (params) => {
        let bg = "#FFF8E1";
        let color = "#856404";

        if (params.row.status === "Delivered") {
          bg = "#E9F8E5";
          color = "#2D6A4F";
        } else if (params.row.status === "Processing refund") {
          bg = "#FFECEC";
          color = "#C53030";
        }
        return (
          <span
            style={{
              backgroundColor: bg,
              color,
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.2px",
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
      headerName: "Items",
      type: "number",
      minWidth: 80,
      flex: 0.4,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 80,
      flex: 0.4,
    },
    {
      field: "createdAt",
      headerName: "Date",
      minWidth: 120,
      flex: 0.6,
    },
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
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
      )}
    </>
  );
};

export default AdminOrders;
