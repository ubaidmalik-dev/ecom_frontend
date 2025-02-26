import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa"; // Import trash icon

const Admin_All_Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/getAllProducts');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
      console.log(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (id) => {
    navigate(`/ProductD/${id}`);
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation(); // Prevent triggering the product click event
    
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`http://localhost:3000/user/admin/products/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete product');
        }

        alert('Product deleted successfully');
        // Refresh the products list
        fetchProducts();
      } catch (err) {
        alert('Error deleting product: ' + err.message);
      }
    }
  };

  if (loading) return <div className="text-center mt-14">Loading...</div>;
  if (error) return <div className="text-center mt-14 text-red-500">Error: {error}</div>;

  return (
    <div className="mt-14 mb-12">
      <div className="container">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-primary">
            Top Selling Products for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Products
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
            asperiores modi Sit asperiores modi
          </p>
        </div>
        {/* Body section */}
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-5">
            {/* Card section */}
            {products.map((product) => (
              <div
                key={product._id}
                onClick={() => handleProductClick(product._id)}
                className="relative space-y-3 cursor-pointer"
                data-aos="fade-up"
                data-aos-delay="0"
              >
                {/* Delete Button */}
                <button
                  onClick={(e) => handleDelete(product._id, e)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full z-10 transition-colors duration-200"
                >
                  Delete
                </button>

                <img
  src={`http://localhost:3000${product.picture}`}
  alt={product.name}
  className="h-[220px] w-[150px] object-cover rounded-md"
/>

                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.category}</p>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span>{product.ratings}</span>
                  </div>
                  <div className="flex gap-2">
                    {product.Discounted_price && product.Discounted_price < product.price ? (
                      <>
                        <p className="text-sm font-semibold">{product.Discounted_price}rs</p>
                        <p className="text-sm text-gray-500 line-through">{product.price}rs</p>
                      </>
                    ) : (
                      <p className="text-sm font-semibold">{product.price}rs</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_All_Products;







// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// // import Img1 from "../../assets/Product/Tshirt.jpg";
// import { FaStar } from "react-icons/fa6";

// const Admin_All_Products = () => {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/user/getAllProducts');
//         if (!response.ok) {
//           throw new Error('Failed to fetch products');
//         }
//         const data = await response.json();
//         setProducts(data);
//         console.log(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleProductClick = (id) => {
//     navigate(`/ProductD/${id}`);
//   };

//   if (loading) return <div className="text-center mt-14">Loading...</div>;
//   if (error) return <div className="text-center mt-14 text-red-500">Error: {error}</div>;

//   return (
//     <div className="mt-14 mb-12">
//       <div className="container">
//         {/* Header section */}
//         <div className="text-center mb-10 max-w-[600px] mx-auto">
//           <p data-aos="fade-up" className="text-sm text-primary">
//             Top Selling Products for you
//           </p>
//           <h1 data-aos="fade-up" className="text-3xl font-bold">
//             Products
//           </h1>
//           <p data-aos="fade-up" className="text-xs text-gray-400">
//             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
//             asperiores modi Sit asperiores modi
//           </p>
//         </div>
//         {/* Body section */}
//         <div>
//           <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-5">
//             {/* Card section */}
//             {products.map((product) => (
//               <div
//                 key={product._id}
//                 onClick={() => handleProductClick(product._id)}
//                 className="space-y-3 cursor-pointer"
//                 data-aos="fade-up"
//                 data-aos-delay="0"
//               >
//                 <img
//                   src={product.picture}
//                   alt={product.name}
//                   className="h-[220px] w-[150px] object-cover rounded-md"
//                 />
//                 <div>
//                   <h3 className="font-semibold">{product.name}</h3>
//                   <p className="text-sm text-gray-600">{product.category}</p>
//                   <div className="flex items-center gap-1">
//                     <FaStar className="text-yellow-400" />
//                     <span>{product.ratings}</span>
//                   </div>
//                   <div className="flex gap-2">
//   {product.Discounted_price && product.Discounted_price < product.price ? (
//     <>
//       <p className="text-sm font-semibold">{product.Discounted_price}rs</p>
//       <p className="text-sm text-gray-500 line-through">{product.price}rs</p>
//     </>
//   ) : (
//     <p className="text-sm font-semibold">{product.price}rs</p>
//   )}
// </div>

//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Admin_All_Products;
