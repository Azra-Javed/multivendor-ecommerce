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
        <div className="w-full min-h-[45vh] flex justify-center">
          <div className="w-[98%] mt-3">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={8}
              disableRowSelectionOnClick
              autoHeight
              initialState={{
                pagination: { paginationModel: { pageSize: 12, page: 0 } },
              }}
              pageSizeOptions={[12, 14, 18]}
              density="compact"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminOrders;
