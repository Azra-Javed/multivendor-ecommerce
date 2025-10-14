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
        <div className="w-[calc(100vw-5rem-20px)] md:w-[calc(100vw-16rem-20px)] !h-[89vh] overflow-y-auto p-3 md:pt-4 bg-[#f9fafb]">
          <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-4">
            <div className="w-full flex justify-end mb-3">
              <button
                onClick={() => setOpen(true)}
                className="bg-[#2D6A4F] text-white py-2 px-4 rounded-sm text-sm font-medium hover:bg-[#1f5239] transition-colors"
              >
                Create Coupon Code
              </button>
            </div>
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
            {open && <CreateCouponCode setOpen={setOpen} />}
          </div>
        </div>
      )}
    </>
  );
};

export default AllCoupons;
