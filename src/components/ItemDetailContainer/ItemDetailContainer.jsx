import { doc, getDoc, getFirestore } from "firebase/firestore";
import styles from "./itemDetailContainer.module.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useCartContext } from "../../context/CartContext";
import ItemCount from "../ItemCount/ItemCount";

const override = {
	display: "block",
	margin: "auto",
	borderColor: "rgba(80, 77, 233, 1)",
};

export const ItemDetailContainer = ({ data }) => {
	const [loading, setLoading] = useState(true);
	let [color, setColor] = useState("#ffffff");
	const [product, setProduct] = useState({});
	const { id } = useParams();
	const [selectedProduct, setSelectedProduct] = useState({});

	const [goToCart, setGotoCart] = useState(false);
	const { addProduct } = useCartContext();

	useEffect(() => {
		const queryDb = getFirestore();
		const queryDoc = doc(queryDb, "items", id);
		getDoc(queryDoc)
			.then((res) => setProduct({ id: res.id, ...res.data() }))
			.then(() => setLoading(false));
	}, []);

	const onAdd = (quantity) => {
		setGotoCart(true);
		addProduct(product, quantity);
	};

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
					<div className={styles.cards}>
						<h3 className={styles.title}>{product.title}</h3>
						<img
							className={styles.img}
							src={product.image}
							alt={product.title}
						/>
						<h4 className={styles.precio}>${product.price}</h4>
						<div className={styles.description}>
							<p>{product.description}</p>
						</div>
						{goToCart ? (
							<>
								<Link to="/cart" className={styles.btn}>
									<button className={styles.buttonCart}>Go to Cart</button>
								</Link>
								<Link to="/" className={styles.btn}>
									<button className={styles.buttonStore}>
										Continue Shopping
									</button>
								</Link>
							</>
						) : (
							<ItemCount initial={1} stock={7} onAdd={onAdd} />
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default ItemDetailContainer;
