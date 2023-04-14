import React from "react";
import { useCartContext } from "../../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import styles from "./cartWidget.module.css";

export const CartWidget = () => {
	const { totalProducts } = useCartContext();
	return (
		<>
			<FaShoppingCart className={styles.svg} />
			<span className={styles.number}>{totalProducts() || ""}</span>
		</>
	);
};

export default CartWidget;
