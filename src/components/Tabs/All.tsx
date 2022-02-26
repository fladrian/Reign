import { FC, MouseEventHandler } from 'react';

/* STYLES */
import styles from './Tabs.module.css'

/* EXTERNAL LIBRARIES */
import InfiniteScroll from 'react-infinite-scroller';

/* INTERFACES */
import { Hit } from '../../interfaces/INews';

/* UI COMPONENTS */
import CardList from '../shared/CardList'
import Loader from '../shared/Loader'

interface Props {
	pagination: () => {}
	isFavorite: (id:string) => boolean
	handleLikes: (id:string) => MouseEventHandler<HTMLDivElement> | undefined | void
	news: Hit[]

}

const All:FC<Props> = ({pagination, isFavorite, handleLikes, news}) => {

	return (
		<>
		<InfiniteScroll
			pageStart={0}
			loadMore={() => pagination()}
			hasMore={true || false}
			loader={<div className={styles.loaderContainer} key={0}>
			<Loader />
		</div>}>
				<CardList
					news={news}
					isFavorite={isFavorite}
					handleLikes={handleLikes}/>
		</InfiniteScroll>
		
		</>
	)
}
export default All