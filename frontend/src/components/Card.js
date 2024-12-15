// CardComponent.js
import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Typography, Rating, Card, CardContent } from "@mui/material";

const useStyles = makeStyles(() => ({
  card: {
    maxWidth: 250,
    width: '100%',
    margin: 7, 
    borderRadius: '8px', 
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', 
  },
  media: {
    height: 251, 
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#800080",
    color: "#fff",
    width: '180px',
    height: 'auto',
    marginBottom: 0,
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
}));

const CardComponent = ({ id, name, description, image, price, rating, onAddToCart }) => {
  const classes = useStyles();
  
  return (
    <Card className={classes.card}>
      <img src={image} alt={name} className={classes.media} />
      <CardContent>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
          {description}
        </Typography>
        <Typography variant="body1" color="text.primary" sx={{ fontWeight: "bold", marginBottom: 1 }}>
          ${price.toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly precision={0.5} size="small" />
        <Box sx={{ marginTop: 2 }}>
          <button
            className={classes.button}
            onClick={() => onAddToCart({ id, name, description, image, price, rating })}
          >
            Add to Cart
          </button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
