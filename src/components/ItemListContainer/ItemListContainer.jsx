import Card from "../Card/Card";
import styles from "./itemListContainer.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
	display: "block",
	margin: "auto",
	borderColor: "rgba(80, 77, 233, 1)",
};

const ItemListContainer = () => {
	const [products, setProduct] = useState([]);
	const { category } = useParams();
	const [loading, setLoading] = useState(true);
	let [color, setColor] = useState("#ffffff");

	useEffect(() => {
		if (category !== "item") {
			fetch(`https://fakestoreapi.com/products/category/${category}`)
				.then((res) => res.json())
				.then((data) => setProduct(data))
				.then(() => setLoading(false));
		} else {
			fetch("https://fakestoreapi.com/products")
				.then((res) => res.json())
				.then((data) => setProduct(data))
				.then(() => setLoading(false));
		}
	}, [category]);


	return (
		<div>
			{loading ? (
				<ClipLoader
					color={color}
					loading={loading}
					cssOverride={override}
					size={150}
					aria-label="Loading Spinner"
					data-testid="loader"
				/>
			) : (
				<div className={styles.container}>
					{products.map((product) => (
						<Card key={product.id} product={product} />
					))}
				</div>
			)}
		</div>
	);
};

export default ItemListContainer;
