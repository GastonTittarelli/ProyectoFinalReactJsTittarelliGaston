import { Link } from "react-router-dom";
import styles from "./navBar.module.css";
import CartWidget from "../CartWidget/CartWidget";

const NavBar = () => {
	return (
		<nav className={styles.container}>
			<Link to="/">
				<img
					className={styles.logo}
					href=""
					src="/img/logo1png.png"
					alt="Glamour Attic logo"
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
			<Link to="/cart">
				<CartWidget />
			</Link>
		</nav>
	);
};

export default NavBar;
