import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DarkLogo from "../../assets/Logo.png";
import LightLogo from "../../assets/Dark_Logo.png";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to update cart count based on localStorage "cart" object.
  const updateCartCount = () => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      const cartItems = JSON.parse(cartData);
      let count = 0;
      if (Array.isArray(cartItems)) {
        // If the cart is stored as an array, fallback to using its length.
        count = cartItems.length;
      } else if (cartItems && typeof cartItems === "object") {
        // Sum the quantities from the object values.
        count = Object.values(cartItems).reduce(
          (acc, quantity) => acc + Number(quantity),
          0
        );
      }
      setCartCount(count);
    } else {
      setCartCount(0);
    }
  };

  // Listen for both the native "storage" event and our custom "cartUpdated" event.
  useEffect(() => {
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);
    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <div
      className={`w-full transition-all duration-300 z-50 ${
        isScrolled
          ? "fixed top-0 left-0 shadow-lg bg-white dark:bg-gray-900"
          : "relative bg-transparent"
      }`}
    >
      {/* Sliding Discount Bar */}
      <div className="w-full bg-red-500 text-white text-center py-2 overflow-hidden">
        <marquee scrollamount="10" className="text-sm font-semibold">
          🎉 Limited Time Offer: Get 20% OFF on all products! Use Code:{" "}
          <span className="font-bold">SALE20</span> 🎉
        </marquee>
      </div>

      {/* Upper Navbar */}
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          <div>
            <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
              <img
                src={theme === "dark" ? DarkLogo : LightLogo}
                alt="Logo"
                className="w-20"
              />
              Roucha Cielo
            </a>
          </div>

          {/* Cart and Theme Toggle */}
          <div className="flex items-center gap-4">
            {/* Cart Button with Link */}
            <Link
              to="/cart"
              className="relative bg-gradient-to-r from-primary to-secondary text-white py-1 px-4 rounded-full flex items-center gap-3"
            >
              <FaCartShopping className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 text-sm bg-red-500 text-white rounded-full px-2 py-0.5">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="sm:hidden p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            >
              <span className="block w-6 h-0.5 bg-black dark:bg-white"></span>
              <span className="block mt-1 w-6 h-0.5 bg-black dark:bg-white"></span>
              <span className="block mt-1 w-6 h-0.5 bg-black dark:bg-white"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Lower Navbar */}
      <div className="flex justify-center sm:flex hidden py-4">
        <ul className="flex items-center gap-6 text-lg">
          <li>
            <Link
              to="/"
              className="inline-block px-6 hover:text-primary duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="inline-block px-6 hover:text-primary duration-200"
            >
              Product
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="inline-block px-6 hover:text-primary duration-200"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="inline-block px-6 hover:text-primary duration-200"
            >
              Contact
            </Link>
          </li>
          <li className="group relative cursor-pointer">
            <a href="#" className="flex items-center gap-1">
              Trending Products{" "}
              <FaCaretDown className="transition duration-200 group-hover:rotate-180" />
            </a>
            <div className="absolute hidden group-hover:block bg-white p-3 text-black shadow-md w-[220px]">
              <ul>
                <li>
                  <Link
                    to="/TOPPRO"
                    className="block p-2 hover:bg-primary/20"
                  >
                    Best Selling
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;














// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import DarkLogo from "../../assets/Logo.png";
// import LightLogo from "../../assets/Dark_Logo.png";
// import { FaCartShopping } from "react-icons/fa6";
// import { FaCaretDown } from "react-icons/fa";

// const Navbar = () => {
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [cartCount, setCartCount] = useState(0);

//   useEffect(() => {
//     const root = document.documentElement;
//     if (theme === "dark") {
//       root.classList.add("dark");
//     } else {
//       root.classList.remove("dark");
//     }
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme(theme === "dark" ? "light" : "dark");
//   };

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Updated function to update cart count based on localStorage "cart" object.
//   // It sums the quantities for all products (each product key's value) to determine the badge number.
//   const updateCartCount = () => {
//     const cartData = localStorage.getItem("cart");
//     if (cartData) {
//       const cartItems = JSON.parse(cartData);
//       let count = 0;
//       if (Array.isArray(cartItems)) {
//         // In case the cart is stored as an array, fallback to using its length.
//         count = cartItems.length;
//       } else if (cartItems && typeof cartItems === "object") {
//         // Sum the quantities from the object values.
//         count = Object.values(cartItems).reduce(
//           (acc, quantity) => acc + Number(quantity),
//           0
//         );
//       }
//       setCartCount(count);
//     } else {
//       setCartCount(0);
//     }
//   };

  
//   // Fetch cart count on load and listen for storage changes.
//   useEffect(() => {
//     updateCartCount();
//     window.addEventListener("storage", updateCartCount);
//     return () => window.removeEventListener("storage", updateCartCount);
//   }, []);

//   return (
//     <div
//       className={`w-full transition-all duration-300 z-50 ${
//         isScrolled
//           ? "fixed top-0 left-0 shadow-lg bg-white dark:bg-gray-900"
//           : "relative bg-transparent"
//       }`}
//     >
//       {/* Sliding Discount Bar */}
//       <div className="w-full bg-red-500 text-white text-center py-2 overflow-hidden">
//         <marquee scrollamount="10" className="text-sm font-semibold">
//           🎉 Limited Time Offer: Get 20% OFF on all products! Use Code:{" "}
//           <span className="font-bold">SALE20</span> 🎉
//         </marquee>
//       </div>

//       {/* Upper Navbar */}
//       <div className="bg-primary/40 py-2">
//         <div className="container flex justify-between items-center">
//           <div>
//             <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
//               <img
//                 src={theme === "dark" ? DarkLogo : LightLogo}
//                 alt="Logo"
//                 className="w-20"
//               />
//               Roucha Cielo
//             </a>
//           </div>

//           {/* Cart and Theme Toggle */}
//           <div className="flex items-center gap-4">
//             {/* Cart Button with Link */}
//             <Link
//               to="/cart"
//               className="relative bg-gradient-to-r from-primary to-secondary text-white py-1 px-4 rounded-full flex items-center gap-3"
//             >
//               <FaCartShopping className="text-xl" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-2 -right-2 text-sm bg-red-500 text-white rounded-full px-2 py-0.5">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>
//             <button
//               onClick={toggleTheme}
//               className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
//             >
//               {theme === "dark" ? "🌙" : "☀️"}
//             </button>

//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="sm:hidden p-2 rounded-full bg-gray-200 dark:bg-gray-700"
//             >
//               <span className="block w-6 h-0.5 bg-black dark:bg-white"></span>
//               <span className="block mt-1 w-6 h-0.5 bg-black dark:bg-white"></span>
//               <span className="block mt-1 w-6 h-0.5 bg-black dark:bg-white"></span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Lower Navbar */}
//       <div className="flex justify-center sm:flex hidden py-4">
//         <ul className="flex items-center gap-6 text-lg">
//           <li>
//             <Link
//               to="/"
//               className="inline-block px-6 hover:text-primary duration-200"
//             >
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/products"
//               className="inline-block px-6 hover:text-primary duration-200"
//             >
//               Product
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/about"
//               className="inline-block px-6 hover:text-primary duration-200"
//             >
//               About
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/contact"
//               className="inline-block px-6 hover:text-primary duration-200"
//             >
//               Contact
//             </Link>
//           </li>
//           <li className="group relative cursor-pointer">
//             <a href="#" className="flex items-center gap-1">
//               Trending Products{" "}
//               <FaCaretDown className="transition duration-200 group-hover:rotate-180" />
//             </a>
//             <div className="absolute hidden group-hover:block bg-white p-3 text-black shadow-md w-[220px]">
//               <ul>
//                 <li>
//                   <Link
//                     to="/TOPPRO"
//                     className="block p-2 hover:bg-primary/20"
//                   >
//                     Best Selling
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


























// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import DarkLogo from "../../assets/Logo.png";
// import LightLogo from "../../assets/Dark_Logo.png";
// import { FaCartShopping } from "react-icons/fa6";
// import { FaCaretDown } from "react-icons/fa";

// const Navbar = () => {
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [cartCount, setCartCount] = useState(0);

//   useEffect(() => {
//     const root = document.documentElement;
//     if (theme === "dark") {
//       root.classList.add("dark");
//     } else {
//       root.classList.remove("dark");
//     }
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme(theme === "dark" ? "light" : "dark");
//   };

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Function to update cart count
//   const updateCartCount = () => {
//     const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
//     setCartCount(cartItems.length);
//   };

//   // Fetch cart count on load and listen for storage changes
//   useEffect(() => {
//     updateCartCount();
//     window.addEventListener("storage", updateCartCount);
//     return () => window.removeEventListener("storage", updateCartCount);
//   }, []);

//   return (
//     <div className={`w-full transition-all duration-300 z-50 ${isScrolled ? "fixed top-0 left-0 shadow-lg bg-white dark:bg-gray-900" : "relative bg-transparent"}`}>
//       {/* Sliding Discount Bar */}
//       <div className="w-full bg-red-500 text-white text-center py-2 overflow-hidden">
//         <marquee scrollamount="10" className="text-sm font-semibold">
//           🎉 Limited Time Offer: Get 20% OFF on all products! Use Code: <span className="font-bold">SALE20</span> 🎉
//         </marquee>
//       </div>

//       {/* Upper Navbar */}
//       <div className="bg-primary/40 py-2">
//         <div className="container flex justify-between items-center">
//           <div>
//             <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
//               <img src={theme === "dark" ? DarkLogo : LightLogo} alt="Logo" className="w-20" />
//               Roucha Cielo
//             </a>
//           </div>

//           {/* Cart and Theme Toggle */}
//           <div className="flex items-center gap-4">
//             {/* Cart Button with Link */}
//             <Link to="/cart" className="relative bg-gradient-to-r from-primary to-secondary text-white py-1 px-4 rounded-full flex items-center gap-3">
//               <FaCartShopping className="text-xl" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-2 -right-2 text-sm bg-red-500 text-white rounded-full px-2 py-0.5">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>
//             <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
//               {theme === "dark" ? "🌙" : "☀️"}
//             </button>

//             <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden p-2 rounded-full bg-gray-200 dark:bg-gray-700">
//               <span className="block w-6 h-0.5 bg-black dark:bg-white"></span>
//               <span className="block mt-1 w-6 h-0.5 bg-black dark:bg-white"></span>
//               <span className="block mt-1 w-6 h-0.5 bg-black dark:bg-white"></span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Lower Navbar */}
//       <div className="flex justify-center sm:flex hidden py-4">
//         <ul className="flex items-center gap-6 text-lg">
//           <li><Link to="/" className="inline-block px-6 hover:text-primary duration-200">Home</Link></li>
//           <li><Link to="/products" className="inline-block px-6 hover:text-primary duration-200">Product</Link></li>
//           <li><Link to="/about" className="inline-block px-6 hover:text-primary duration-200">About</Link></li>
//           <li><Link to="/contact" className="inline-block px-6 hover:text-primary duration-200">Contact</Link></li>
//           <li className="group relative cursor-pointer">
//             <a href="#" className="flex items-center gap-1">
//               Trending Products <FaCaretDown className="transition duration-200 group-hover:rotate-180" />
//             </a>
//             <div className="absolute hidden group-hover:block bg-white p-3 text-black shadow-md w-[220px]">
//               <ul>
//                 <li><Link to="/TOPPRO" className="block p-2 hover:bg-primary/20">Best Selling</Link></li>
//               </ul>
//             </div>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
