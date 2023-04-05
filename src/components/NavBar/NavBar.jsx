import { Link } from "react-router-dom";
import styles from "./navBar.module.css";
import { FaShoppingCart } from "react-icons/fa";

const NavBar = () => {
	return (
		<nav className={styles.container}>
			<Link to="/category/item">
				<img
					className={styles.logo}
					href=""
					src="/img/DLogo.png"
					alt="logo Distribuidora Tittarelli"
				/>
			</Link>
			<Link to="/category/item">
				<h3 className={styles.titulo}>Distribuidora Tiitarelli</h3>
			</Link>
			<div className={styles.anContainer}>
				<Link to="/category/men's clothing">
					<p className={styles.anchors} href="">
						Ropa de Hombre
					</p>
				</Link>
				<Link to="/category/jewelery">
					<p className={styles.anchors}>Joyería</p>
				</Link>
				<Link to="/category/electronics">
					<p className={styles.anchors}>Electrónica</p>
				</Link>
			</div>
			<Link to="/carrito">
				<FaShoppingCart className={styles.svg} />
			</Link>
		</nav>
	);
};

export default NavBar;
