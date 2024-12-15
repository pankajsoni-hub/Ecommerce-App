import React from "react";
import { makeStyles } from '@mui/styles';
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom"; // For navigation

const useStyles = makeStyles({
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#e6ccff", 
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  },
  iconWrapper: {
    width: "40px",
    height: "40px",
    backgroundColor: "#fff", 
    borderRadius: "50%", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 10px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    position: "relative", 
  },
  leftSide: {
    display: "flex",
    alignItems: "center",
  },
  toggleButton: {
    fontSize: "20px",
    background: "none",
    border: "none",
    cursor: "pointer",
    marginRight: "20px",
  },
  menu: {
    listStyle: "none",
    display: "flex",
    margin: 0,
    padding: 0,
  },
  menuItem: {
    margin: "0 15px",
    cursor: "pointer",
    color: "#333",
    fontSize: "16px",
  },
  rightSide: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    fontSize: "20px",
   
    cursor: "pointer",
    color: "#333",
  },
totalAmount: {
  fontWeight: "bold",
  color: "#800080",
  fontSize: "18px",
  marginLeft: "8px", 
  whiteSpace: "nowrap", 
  minWidth: "50px",
}
});

const NavBar = ({ totalPrice }) => {
  const classes = useStyles();
  const navigate = useNavigate(); 
  const handleCartClick = () => {
    navigate("/admin");
  };
  return (
    <nav className={classes.navbar}>
      <div className={classes.leftSide}>
        <ul className={classes.menu}>
          <li className={classes.menuItem}>Deals</li>
          <li className={classes.menuItem}>Shop</li>
          <li className={classes.menuItem}>Our Contacts</li>
          <li className={classes.menuItem}>Stores</li>
        </ul>
      </div>
      <div className={classes.rightSide}>
        <div className={classes.iconWrapper}>
          <PersonIcon className={classes.icon} titleAccess="Profile" />
        </div>
        <div className={classes.iconWrapper}>
          <FavoriteIcon className={classes.icon} titleAccess="Likes" />
        </div>
        <div className={classes.iconWrapper} onClick={handleCartClick}>
          <ShoppingCartIcon className={classes.icon} titleAccess="Cart" />
        </div>
        <div>
        <span className={classes.totalAmount}>
        {totalPrice.totalPrice > 0 ? `₹${totalPrice.totalPrice}` : "₹0"}
        </span>
      </div>
      </div>
    </nav>
  );
};

export default NavBar;
