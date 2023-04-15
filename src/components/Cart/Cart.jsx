import React, { useState } from "react";
import { useCartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import ItemCart from "../ItemCart/ItemCart";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import styles from "./cart.module.css";
import Swal from "sweetalert2";

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
		Swal.fire({
			title: "Order confirmation",
			text: "Would you like to confirm your purchase?",
			icon: "question",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Buy it!",
		}).then((result) => {
			if (result.isConfirmed) {
				const db = getFirestore();
				const ordersCollection = collection(db, "orders");
				addDoc(ordersCollection, order)
					.then(({ id }) => {
						Swal.fire({
							title: "Successful!",
							text: `Your order has been processed! Order number: ${id}`,
							icon: "success",
							confirmButtonText: "Ok",
						}).then(() => {
							window.location.href = "/";
						});
					})
					.catch((error) => {
						console.error("Error adding document: ", error);
						alert(
							"An error occurred while processing the order. Please try again."
						);
					});
			}
		});
	};

	if (cart.length === 0) {
		return (
			<>
				<p className={styles.advice}>Oops! The Cart Is Empty!</p>
				<Link className={styles.btnStore} to="/">
					Go to store
				</Link>
			</>
		);
	}

	return (
		<>
			{cart.map((item) => (
				<ItemCart key={item.id} item={item} />
			))}
			<p className={styles.totalPrice}>Total: ${totalPrice().toFixed(2)}</p>

			<form className={styles.form}>
				<div>
					<label className={styles.label} htmlFor="firstName">
						First Name:
					</label>
					<input
						className={styles.imput}
						type="text"
						id="firstName"
						name="firstName"
						value={buyerInfo.firstName}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label className={styles.label} htmlFor="lastName">
						Last Name:
					</label>
					<input
						className={styles.imput}
						type="text"
						id="lastName"
						name="lastName"
						value={buyerInfo.lastName}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label className={styles.label} htmlFor="phone">
						Phone:
					</label>
					<input
						className={styles.imput}
						type="text"
						id="phone"
						name="phone"
						value={buyerInfo.phone}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label className={styles.label} htmlFor="email">
						Email:
					</label>
					<input
						className={styles.imput}
						type="email"
						id="email"
						name="email"
						value={buyerInfo.email}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label className={styles.label} htmlFor="confirmEmail">
						Confirm Email:
					</label>
					<input
						className={styles.imput}
						type="email"
						id="confirmEmail"
						name="confirmEmail"
						value={buyerInfo.confirmEmail}
						onChange={handleInputChange}
					/>
				</div>
			</form>

			<button
				className={styles.btnBuy}
				disabled={!canSubmit}
				onClick={handleClick}
			>
				Buy cart
			</button>
		</>
	);
};

export default Cart;
