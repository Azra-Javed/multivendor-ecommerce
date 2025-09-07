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
        setOpen(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        setOpen(false);
      });
  };

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 150, flex: 0.7 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: "role",
      headerName: "User Role",
      type: "text",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: "joinedAt",
      headerName: "Joined At",
      type: "Date",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "Delete User",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => {
                setDeleteId(params.id);
                setOpen(true);
              }}
            >
              <AiOutlineDelete size={30} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  adminUsers &&
    adminUsers.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        joinedAt: item.createdAt.slice(0, 10),
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="w-full flex justify-center pt-5">
            <div className="w-[98%]">
              <h3 className="text-[22px] font-family-poppins pb-2">
                All Users
              </h3>
              <div className="w-full  pt-1 mt-10 bg-white rounded">
                <DataGrid
                  rows={row}
                  columns={columns}
                  pageSize={10}
                  disableRowSelectionOnClick
                  style={{ minHeight: "45vh" }}
                />
              </div>
              {open && (
                <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
                  <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
                    <div className="w-full flex justify-end">
                      <RxCross1
                        size={25}
                        className="cursor-pointer"
                        onClick={() => setOpen(false)}
                      />
                    </div>
                    <h3 className="text-[25px] text-center py-5 font-family-poppins text-[#363636]">
                      Are you sure to delete the user?
                    </h3>
                    <div className="flex items-center justify-center">
                      <div
                        className={`${styles.button} text-white text-[18px] !h-[40px] mr-4 cursor-pointer`}
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </div>
                      <div
                        className={`${styles.button} text-white text-[18px] !h-[40px]`}
                        onClick={() => handleDelete()}
                      >
                        Confirm
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminUsers;
