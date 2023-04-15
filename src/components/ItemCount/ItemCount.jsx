import styles from "./itemCount.module.css";
import React, { useState, useEffect } from "react";

export const ItemCount = ({ initial, stock, onAdd }) => {
	const [count, setCount] = useState(parseInt(initial));

	const decrease = () => {
		setCount(count - 1);
	};

	const increase = () => {
		setCount(count + 1);
	};

	useEffect(() => {
		setCount(parseInt(initial));
	}, [initial]);

	return (
		<div className={styles.counter}>
			<button
				className={styles.buttonsCount}
				disabled={count <= 1}
				onClick={decrease}
			>
				-
			</button>
			<span className={styles.Nspan}>{count}</span>
			<button
				className={styles.buttonsCount}
				disabled={count >= stock}
				onClick={increase}
			>
				+
			</button>
			<div className={styles.containerBtnAdd}>
				<button
					className={styles.buttonsAdd}
					disabled={stock <= 0}
					onClick={() => onAdd(count)}
				>
					Add to cart
				</button>
			</div>
		</div>
	);
};

export default ItemCount;
