import { useState } from 'react';
/* STYLES */
import styles from './App.module.css';

/* IMPORTS FROM EXTERNAL LIBRARIES */
import { FaAngular, FaVuejs, FaReact } from 'react-icons/fa';

/* SERVICE */
import { GetNews } from './services/News.service';

/* INTERFACES */
import { Hit } from './interfaces/INews';
import { ITopic } from './interfaces/ITopics';

/* ENUMS */
import { Tab } from './constants/Enums';

/* UI COMPONENTS */
import Header from './components/Header/Header';
import Tabs from './components/Tabs/Tabs';
import SelectTopic from './components/SelectTopic/SelectTopic';
import All from './components/Tabs/All';
import Fav from './components/Tabs/Fav';

/* UTILS */
import { getFromLocalStorage, setToLocalStorage } from './helpers/localStorage.utils';

function App() {
	// functions to get favorites and news filter topic from localStorage
	const favsFromLocalStorage = getFromLocalStorage("favs")
	const topicFromLocalStorage = getFromLocalStorage("topic")

	// setStates to handle relevant data
	const [news, setNews] = useState<Hit[]>([]);
	const [fav, setFav] = useState<Hit[]>(favsFromLocalStorage ?? []);
	const [topic, setTopic] = useState<string>(topicFromLocalStorage ?? "angular");
	const [page, setPage] = useState<number>(0);
	const [tab, setTab] = useState<string>(Tab.ALL);

	// array of topics to fill the options in selectTopic with its how icons
	const topics: ITopic[] = [
		{
			value: 'angular',
			label: (
				<div className={styles.option}>
					<FaAngular size={24} color='#de3a33' />
					<span className={styles.optionLabel}>Angular</span>
				</div>
			),
		},
		{
			value: 'react',
			label: (
				<div className={styles.option}>
					<FaReact size={24} color='#61dafb' />
					<span className={styles.optionLabel}>React</span>
				</div>
			),
		},
		{
			value: 'vue',
			label: (
				<div className={styles.option}>
					<FaVuejs size={24} color='#42b883' />
					<span className={styles.optionLabel}>Vue</span>
				</div>
			),
		},
	];

	// remove all the objects that not contains [story_title, story_url, created_at]
	const _removeInvalidNews = (hits: Hit[]): Hit[] =>
		hits.filter(
			(hit: Hit) => hit.story_title && hit.story_url && hit.created_at,
	);

	// call to service to fill news
	const _getNews = async (topic?: string, page?: number) => {
		const {
			data: { hits },
		} = await GetNews(topic, page);

		const hitsValids = _removeInvalidNews(hits);

		setNews(hitsValids);
	};

	// handle the infiniteScrolling/pagination
	const _pagination = async () => {
		const {
			data: { hits },
		} = await GetNews(topic, page);

		const currentNews = [...news];
		const hitsValids = _removeInvalidNews(hits);
		setNews([...currentNews, ...hitsValids]);
		setPage(page + 1);
	};

	//from a id add a to the favorites array
	const _addToFav = (id: string) => {
			const favoriteArray = [...fav];
			const newFavorite = news!.find((item) => item.objectID === id);
			favoriteArray.push(newFavorite as Hit);
			setFav(favoriteArray);
			setToLocalStorage("favs", favoriteArray)
	};
	
	// remove a new from favorite
	const _removeToFav = (id: string) => {
		const favs = fav.filter((item) => item.objectID !== id) 
		setFav(favs);
		setToLocalStorage("favs", favs)
	}

	// check if an objects belongs to favorite by its id
	const _isFav = (id: string) => fav.some((item) => item.objectID === id);

	// if a topic is in favorites its removed and if it doesn't is added
	const _handleLikes = (id: string) => _isFav(id) ? _removeToFav(id) : _addToFav(id);

	return (
		<>
			<Header title='Hacker News' />

			<Tabs tab={tab} setTab={setTab} />

			<SelectTopic
				topics={topics}
				topic={topic}
				setTopic={setTopic}
				getNews={_getNews}
				setPage={setPage}
			/>

			<main className={styles.container}>
				{tab === Tab.ALL && (
					<All
						news={news}
						pagination={_pagination}
						handleLikes={_handleLikes}
						isFavorite={_isFav}
					/>
				)}

				{tab === Tab.FAV && (
					<Fav
						favs={fav}
						handleLikes={_handleLikes}
						isFavorite={_isFav} />
				)}
			</main>
		</>
	);
}

export default App;
