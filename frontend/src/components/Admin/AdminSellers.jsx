import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layout/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";
import styles from "../../styles/style";
import { RxCross1 } from "react-icons/rx";
import { getAdminSellers } from "../../redux/features/sellerSlice";
import { Link } from "react-router-dom";

const AdminSellers = () => {
  const { adminSellers, isLoading } = useSelector((state) => state.seller);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminSellers());
  }, [dispatch]);

  const handleDelete = async () => {
    setOpen(false);
    axios
      .delete(`${server}/shop/delete-seller/${deleteId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAdminSellers());
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Failed to delete seller");
      });
  };

  const columns = [
    { field: "id", headerName: "Seller ID", minWidth: 130, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 130, flex: 0.6 },
    { field: "email", headerName: "Email", minWidth: 140, flex: 0.8 },
    { field: "address", headerName: "Address", minWidth: 150, flex: 0.8 },
    { field: "joinedAt", headerName: "Joined", minWidth: 100, flex: 0.6 },
    {
      field: "preview",
      headerName: "Preview",
      minWidth: 90,
      flex: 0.4,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/shop/preview/${params.id}`}>
          <Button sx={{ color: "#2D6A4F", minWidth: 0 }}>
            <AiOutlineEye size={20} />
          </Button>
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      minWidth: 90,
      flex: 0.4,
      sortable: false,
      renderCell: (params) => (
        <Button
          onClick={() => {
            setDeleteId(params.id);
            setOpen(true);
          }}
          sx={{ color: "#C53030", minWidth: 0 }}
        >
          <AiOutlineDelete size={22} />
        </Button>
      ),
    },
  ];

  const rows =
    adminSellers?.map((item) => ({
      id: item._id,
      name: item.name,
      email: item.email,
      address: item.address,
      joinedAt: item.createdAt.slice(0, 10),
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

export default AdminSellers;
