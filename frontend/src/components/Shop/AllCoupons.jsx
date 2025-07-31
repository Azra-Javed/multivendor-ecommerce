import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Loader from "../Layout/Loader";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "../../styles/style";
import { useState } from "react";
import CreateCouponCode from "./CreateCouponCode.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server.js";

const AllCoupons = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const { seller } = useSelector((state) => state.seller);

  useEffect(() => {
    if (!seller || !seller._id) return;

    setIsLoading(true);
    axios
      .get(`${server}/coupon/get-coupon/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        setCoupons(res.data.couponCodes);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.response?.data?.message || "Failed to fetch coupons");
      });
  }, [seller, seller._id]);

  const handleDelete = (id) => {
    axios
      .delete(`${server}/coupon/delete-coupon/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
      });
  };

  const columns = [
    { field: "id", headerName: "Coupon Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },

    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.row.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  coupons &&
    coupons.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.value + "%",
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white">Create Coupon Code</span>
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableRowSelectionOnClick
            autoHeight
          />
          {open && <CreateCouponCode setOpen={setOpen} />}
        </div>
      )}
    </>
  );
};

export default AllCoupons;
