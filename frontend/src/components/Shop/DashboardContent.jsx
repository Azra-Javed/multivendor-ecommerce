import { AiOutlineArrowRight, AiOutlineProduct } from "react-icons/ai";
import {
  MdBookmarkBorder,
  MdOutlineAccountBalanceWallet,
} from "react-icons/md";
import { Link } from "react-router-dom";
import styles from "../../styles/style";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllProductsShop } from "../../redux/actions/product.actions";
import { getShopAllOrders } from "../../redux/features/orderSlice";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const DashboardContent = () => {
  const [deliveredOrder, setDeliveredOrder] = useState(null);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const { shopOrders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShopAllOrders(seller._id));
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch, seller._id]);

  useEffect(() => {
    if (shopOrders) {
      const orderData = shopOrders.filter(
        (item) => item.status === "Delivered"
      );
      setDeliveredOrder(orderData);
    }
  }, [shopOrders]);

  const totalEarningWithoutDiscount = deliveredOrder
    ? deliveredOrder.reduce((acc, item) => acc + item.totalPrice, 0)
    : 0;

  const serviceCharge = totalEarningWithoutDiscount * 0.1;
  const availableBalance = totalEarningWithoutDiscount - serviceCharge;

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
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  shopOrders &&
    shopOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "USS " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="w-full p-8">
      <h3 className="text-[22[x] font-family-poppins pb-2">Overview</h3>
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
              Account Balance{" "}
              <span className="text-[10]">(with 10% service charge)</span>
            </h3>
          </div>

          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            ${availableBalance}
          </h5>
          <Link to="/dashboard-withdraw-money">
            <h5 className="pt-4 pl-2 text-[#077f9c]">Withdraw Money</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-4">
          <div className="flex items-center">
            <MdBookmarkBorder size={30} className="mr-2" fill="#0000005" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Orders
            </h3>
          </div>

          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {shopOrders && shopOrders.length}
          </h5>
          <Link to="/dashboard-orders">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-4">
          <div className="flex items-center">
            <AiOutlineProduct size={30} className="mr-2" fill="#0000005" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Products
            </h3>
          </div>

          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {products && products.length}
          </h5>
          <Link to="/dashboard-products">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Products</h5>
          </Link>
        </div>
      </div>
      <br />
      <h3 className="font-[22px] font-family-poppins">Latest Orders</h3>
      <div className="w-full min-h-[45vh] bg-white rounded">
        <div className="pl-8 pt-1">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
