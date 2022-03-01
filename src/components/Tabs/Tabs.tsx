import { Dispatch, SetStateAction } from 'react';

/* STYLES */
import styles from './Tabs.module.css'

/* ENUMS */
import { Tab } from '../../constants/Enums';

interface Props {
	setTab: Dispatch<SetStateAction<string>>
	tab: string
}

const Tabs: React.FC<Props> = ({setTab, tab}) => {
	
	const _handleTab = (tab:string) => {
		setTab(tab)
	}

	return (
		<div className={styles.tabs}>
				<span
					className={`${styles.tab} ${ tab === Tab.ALL && styles.isActive}`}
					onClick={() => _handleTab(Tab.ALL)}>All</span>

				<span
					className={`${styles.tab} ${ tab === Tab.FAV && styles.isActive}`}
					onClick={() => _handleTab(Tab.FAV)}>My faves</span>
			</div>
	)
}

export default Tabs