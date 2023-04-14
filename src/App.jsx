import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import { Route, Routes } from "react-router-dom";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import Cart from "./components/Cart/Cart";
import React from "react";
import CartProvider from "./context/CartContext";

function App() {
	return (
		<div>
			<CartProvider>
				<NavBar />
				<Routes>
					<Route path="/" element={<ItemListContainer />} />
					<Route path="category/:category" element={<ItemListContainer />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/checkout" element={<Cart />} />
					<Route path="item/:id" element={<ItemDetailContainer />} />
					<Route path="*" element={<h2>¡Oops! Page not found!</h2>} />
				</Routes>
			</CartProvider>
		</div>
	);
}

export default App;
