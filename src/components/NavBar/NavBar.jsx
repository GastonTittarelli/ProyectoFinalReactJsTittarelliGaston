import { Link } from "react-router-dom";
import styles from "./navBar.module.css";
import { FaShoppingCart } from "react-icons/fa";

const NavBar = () => {
	return (
		<nav className={styles.container}>
			<Link to="/">
				<img
					className={styles.logo}
					href=""
					src="/img/DLogo.png"
					alt="logo Distribuidora Tittarelli"
				/>
			</Link>
			<Link to="/">
				<h3 className={styles.titulo}>Glamour Attic</h3>
			</Link>
			<div className={styles.anContainer}>
				<Link to="/category/men's clothing">
					<p className={styles.anchors} href="">
					Men's Clothing
					</p>
				</Link>
				<Link to="/category/jewelery">
					<p className={styles.anchors}>Jewelry</p>
				</Link>
				<Link to="/category/electronics">
					<p className={styles.anchors}>Electronics</p>
				</Link>
			</div>
			<Link to="/carrito">
				<FaShoppingCart className={styles.svg} />
			</Link>
		</nav>
	);
};

export default NavBar;
