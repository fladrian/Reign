import { FC, MouseEventHandler } from 'react';

/* INTERFACES */
import { Hit } from '../../interfaces/INews';

/* UI COMPONENTS */
import CardList from '../shared/CardList';

interface Props {
	isFavorite: (id: string) => boolean;
	handleLikes: (id: string) => MouseEventHandler<HTMLDivElement> | undefined | void;
	favs: Hit[];
}

const Fav: FC<Props> = ({ isFavorite, handleLikes, favs }) => {
	return (
		<>
			<CardList
				news={favs}
				isFavorite={isFavorite}
				handleLikes={handleLikes} />
		</>
	)
}

export default Fav;
