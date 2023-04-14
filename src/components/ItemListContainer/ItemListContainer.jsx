import Card from "../Card/Card";
import styles from "./itemListContainer.module.css";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import db from "../../../db/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import React from "react";

const override = {
	display: "block",
	margin: "auto",
	borderColor: "rgba(80, 77, 233, 1)",
};

const ItemListContainer = () => {
	const [products, setProducts] = useState([]);
	const { category } = useParams();
	const [loading, setLoading] = useState(true);
	let [color, setColor] = useState("#ffffff");
	const itemsRef = collection(db, "items");

	const getProducts = async () => {
		let q = collection(db, "items");
		if (category) {
			q = query(q, where("category", "==", category));
		}
		const itemsCollection = await getDocs(q);
		const items = itemsCollection.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}));
		setProducts(items);
		setLoading(false);
	};

	useEffect(() => {
		getProducts();
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
