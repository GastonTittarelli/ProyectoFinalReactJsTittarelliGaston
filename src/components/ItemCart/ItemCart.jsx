import React from "react";
import styles from "./itemCart.module.css";
import { useCartContext } from "../../context/CartContext";


export const ItemCart = ({item}) => {
	const {removeProduct} = useCartContext();
	return (
		<div className={styles.itemCart}>
			<img src={item.image} alt={item.title} />
			<div>
				<p>Título: {item.title}</p>
				<p>Cantidad: {item.quantity}</p>
				<p>Precio u.: {item.price}</p>
				<p>Subtotal: ${item.quantity * item.price} </p>
				<button onClick={() => removeProduct(item.id)}>Eliminar</button>
			</div>
		</div>
	);
};

export default ItemCart;