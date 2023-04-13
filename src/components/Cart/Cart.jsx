import React, { useState } from "react";
import { useCartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import ItemCart from "../ItemCart/ItemCart";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const Cart = () => {
	const { cart, totalPrice } = useCartContext();
	const [buyerInfo, setBuyerInfo] = useState({
		firstName: "",
		lastName: "",
		phone: "",
		email: "",
		confirmEmail: "",
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setBuyerInfo({ ...buyerInfo, [name]: value });
	};

	const canSubmit =
		buyerInfo.firstName &&
		buyerInfo.lastName &&
		buyerInfo.phone &&
		buyerInfo.email &&
		buyerInfo.confirmEmail &&
		buyerInfo.email === buyerInfo.confirmEmail;

	const order = {
		buyer: {
			name: buyerInfo.firstName + " " + buyerInfo.lastName,
			email: buyerInfo.email,
			phone: buyerInfo.phone,
		},
		items: cart.map((product) => ({
			id: product.id,
			title: product.title,
			price: product.price,
			quantity: product.quantity,
		})),
		total: totalPrice(),
	};

	const handleClick = () => {
		const confirmed = window.confirm("Would you like to confirm your purchase?");
		if (confirmed) {
			const db= getFirestore();
			const ordersCollection = collection(db, "orders");
			addDoc(ordersCollection, order)
				.then(({id}) => {
					console.log(id);
					alert(`Your order has been processed! Order number: ${id}`);
					window.location.href = '/';
				})
				.catch(error => {
					console.error("Error adding document: ", error);
					alert("An error occurred while processing the order. Please try again.");
				});
		}
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
			<p>Total: ${totalPrice()}</p>

			<form>
				<div>
					<label htmlFor="firstName">First Name:</label>
					<input
						type="text"
						id="firstName"
						name="firstName"
						value={buyerInfo.firstName}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label htmlFor="lastName">Last Name:</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						value={buyerInfo.lastName}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label htmlFor="phone">Phone:</label>
					<input
						type="text"
						id="phone"
						name="phone"
						value={buyerInfo.phone}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						name="email"
						value={buyerInfo.email}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label htmlFor="confirmEmail">Confirm Email:</label>
					<input
						type="email"
						id="confirmEmail"
						name="confirmEmail"
						value={buyerInfo.confirmEmail}
						onChange={handleInputChange}
					/>
				</div>
			</form>

			<button disabled={!canSubmit} onClick={handleClick}>
				Buy cart
			</button>
		</>
	);
};

export default Cart;
