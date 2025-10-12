import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { createProduct } from "../../redux/features/productSlice";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    if (error) toast.error(error);
    if (success) {
      toast.success("Product created successfully!");
      navigate("/dashboard");
      window.location.reload();
    }
  }, [error, success, navigate]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("originalPrice", originalPrice);
    formData.append("discountPrice", discountPrice);
    formData.append("stock", stock);
    formData.append("shopId", seller._id);
    dispatch(createProduct(formData));
  };

  const inputClass =
    "mt-1 block w-full px-3 h-9 border border-gray-300 rounded-sm text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#2D6A4F] focus:border-[#2D6A4F]";

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white shadow rounded p-4 overflow-y-auto max-h-[80vh]">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Create Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Enter product name..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputClass + " resize-none"}
            placeholder="Enter product description..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClass}
          >
            <option value="">Select a category</option>
            {categoriesData.map((i) => (
              <option key={i.title} value={i.title}>
                {i.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className={inputClass}
            placeholder="Enter product tags..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Original Price</label>
            <input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              className={inputClass}
              placeholder="Original Price"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Discount Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              className={inputClass}
              placeholder="Discounted Price"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">
            Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className={inputClass}
            placeholder="Product stock..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="upload"
            multiple
            className="hidden"
            onChange={handleImageChange}
          />
          <div className="flex flex-wrap items-center mt-1">
            <label htmlFor="upload">
              <AiOutlinePlusCircle
                size={28}
                color="#2D6A4F"
                className="cursor-pointer"
              />
            </label>
            {images.map((i) => (
              <img
                key={i.name}
                src={URL.createObjectURL(i)}
                alt="preview"
                className="h-24 w-24 object-cover m-2 border rounded-sm"
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#2D6A4F] text-white py-2 rounded-sm text-sm font-medium hover:bg-[#1f5239] transition-colors"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
