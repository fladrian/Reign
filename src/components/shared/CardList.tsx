import {FC, MouseEventHandler } from 'react';

/* STYLES */
import styles from './Card.module.css'

/* INTERFACES */
import { Hit } from '../../interfaces/INews';

/* UI COMPONENTS */
import Card from './Card'

interface Props {
	isFavorite: (id:string) => boolean
	handleLikes: (id:string) => MouseEventHandler<HTMLDivElement> | undefined | void
	news: Hit[]
}

const CardList: FC<Props> = ({news, isFavorite, handleLikes}) => {
	return (
		<div className={styles.cardsContainer}>
			{news?.map((item: Hit, idx: number) => (
				<Card
					key={idx}
					hit={item}
					isFavorite={isFavorite}
					handleLikes={handleLikes} />
			))}
		</div>
	)
}

export default CardList