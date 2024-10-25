import { useSelector } from "react-redux";
import { useGetProductsQuery } from "../redux/apiSlice";
import { DollarSign, Edit } from "lucide-react";
import { useCallback, useState } from "react";
import ProductModal from "./ProductModal";

const ProductsPage = () => {
  const { isLoading, isError, error, isSuccess } = useGetProductsQuery();
  const allProducts = useSelector(({ products }) => products.allProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // I am using useCallback to memoize the function which may seems not much needed here but I like to do it
  const handleOpenModal = useCallback((product = null) => {
    setIsModalOpen(true);
    if (product) {
      setEditingProduct(product);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setEditingProduct(null);
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <div className="page-background">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h1 className="page-title">Products List</h1>
            <button
              onClick={() => handleOpenModal()} // product will be added in last of list
              className="button-primary"
            >
              Add New Product
            </button>
          </div>
          {isLoading && <p className="text-white text-center">Loading...</p>}
          {isError && (
            <p className="text-red-500 text-center">
              An error occured:{" "}
              <span className="text-white">{error.error}</span>
            </p>
          )}
          {/* lisiting of products yaha se suru hai */}
          <div className="grid grid-cols-1 gap-6">
            {isSuccess &&
              allProducts?.map((product) => {
                const { id, image, title } = product;
                return (
                  <div className="card flex h-48 relative" key={id}>
                    <button
                      onClick={() => handleOpenModal(product)}
                      className="absolute top-2 right-2 text-white hover:text-blue-500"
                    >
                      <Edit size={20} />
                    </button>
                    <div className="w-1/3 flex-shrink-0 flex items-center justify-center p-4">
                      <img
                        src={image}
                        alt={title}
                        className="max-w-full max-h-full object-contain min-w-[80px] min-h-[80px]"
                        loading="lazy"
                        onError={(e) => {
                          // agar photo na load ho to fallback image dikha dunga
                          e.target.src = "/fallback-image.png";
                        }}
                      />
                    </div>
                    <div className="w-2/3 p-4 flex flex-col justify-between">
                      <div>
                        <h2 className="card-title">{product.title}</h2>
                        <p className="card-description">
                          {product.description}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <DollarSign className="text-green-500 w-5 h-5 mr-1" />
                          <span className="text-white font-bold">
                            {product?.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={editingProduct}
      />
    </>
  );
};

export default ProductsPage;
