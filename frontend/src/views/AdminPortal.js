import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom"; 
import Header from "../components/Header";
// Define styles using makeStyles
const useStyles = makeStyles(() => ({
  container: {
    padding: "24px",
  },
  header: {
    backgroundColor: "#e6ccff",
    color: "#4b0082",
    padding: "16px",
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: "8px",
    marginBottom: "40px",
  },
  cardList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "24px",
    marginTop:10,
    justifyContent: "space-between",
  },
  card: {
    flex: "1 1 calc(25% - 24px)",
    maxWidth: "280px",
    margin: "auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    borderRadius: "8px",
  },
  cardMedia: {
    height: "140px",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
  },
  cardContent: {
    padding: "16px",
  },
  itemName: {
    fontWeight: "bold",
    marginBottom: "8px",
  },
  itemDescription: {
    color: "#666",
    marginBottom: "12px",
  },
  itemPrice: {
    color: "#4caf50",
    fontWeight: "bold",
    marginBottom: "12px",
  },
  quantityControl: {
    display: "flex",
    alignItems: "center",
    marginTop: "12px",
    gap: "8px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px",
  },
  removeButton: {
    borderColor: "#f44336",
    color: "#f44336",
  },
  emptyCartMessage: {
    textAlign: "center",
    color: "#999",
    fontWeight: "bold",
    marginTop: "20px",
  },
  totalAmountContainer: {
    marginTop: "40px",
    padding: "16px",
    borderTop: "2px solid #4b0082",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
  },
  totalLabel: {
    fontWeight: "bold",
    fontSize: "20px",
    color: "#4b0082",
  },
  totalValue: {
    fontWeight: "bold",
    fontSize: "24px",
    color: "#4caf50",
  },
}));

const AdminPortal = ({ updateTotalAmount }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate(); 
  const classes = useStyles();

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
    localStorage.setItem("totalPrice", total);
    if (updateTotalAmount) updateTotalAmount(total);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cart");
        const data = await response.json();
        setCartItems(data);
        calculateTotalPrice(data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [updateTotalAmount]);
  const handleUpdateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      const updatedItem = await response.json();
      if (updatedItem) {
        const updatedCart = cartItems.map((item) =>
          item._id === id ? { ...item, quantity: updatedItem.quantity } : item
        );
        setCartItems(updatedCart);
        calculateTotalPrice(updatedCart);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.message === "Cart item removed successfully") {
        const updatedCart = cartItems.filter((item) => item._id !== id);
        setCartItems(updatedCart);
        calculateTotalPrice(updatedCart);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  useEffect(() => {
    const storedTotal = localStorage.getItem("totalPrice");
    if (storedTotal) {
      setTotalPrice(parseFloat(storedTotal));
    }
  }, []);
  return (
    <>
    <div className="max-w-full">
      <Header totalPrice={totalPrice}/>
    </div>
    <Box className={classes.container}>
      <Typography variant="h4" className={classes.header}>
        Admin Portal
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" className={classes.emptyCartMessage}>
          Your cart is empty.
        </Typography>
      ) : (
        <Box className={classes.cardList}>
          {cartItems.map((item) => (
            <Card key={item._id} className={classes.card}>
              <CardMedia
                component="img"
                className={classes.cardMedia}
                image={item.image}
                alt={item.name}
              />
              <CardContent className={classes.cardContent}>
                <Typography className={classes.itemName}>{item.name}</Typography>
                <Typography className={classes.itemDescription}>
                  {item.description}
                </Typography>
                <Typography className={classes.itemPrice}>
                  Price: ₹{item.price}
                </Typography>
                <Box className={classes.quantityControl}>
                  <Button
                    onClick={() =>
                      handleUpdateQuantity(item._id, Math.max(1, item.quantity - 1))
                    }
                    variant="outlined"
                    size="small"
                  >
                    -
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                    variant="outlined"
                    size="small"
                  >
                    +
                  </Button>
                </Box>
                <Box className={classes.buttonGroup}>
                  <Button
                    variant="outlined"
                    className={classes.removeButton}
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    Remove
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {cartItems.length > 0 && (
        <>
        <Box className={classes.totalAmountContainer}>
          <Typography className={classes.totalLabel}>Total Amount:</Typography>
          <Typography className={classes.totalValue}>₹{totalPrice}</Typography>
        </Box>
        <Button
  variant="contained"
  color="secondary"
  onClick={() => navigate('/checkout', { state: { cartItems } })}
>
  Proceed to Checkout
</Button>

</>
      )}
    </Box>
    </>
  );
};

export default AdminPortal;
