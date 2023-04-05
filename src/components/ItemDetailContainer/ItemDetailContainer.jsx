import styles from "./itemDetailContainer.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const override = {
	display: "block",
	margin: "auto",
	borderColor: "rgba(80, 77, 233, 1)",
};

const ItemDetailContainer = () => {
	const [product, setProduct] = useState({});
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	let [color, setColor] = useState("#ffffff");
	

	useEffect(() => {
		fetch(`https://fakestoreapi.com/products/${id}`)
			.then((res) => res.json())
			.then((data) => setProduct(data))
			.then(() => setLoading(false));
	}, []);

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
				</div>
			</div>
			)}
		</div>
	);
};

export default ItemDetailContainer;
