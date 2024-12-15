import React from "react";
import NavBar from "./Navbar";

const Header = (totalPrice) => {
	return (
		<header>
			<div className="bg-gray-100">
				<NavBar totalPrice={totalPrice} />
			</div>
		</header>
	);
};

export default Header;