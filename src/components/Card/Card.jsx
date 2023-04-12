import { Link } from "react-router-dom";
import styles from "./card.module.css";

const Card = ({ product }) => {
	return (
		<Link to={`/item/${product.id}`} className={styles.cards}>
			<h3 className={styles.title}>{product.title}</h3>
			<img className={styles.img} src={product.image} alt={product.title} />
			<h4 className={styles.precio}>${product.price}</h4>
			<div className={styles.description}>
				<p>{product.description}</p>
			</div>
		</Link>
	);
};

export default Card;
