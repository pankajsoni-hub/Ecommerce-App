import React, { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

// Define styles using makeStyles
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "75vh",
    padding: "0 10px",
  },
  container: {
    maxWidth: "600px",
    width: "100%",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    marginBottom: "24px",
    fontWeight: "bold",
    color: "#4b0082",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#800080",
    color: "white",
    border: "none",
    marginTop: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    textAlign: "center",
    "&:hover": {
      backgroundColor: "#2d4373",
    },
  },
  alert: {
    marginTop: "16px",
    textAlign: "center",
    fontWeight: "bold",
    color: "#4caf50",
  },
}));

const Checkout = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    address: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = location.state || { cartItems: [] };
  const [orderPlaced, setOrderPlaced] = useState(false);
  const classes = useStyles();

  // Calculate total price of items in the cart
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, products: cartItems, [e.target.name]: e.target.value });
  };
  const handleRemoveAllItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/cart", {
        method: "DELETE",  
      });
      const data = await response.json();
    } catch (error) {
      console.error("Error removing all items:", error);
    }
  };
  const handleOrder = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userDetails, totalPrice }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(`${data.message}`);
        await handleRemoveAllItems();
        navigate('/home');
      } else {
        alert(`${data.message}`);
      }
      if (data.message === "Order placed") {
        setOrderPlaced(true);
        
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
  return (
    <>
      <div className="max-w-full">
        <Header totalPrice={totalPrice} />  {/* Pass totalPrice to Header */}
      </div>
      <div className={classes.root}>
        <Box className={classes.container}>
          <Typography variant="h5" className={classes.header}>
            Checkout
          </Typography>
          <TextField
            label="Name"
            name="name"
            value={userDetails.name}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
            size="small"
            fullWidth
          />
          <TextField
            label="Address"
            name="address"
            value={userDetails.address}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            size="small"
            fullWidth
          />
          <button onClick={handleOrder} className={classes.button}>
            Place Order
          </button>
          {orderPlaced && (
            <Typography className={classes.alert}>
              Order placed successfully!
            </Typography>
          )}
        </Box>
      </div>
    </>
  );
};

export default Checkout;
