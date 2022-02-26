import {FC, MouseEventHandler } from 'react';

/* STYLES */
import styles from './Card.module.css'

/* EXTERNAL LIBRARIES */
import {AiFillHeart, AiOutlineHeart, AiOutlineClockCircle} from 'react-icons/ai'
import moment from 'moment'

/* INTERFACES */
import { Hit } from '../../interfaces/INews';

interface Props {
	isFavorite: (id:string) => boolean
	handleLikes: (id:string) => MouseEventHandler<HTMLDivElement> | undefined | void
	hit: Hit
}

const Card: FC<Props> = ({hit, handleLikes, isFavorite}) => {
	const _handleURLclick = (url:string|undefined) => {
		url && window.open(url, '_blank')
	}

	const _formatDate = (date:string) => (
		moment(date, "YYYYMMDD").fromNow()
	)
	
	return (
		<article className={styles.card}>
			<div className={styles.cardBody} onClick={() => _handleURLclick(hit.story_url)} >
				<span className={styles.cardDate}>
					<AiOutlineClockCircle size={15} />
					<span>
					{_formatDate(hit.created_at)} by {hit.author}
					</span>
				</span>
				<p className={styles.cardStory}>{hit.story_title}</p>
			</div>
			<div className={styles.cardLikeContainer} onClick={() => handleLikes(hit.objectID)}>
				{
					isFavorite(hit.objectID)
						? <AiFillHeart size={24} color="red"/>
						: <AiOutlineHeart size={24} color="red"/>
				}
			</div>
		</article>
	)
}
export default Card