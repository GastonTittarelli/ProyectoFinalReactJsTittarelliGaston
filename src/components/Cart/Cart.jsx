import React from "react";
import styles from "./cart.module.css";
import { useCartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import ItemCart from "../ItemCart/ItemCart";
import { getFirestore, collection, addDoc } from "firebase/firestore";


const Cart = () => {
	const { cart, totalPrice } = useCartContext();

    const order = {
		buyer: {
			name: "Juan",
			email: "juan@gmail.com",
			address: "adsadassd"
		},
		items: cart.map(product => ({ id: product.id, title: product.title, price: product.price, quantity: product.quantity })),
		total: totalPrice(),
	}

	const handleClick = () => {
		const db= getFirestore();
		const ordersCollection = collection(db, "orders");
		addDoc(ordersCollection, order)
		.then(({id}) => console.log(id));
	}

	if (cart.length === 0) {
		return (
			<>
				<p>Empty cart!</p>
				<Link to="/">Go to store</Link>
			</>
		);
	}

	return (
		<>
			{cart.map((item) => (
				<ItemCart key={item.id} item={item} />
			))}
		<p>
			Total: ${totalPrice()}
		</p>
		<button onClick={handleClick}>Buy cart</button>
		</>
	);
};

export default Cart;
