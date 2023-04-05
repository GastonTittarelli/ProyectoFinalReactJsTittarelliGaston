import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import { Navigate, Route, Routes } from "react-router-dom";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";

function App() {
	return (
		<div>
			<NavBar />
			<Routes>
				<Route path="/" element={<Navigate to="category/item" />} />
				<Route path="category/:category" element={<ItemListContainer />} />
				<Route
					path="/carrito"
					element={<h2>¡Oops! Tu carrito esta vacío!</h2>}
				/>
				<Route path="category/item/:id" element={<ItemDetailContainer />} />
				<Route path="*" element={<h2>¡Oops! Página no encontrada!</h2>} />
			</Routes>
		</div>
	);
}

export default App;
