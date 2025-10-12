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
        let bg = "rgba(255, 209, 102, 0.25)";
        let color = "#7A5C00";
        if (params.row.status === "Refund Success") {
          bg = "rgba(45, 106, 79, 0.15)";
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
        <div className="w-full mx-8 pt-1 mt-10 bg-white rounded-lg shadow-sm">
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
            pageSizeOptions={[8, 9, 10]}
            sx={{
              fontSize: "13px",
              "& .MuiDataGrid-columnHeaders": {
                fontSize: "14px",
                fontWeight: 600,
                backgroundColor: "#E6F4EA",
                color: "#2D6A4F",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #f0f0f0",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#E9F8E5",
              },
            }}
          />
        </div>
      )}
    </>
  );
};

export default AllRefundOrders;
