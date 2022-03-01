import { FC } from 'react'

import styles from './Header.module.css'

import logoHacker from '../../hacker-news.png'
const Header: FC = () => (
		<header className={styles.header}>
			<img src={logoHacker} alt="hacker news" />
		</header>
)

export default Header