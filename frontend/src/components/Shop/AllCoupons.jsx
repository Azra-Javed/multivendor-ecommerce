import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Loader from "../Layout/Loader";
import { AiOutlineDelete } from "react-icons/ai";
import CreateCouponCode from "./CreateCouponCode.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server.js";
import { useSelector } from "react-redux";

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
  }, [seller]);

  const handleDelete = (id) => {
    axios
      .delete(`${server}/coupon/delete-coupon/${id}`, { withCredentials: true })
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
      renderCell: (params) => (
        <span
          style={{
            backgroundColor: "#FFF4CC",
            color: "#856404",
            padding: "3px 8px",
            borderRadius: "6px",
            fontWeight: 500,
            fontSize: "13px",
          }}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "price",
      headerName: "Value",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      sortable: false,
      renderCell: (params) => (
        <Button
          sx={{ color: "#D00000", minWidth: 0 }}
          onClick={() => handleDelete(params.row.id)}
        >
          <AiOutlineDelete size={20} />
        </Button>
      ),
    },
  ];

  const rows =
    coupons?.map((item) => ({
      id: item._id,
      name: item.name,
      price: item.value + "%",
    })) || [];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white rounded-lg shadow-sm p-4">
          <div className="w-full flex justify-end mb-3">
            <button
              onClick={() => setOpen(true)}
              className="bg-[#2D6A4F] text-white py-2 px-4 rounded-sm text-sm font-medium hover:bg-[#1f5239] transition-colors"
            >
              Create Coupon Code
            </button>
          </div>

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

          {open && <CreateCouponCode setOpen={setOpen} />}
        </div>
      )}
    </>
  );
};

export default AllCoupons;
