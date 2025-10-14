import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../redux/features/productSlice";
import Loader from "../Layout/Loader";

const AdminProducts = () => {
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
      renderCell: (params) => (
        <span
          style={{
            backgroundColor: "#FFF4CC", // soft yellow
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
    { field: "price", headerName: "Price", minWidth: 100, flex: 0.6 },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "Preview",
      type: "text",
      sortable: false,
      renderCell: (params) => (
        <Link to={`/product/${params.id}`}>
          <Button sx={{ color: "#2D6A4F", minWidth: 0 }}>
            <AiOutlineEye size={20} />
          </Button>
        </Link>
      ),
    },
  ];

  const rows =
    allProducts?.map((item) => ({
      id: item._id,
      name: item.name,
      price: "US$ " + item.discountPrice,
      Stock: item.stock,
      sold: item.sold || 0,
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

export default AdminProducts;
