import React from "react";
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
	footer: {
	 width:'100%',
	 backgroundColor:"#800080",
	 color:'white',
	 textAlign:'center',
	 padding:'20px 0px'
	},
  }));
  
const Footer = () => {
	const classes = useStyles();
	return (
		<div className={classes.footer}>
			<p>
			Copyright © ShopingWebsite.com All Rights Reserved.
			</p>
		</div>
	);
};

export default Footer;