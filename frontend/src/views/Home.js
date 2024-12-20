import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Slider from "@mui/material/Slider";
import CardComponent from "../components/Card";
import Header from "../components/Header";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    width: "80%",
    margin: "0 auto",
    boxSizing: "border-box",
  },
  filterCard: {
    flex: "1 0 20%",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginRight: "20px",
    height: "auto",
    border: "1px solid #ddd",
  },
  filterTitle: {
    fontSize: "18px",
    marginBottom: "15px",
    fontWeight: "bold",
  },
  nameList: {
    marginBottom: "20px",
  },
  nameItem: {
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "15px",
    border: "none",
    borderBottom: "2px solid purple",
    borderRadius: "0",
    boxSizing: "border-box",
    outline: "none",
    fontSize: "16px",
  },
  sliderContainer: {
    marginBottom: "20px",
  },
  sliderText: {
    textAlign: "center",
    marginTop: "10px",
    fontSize: "14px",
    color: "#555",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    width: "48%",
    padding: "10px",
    backgroundColor: "#800080",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    textAlign: "center",
    "&:hover": {
      backgroundColor: "#2d4373",
    },
  },
  resetbutton: {
    width: "48%",
    padding: "10px",
    backgroundColor: "white",
    color: "purple",
    border: "1px solid purple",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    textAlign: "center",
    "&:hover": {
      backgroundColor: "purple",
      color: "white",
    },
  },
  slider: {
    color: "purple",
    "& .MuiSlider-rail": {
      backgroundColor: "#ccc",
    },
    "& .MuiSlider-thumb": {
      backgroundColor: "#800080",
    },
    "& .MuiSlider-track": {
      backgroundColor: "#800080",
    },
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    flex: "3 0 75%",
  },
 box: {
    backgroundColor: 'white',
    color: 'purple',
    borderRadius: '12px',
    padding: '8px 16px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    display: 'inline-block',
    border: "1px solid purple",
  },
  minBox: {
    marginRight: '8px', // Space between Min and Max boxes
  },
  maxBox: {
    marginLeft: '8px', // Space between Min and Max boxes
  }
}));

const formatCategory = (category) => {
  return category
    .replace(/([A-Z])/g, " $1") // Add space before uppercase letters
    .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
    .trim(); // Remove extra spaces
};

const App = () => {
  const classes = useStyles();
  const [cart, setCart] = useState([]);
  console.log(cart,"--------cart")
  const [filters, setFilters] = useState({ categories: [], minPrice: 0, maxPrice: 2000 });
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [appliedFilters, setAppliedFilters] = useState({ categories: [], minPrice: 0, maxPrice: 2000 });
   const [totalPrice, setTotalPrice] = useState(0);
  
  const products = [
    {
      id: 1,
      name: "Gad Pro",
      price: 499,
      description: "GadPro flash series",
      category: "extension",
      image: "https://p.globalsources.com/IMAGES/PDT/B1168221321/3-way-cable-3-in-1-data-cable.jpg",
      rating: 0,
    },
    {
      id: 2,
      name: "Dr Vaku",
      price: 1349,
      category: "powerBank",
      description: "Dr Vaku Clear Bolt",
      image: "https://th.bing.com/th/id/OIP.RvrVVgm5vRSOgGT9stzLeAHaGk?pid=ImgDetMain",
      rating: 5,
    },
    {
      id: 3,
      name: "LDNIO",
      price: 399,
      category: "cableAndCharger",
      description: "LDNIO Z4 Plug",
      image: "https://i.pinimg.com/originals/6c/6f/13/6c6f13d1333cd7d62f816581c70b2f62.jpg",
      rating: 0,
    },
    {
      id: 4,
      name: "JBL",
      price: 1999,
      category: "headsets",
      description: "JBL Tune 205BT",
      image: "https://i5.walmartimages.com/asr/43b4d325-d149-432d-8af2-a0d4adf6e5e1_1.7d4b30a4a0bc8a4e656e55e2abccc219.png",
      rating: 0,
    },
  ];

  const categories = [...new Set(products.map((product) => product.category))];

  const handleAddToCart = async (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      setTotalPrice(updatedCart.reduce((sum, item) => sum + item.price, 0));
      return updatedCart;
    });

    // Send cart data to backend (MongoDB)
    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image:product.image,productId: product.id, quantity: 1 ,price:product.price,name:product.name}),
      });

      await response.json();
      if (response.ok) {
        alert(`${product.name} added to cart and saved to database!`);
      } else {
        alert('Error adding product to cart');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to the server');
    }
  };

  const handleSliderChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const applyFilters = () => {
    setAppliedFilters({
      categories: filters.categories,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
  };

  const resetFilters = () => {
    setFilters({ categories: [], minPrice: 0, maxPrice: 2000 });
    setPriceRange([0, 2000]);
    setAppliedFilters({ categories: [], minPrice: 0, maxPrice: 2000 });
  };
  const handleCategoryChange = (category) => {
    setFilters((prevFilters) => {
      const selectedCategories = prevFilters.categories.includes(category)
        ? prevFilters.categories.filter((c) => c !== category)
        : [...prevFilters.categories, category];
      return { ...prevFilters, categories: selectedCategories };
    });
  };
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      appliedFilters.categories.length === 0 ||
      appliedFilters.categories.includes(product.category);
    const matchesPrice =
      product.price >= appliedFilters.minPrice && product.price <= appliedFilters.maxPrice;
    return matchesCategory && matchesPrice;
  });

  return (
    <>
      <div className="max-w-full">
				<Header totalPrice={totalPrice}/>
			</div>
    
    <div className={classes.root}>
      <div className={classes.filterCard}>
        <h3 className={classes.filterTitle}>Products Categories</h3>
        <div className={classes.nameList}>
          {categories.map((category) => (
            <div
              key={category}
              className={classes.nameItem}
              onClick={() => handleCategoryChange(category)}
            >
              {formatCategory(category)}
            </div>
          ))}
          <input
            type="text"
            className={classes.input}
            placeholder="Selected Categories"
            value={filters.categories.map(formatCategory).join(", ")}
            readOnly
          />
        </div>
        <h3 className={classes.filterTitle}>Filter By Price</h3>
        <div className={classes.sliderContainer}>
      
           <div className={`${classes.box} ${classes.minBox}`}>
        Min: ₹{priceRange[0]}
      </div>
      <div className={`${classes.box} ${classes.maxBox}`}>
        Max: ₹{priceRange[1]}
      </div>
      <Slider
            value={priceRange}
            className={classes.slider}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            min={0}
            max={2000}
          />
        </div>
        <div className={classes.buttonGroup}>
          <button className={classes.resetbutton} onClick={resetFilters}>
            Reset
          </button>
          <button className={classes.button} onClick={applyFilters}>
            Apply
          </button>
        </div>
      </div>

      <div className={classes.cardContainer}>
        {filteredProducts.map((product) => (
          <CardComponent
            key={product.id}
            image={product.image}
            name={product.name}
            rating={product.rating}
            price={product.price}
            description={product.description}
            id={product.id}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default App;
