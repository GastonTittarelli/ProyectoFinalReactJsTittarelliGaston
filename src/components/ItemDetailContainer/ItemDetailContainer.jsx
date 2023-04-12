import { collection, doc, getDoc, getFirestore, addDoc } from "firebase/firestore";
import styles from "./itemDetailContainer.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useCartContext } from "../../context/CartContext";
import ItemCount from "../ItemCount/ItemCount";

const override = {
	display: "block",
	margin: "auto",
	borderColor: "rgba(80, 77, 233, 1)",
};

const ItemDetailContainer = () => {
	const [loading, setLoading] = useState(true);
	let [color, setColor] = useState("#ffffff");
	const [product, setProduct] = useState({});
	const { id } = useParams();
	const [selectedProduct, setSelectedProduct] = useState({});

	const [goToCart, setGotoCart ] = useState(false);
	const {addProduct} = useCartContext();
	

	
	useEffect(() => {
		const queryDb = getFirestore();
		const queryDoc = doc(queryDb, "items", id);
		getDoc(queryDoc)
		.then(res => setProduct ({id: res.id, ...res.data()}))
		.then(() => setLoading(false));
	}, []);


	const onAdd = (quantity) => {
		console.log(`compraste ${quantity} unidades`);
	}

	// const deleteFromCart = async () => {
	// 	try {
	// 		const db = getFirestore();
	// 		await addDoc(collection(db, "cart"), selectedProduct);
	// 		alert("Product eliminated to cart successfully!");
	// 	} catch (error) {
	// 		console.error("Error: ", error);
	// 	}
	// }


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
					<img className={styles.img} src={product.image} alt={product.title} />
					<h4 className={styles.precio}>${product.price}</h4>
					<div className={styles.description}>
						<p>{product.description}</p>
					</div>
					<ItemCount initial={1} stock={7} onAdd={onAdd}/>
				</div>
				
			</div>
			)}
		</div>
	);
};

export default ItemDetailContainer;
