import { useCallback, useEffect, useState } from "react";
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from "../redux/apiSlice";
import Modal from "../components/ui/Modal";
import { toast } from "react-toastify";

const initialValues = {
  title: "",
  description: "",
  price: "",
  image: "",
  category: "",
};

const ProductModal = ({ isOpen, onClose, product = null }) => {
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    if (product && isOpen) {
      setFormData({
        title: product?.title || "",
        description: product?.description || "",
        price: product?.price || "",
        image: product?.image || "",
        category: product?.category || "",
      });
    }
    return () => {
      setFormData(initialValues);
    };
  }, [isOpen, product]);

  const handleChange = useCallback((e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (product) {
        await updateProduct({ id: product.id, ...formData });
        toast(`Product updated with id ${product.id}`);
      } else {
        await addProduct(formData);
        toast("Product added successfully");
      }
    } catch (error) {
      console.error("Error updating/adding product:", error);
    } finally {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-white text-2xl font-bold mb-4">
        {product ? "Edit Product" : "Add New Product"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-white mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="input-field"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-white mb-2">
            Description
          </label>
          <textarea
            id="description"
            className="input-field"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-white mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            className="input-field"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-white mb-2">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            className="input-field"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-white mb-2">
            Category
          </label>
          <select
            id="category"
            className="input-field"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="men's clothing">Men Clothing</option>
            <option value="women's clothing">Women Clothing</option>
            <option value="jewelery">Jewelery</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            {product ? "Update Product" : "Add Product"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductModal;
