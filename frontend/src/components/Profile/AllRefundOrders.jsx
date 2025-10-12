import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllOrders } from "../../redux/features/orderSlice";

const AllRefundOrders = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders(user?._id));
  }, [dispatch, user?._id]);

  const eligibleOrders =
    orders &&
    orders.filter(
      (item) =>
        item.status === "Processing refund" ||
        item.status === "Refunded" ||
        item.status === "Rejected"
    );

  // Define columns
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      renderCell: (params) => {
        let bgClass = "bg-yellow-100 text-yellow-800";
        if (params.value === "Refunded")
          bgClass = "bg-green-100 text-green-800";
        else if (params.value === "Rejected")
          bgClass = "bg-red-100 text-red-800";

        return (
          <span
            className={`px-2 py-1 rounded-md font-medium text-sm ${bgClass}`}
          >
            {params.value}
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
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => (
        <Link to={`/user/order/${params.id}`}>
          <Button>
            <AiOutlineArrowRight size={20} />
          </Button>
        </Link>
      ),
    },
  ];

  const row = [];

  eligibleOrders &&
    eligibleOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "USS " + item.totalPrice.toFixed(2),
        status: item.status,
      });
    });

  return (
    <div className="px-4 py-2">
      <DataGrid
        rows={row}
        columns={columns}
        autoHeight
        disableSelectionOnClick
        density="compact"
        pagination
        initialState={{
          pagination: { paginationModel: { pageSize: 9, page: 0 } },
        }}
        pageSizeOptions={[9, 12, 25]}
      />
    </div>
  );
};

export default AllRefundOrders;
