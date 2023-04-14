import React, { useState, useContext } from "react";
const CartContext = React.createContext([]);

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);

	const addProduct = (item, newQuantity) => {
		const newCart = cart.filter((cartItem) => cartItem.id !== item.id);
		newCart.push({ ...item, quantity: newQuantity });
		setCart(newCart);
	};

	const totalPrice = () => {
		return cart.reduce((prev, act) => prev + act.quantity * act.price, 0);
	};

	const totalProducts = () =>
		cart.reduce(
			(acumulator, productoActual) => acumulator + productoActual.quantity,
			0
		);

	const clearCart = () => setCart([]);

	const isInCart = (id) => (cart.find((item) => item.id === id) ? true : false);

	const removeProduct = (id) => setCart(cart.filter((item) => item.id !== id));

	return (
		<CartContext.Provider
			value={{
				clearCart,
				isInCart,
				removeProduct,
				addProduct,
				totalPrice,
				totalProducts,
				cart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;
