import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProductsShop,
} from "../../redux/features/productSlice";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Loader from "../Layout/Loader";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";

const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllProductsShop(seller._id));
    }
  }, [dispatch, seller?._id]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    window.location.reload(true);
  };

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
      minWidth: 120,
      flex: 0.6,
    },
    {
      field: "Preview",
      headerName: "Preview",
      minWidth: 100,
      flex: 0.6,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/product/${params.id}`}>
          <Button>
            <AiOutlineEye size={20} className="text-[#2D6A4F]" />
          </Button>
        </Link>
      ),
    },
    {
      field: "Delete",
      headerName: "Delete",
      minWidth: 120,
      flex: 0.6,
      sortable: false,
      renderCell: (params) => (
        <Button onClick={() => handleDelete(params.id)}>
          <AiOutlineDelete size={20} className="text-[#C53030]" />
        </Button>
      ),
    },
  ];

  const rows =
    products?.map((item) => ({
      id: item._id,
      name: item.name,
      price: "US$ " + item.discountPrice,
      Stock: item.stock,
      sold: item.sold_out,
    })) || [];

  if (isLoading) return <Loader />;

  return (
    <div className="w-[calc(100vw-5rem-20px)] md:w-[calc(100vw-16rem-20px)] !h-[89vh] overflow-y-auto p-3 md:pt-4 bg-[#f9fafb]">
      <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-4">
        <h4 className="text-[16px] font-medium text-gray-700 mb-2">
          All Products
        </h4>
        <div className="overflow-x-auto">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
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
      </div>
    </div>
  );
};

export default AllProducts;
