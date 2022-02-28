import {FC} from 'react'

import styles from './Header.module.css'

interface Props {
	title: string
}

const Header: FC<Props> = ({title}) => (
		<header className={styles.header}>
			<h1>{title}</h1>
		</header>
)

export default Header