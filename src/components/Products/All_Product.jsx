import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa6";

const All_Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // New state variables for filters
  const [sortFilter, setSortFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      let url = "http://localhost:3000/user/getAllProducts";

      // Check if a sort filter is applied
      if (sortFilter) {
        switch (sortFilter) {
          case "newest":
            url = "http://localhost:3000/products/newest";
            break;
          case "oldest":
            url = "http://localhost:3000/products/oldest";
            break;
          case "price-high":
            url = "http://localhost:3000/products/price-high";
            break;
          case "price-low":
            url = "http://localhost:3000/products/price-low";
            break;
          default:
            break;
        }
      } else if (categoryFilter) {
        // If a category filter is applied, use the query parameter endpoint
        url = `http://localhost:3000/user/getAllProducts?category=${encodeURIComponent(
          categoryFilter
        )}`;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
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

    fetchProducts();
  }, [sortFilter, categoryFilter]);

  const handleProductClick = (id) => {
    navigate(`/ProductD/${id}`);
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
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit asperiores modi sit asperiores modi
          </p>
        </div>

        {/* Sorting Filter Buttons */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => {
              setSortFilter("newest");
              setCategoryFilter("");
            }}
            className={`px-4 py-2 rounded-md ${
              sortFilter === "newest" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Newest
          </button>
          <button
            onClick={() => {
              setSortFilter("oldest");
              setCategoryFilter("");
            }}
            className={`px-4 py-2 rounded-md ${
              sortFilter === "oldest" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Oldest
          </button>
          <button
            onClick={() => {
              setSortFilter("price-low");
              setCategoryFilter("");
            }}
            className={`px-4 py-2 rounded-md ${
              sortFilter === "price-low" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Price Low
          </button>
          <button
            onClick={() => {
              setSortFilter("price-high");
              setCategoryFilter("");
            }}
            className={`px-4 py-2 rounded-md ${
              sortFilter === "price-high" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Price High
          </button>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => {
              setCategoryFilter("Casual Wear");
              setSortFilter("");
            }}
            className={`px-4 py-2 rounded-md ${
              categoryFilter === "Casual Wear" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            Casual Wear
          </button>
          <button
            onClick={() => {
              setCategoryFilter("Printed Shirt");
              setSortFilter("");
            }}
            className={`px-4 py-2 rounded-md ${
              categoryFilter === "Printed Shirt" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            Printed Shirt
          </button>
          <button
            onClick={() => {
              setCategoryFilter("Ladies Shirt");
              setSortFilter("");
            }}
            className={`px-4 py-2 rounded-md ${
              categoryFilter === "Ladies Shirt" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            Ladies Shirt
          </button>
        </div>

        {/* Body section */}
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-5">
            {/* Card section */}
            {products.map((product) => (
              <div
                key={product._id}
                onClick={() => handleProductClick(product._id)}
                className="space-y-3 cursor-pointer"
                data-aos="fade-up"
                data-aos-delay="0"
              >
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

export default All_Products;











// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Img1 from "../../assets/Product/Tshirt.jpg";
// import { FaStar } from "react-icons/fa6";

// const All_Products = () => {
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
//                 {/* <img
//                   src={product.picture}
//                   alt={product.name}
//                   className="h-[220px] w-[150px] object-cover rounded-md"
//                 /> */}
//                             <img
//   src={`http://localhost:3000${product.picture}`}
//   alt={product.name}
//   className="h-[220px] w-[150px] object-cover rounded-md"
// />
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

// export default All_Products;













// import React from "react";
// import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation
// import Img1 from "../../assets/Product/Tshirt.jpg";
// import { FaStar } from "react-icons/fa6";

// const ProductsData = [
//   {
//     id: 1,
//     img: Img1,
//     title: "Product Name",
//     rating: "Rating",
//     color: "Color",
//     aosDelay: "0",
//   },
//   {
//     id: 2,
//     img: Img1,
//     title: "Product Name",
//     rating: "Rating",
//     color: "Color",
//     aosDelay: "0",
//   },  {
//     id: 3,
//     img: Img1,
//     title: "Product Name",
//     rating: "Rating",
//     color: "Color",
//     aosDelay: "0",
//   },  {
//     id: 4,
//     img: Img1,
//     title: "Product Name",
//     rating: "Rating",
//     color: "Color",
//     aosDelay: "0",
//   },  {
//     id: 5,
//     img: Img1,
//     title: "Product Name",
//     rating: "Rating",
//     color: "Color",
//     aosDelay: "0",
//   },  {
//     id: 6,
//     img: Img1,
//     title: "Product Name",
//     rating: "Rating",
//     color: "Color",
//     aosDelay: "0",
//   },  {
//     id: 7,
//     img: Img1,
//     title: "Product Name",
//     rating: "Rating",
//     color: "Color",
//     aosDelay: "0",
//   },  {
//     id: 8,
//     img: Img1,
//     title: "Product Name",
//     rating: "Rating",
//     color: "Color",
//     aosDelay: "0",
//   },  {
//     id: 9,
//     img: Img1,
//     title: "Product Name",
//     rating: "Rating",
//     color: "Color",
//     aosDelay: "0",
//   },  {
//     id: 10,
//     img: Img1,
//     title: "Product Name",
//     rating: "Rating",
//     color: "Color",
//     aosDelay: "0",
//   },  {
//     id: 11,
//     img: Img1,
//     title: "Product Name",
//     rating: "Rating",
//     color: "Color",
//     aosDelay: "0",
//   },  {
//     id: 12,
//     img: Img1,
//     title: "Product Name",
//     rating: "Rating",
//     color: "Color",
//     aosDelay: "0",
//   },
//   // Other products...
// ];

// const All_Products = () => {
//   const navigate = useNavigate(); // Initialize useNavigate hook for navigation

//   const handleProductClick = (id) => {
//     // Redirect to the product details page with the product id
//     navigate(`/ProductD/${id}`);
//   };

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
//             {ProductsData.map((data) => (
//               <div
//                 key={data.id}
//                 onClick={() => handleProductClick(data.id)} // Handle click event
//                 className="space-y-3 cursor-pointer" // Added cursor-pointer for better UX
//                 data-aos="fade-up"
//                 data-aos-delay={data.aosDelay}
//               >
//                 <img
//                   src={data.img}
//                   alt={data.title}
//                   className="h-[220px] w-[150px] object-cover rounded-md"
//                 />
//                 <div>
//                   <h3 className="font-semibold">{data.title}</h3>
//                   <p className="text-sm text-gray-600">{data.color}</p>
//                   <div className="flex items-center gap-1">
//                     <FaStar className="text-yellow-400" />
//                     <span>{data.rating}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default All_Products;
