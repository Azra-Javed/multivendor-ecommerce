import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAdminUsers } from "../../redux/features/userSlice";
import Loader from "../Layout/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";
import styles from "../../styles/style";
import { RxCross1 } from "react-icons/rx";

const AdminUsers = () => {
  const { adminUsers, isLoading } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminUsers());
  }, [dispatch]);

  const handleDelete = async () => {
    setOpen(false);
    axios
      .delete(`${server}/user/delete-user/${deleteId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAdminUsers());
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Failed to delete user");
      });
  };

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 140, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 140,
      flex: 0.7,
      renderCell: (params) => (
        <span
          className="px-2 py-1 rounded-md font-medium"
          style={{ backgroundColor: "#FFF4CC", color: "#856404" }}
        >
          {params.value}
        </span>
      ),
    },
    { field: "email", headerName: "Email", minWidth: 140, flex: 0.8 },
    { field: "role", headerName: "Role", minWidth: 130, flex: 0.6 },
    { field: "joinedAt", headerName: "Joined", minWidth: 120, flex: 0.6 },
    {
      field: "delete",
      headerName: "Delete User",
      minWidth: 100,
      flex: 0.5,
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
    adminUsers?.map((item) => ({
      id: item._id,
      name: item.name,
      email: item.email,
      role: item.role,
      joinedAt: item.createdAt.slice(0, 10),
    })) || [];

  return (
    <>
      {isLoading ? (
        <div className="w-full">
          <Loader />
        </div>
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

export default AdminUsers;
