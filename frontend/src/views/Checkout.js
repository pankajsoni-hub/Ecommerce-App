import React, { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import RazorpayCheckout from "../components/RazorpayCheckout";

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
  const location = useLocation();
  const { cartItems } = location.state || { cartItems: [] };
  const classes = useStyles();

  // Calculate total price of items in the cart
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, products: cartItems, [e.target.name]: e.target.value });
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
          <RazorpayCheckout data={userDetails}totalPrice={totalPrice}/>
        </Box>
      </div>
    </>
  );
};

export default Checkout;
