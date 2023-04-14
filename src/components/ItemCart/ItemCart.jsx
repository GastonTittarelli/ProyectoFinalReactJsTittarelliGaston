import React from "react";
import styles from "./itemCart.module.css";
import { useCartContext } from "../../context/CartContext";

export const ItemCart = ({ item }) => {
	const { removeProduct } = useCartContext();
	return (
		<div className={styles.itemCart}>
			<img src={item.image} alt={item.title} />
			<div className={styles.itemDetail}>
				<p className={styles.title}>{item.title}</p>
				<p>Quantity: {item.quantity}</p>
				<p>Price: ${item.price}</p>
				<p>Subtotal: ${item.quantity * item.price} </p>
				<button
					className={styles.btnDelete}
					onClick={() => removeProduct(item.id)}
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default ItemCart;
