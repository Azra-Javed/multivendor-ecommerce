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

  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-full flex justify-center pt-5 bg-[#f9fafb]">
      <div className="w-[98%]">
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-3">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableRowSelectionOnClick
            autoHeight
            density="compact"
            initialState={{
              pagination: { paginationModel: { pageSize: 12, page: 0 } },
            }}
            pageSizeOptions={[12, 14, 18]}
            sx={{
              fontSize: "13px",
              "& .MuiDataGrid-columnHeaders": {
                fontSize: "14px",
                fontWeight: 600,
                backgroundColor: "#FFF4CC",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#FFF9E5",
              },
            }}
          />
        </div>

        {open && (
          <div className="fixed inset-0 bg-[#00000050] flex items-center justify-center z-[999]">
            <div className="bg-white w-[90%] sm:w-[400px] rounded-lg shadow-lg p-6">
              <div className="flex justify-end">
                <RxCross1
                  size={22}
                  className="cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={() => setOpen(false)}
                />
              </div>
              <h3 className="text-[20px] text-center font-medium text-gray-700 py-3">
                Are you sure you want to delete this user?
              </h3>
              <div className="flex justify-center gap-4 mt-3">
                <div
                  className={`${styles.button} bg-gray-400 hover:bg-gray-500 text-white text-[15px] !h-[38px] px-4 rounded-md`}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </div>
                <div
                  className={`${styles.button} bg-[#FFD166] hover:bg-[#E6C15A] text-gray-800 text-[15px] !h-[38px] px-4 rounded-md`}
                  onClick={handleDelete}
                >
                  Confirm
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
