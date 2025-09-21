import { accordionActionsClasses, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { AiOutlineArrowRight, AiOutlineProduct } from "react-icons/ai";
import {
  MdBookmarkBorder,
  MdOutlineAccountBalanceWallet,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAdminOrders } from "../../redux/features/orderSlice";
import styles from "../../styles/style";
import Loader from "../Layout/Loader";
import { getAdminSellers } from "../../redux/features/sellerSlice";
import { getAdminUsers } from "../../redux/features/userSlice";

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
    adminOrders &&
    adminOrders.reduce((acc, item) => acc + item.totalPrice * 0.1, 0);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
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
      field: "createdAt",
      headerName: "Order Date",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
  ];

  const row = [];

  adminOrders &&
    adminOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: item.totalPrice.toFixed(2) + "$",
        status: item.status,
        createdAt: item.createdAt.slice(0, 10),
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full p-8">
          <h3 className="text-[22px] font-family-poppins pb-2">Overview</h3>
          <div className="w-full block 800px:flex items-center justify-between">
            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-4">
              <div className="flex items-center">
                <MdOutlineAccountBalanceWallet
                  size={30}
                  className="mr-2"
                  fill="#0000005"
                />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  Total Earning
                </h3>
              </div>

              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                ${adminEarning ? adminEarning.toFixed(2) : 0}
              </h5>
            </div>

            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-4">
              <div className="flex items-center">
                <MdBookmarkBorder size={30} className="mr-2" fill="#0000005" />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  All Sellers
                </h3>
              </div>

              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {adminSellers && adminSellers.length}
              </h5>
              <Link to="/admin/sellers">
                <h5 className="pt-4 pl-2 text-[#077f9c]">View Sellers</h5>
              </Link>
            </div>

            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-4">
              <div className="flex items-center">
                <AiOutlineProduct size={30} className="mr-2" fill="#0000005" />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  All Orders
                </h3>
              </div>

              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {adminOrders && adminOrders.length}
              </h5>
              <Link to="/dashboard-products">
                <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
              </Link>
            </div>
          </div>

          <div className="w-full min-h-[45vh] bg-white rounded">
            <div className="pl-8 pt-1">
              <DataGrid
                rows={row}
                columns={columns}
                initialState={{
                  pagination: { paginationModel: { pageSize: 4, page: 0 } },
                }}
                pageSizeOptions={[4, 10, 25]}
                disableSelectionOnClick
                autoHeight
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminContent;
