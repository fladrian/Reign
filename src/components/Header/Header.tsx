import {FC} from 'react'

import styles from './Header.module.css'

const Header: FC = () => (
		<header className={styles.header}>
			<img src="/src/hacker-news.png" alt="hacker news" />
		</header>
)

export default Header