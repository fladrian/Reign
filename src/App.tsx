import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import './App.css';

/* SERVICE */
import { GetNews } from './services/News.service';

/* INTERFACES */
import { Hit } from './interfaces/INews';

/* ENUMS */
import { Tab } from './constants/Enums';

function App() {
	const [news, setNews] = useState<Hit[]>([]);
	const [fav, setFav] = useState<Hit[]>([]);
	const [topic, setTopic] = useState<string>();
	const topics: string[] = ['angular', 'react', 'vue'];
	const [page, setPage] = useState<number>(0);
	const [tab, setTab] = useState<string>(Tab.ALL);

	const _getNews = async (topic?: string, page?: number) => {
		const {
			data: { hits },
		} = await GetNews(topic, page);
		setNews(hits);
	};

	const _pagination = async () => {
    console.info("pagination scroll", page)
		const {
      data: { hits },
		} = await GetNews(topic, page);
		const currentNews = [...news];
		setNews([...currentNews, ...hits]);
    setPage(page+1)
	};

	const _addToFav = (id: string) => {
		const favoriteArray = [...fav];
		const newFavorite = news!.find((item) => item.objectID === id);
		favoriteArray.push(newFavorite as Hit);
		setFav(favoriteArray);
	};

	const _isFav = (id: string) => fav.some((item) => item.objectID === id);

	const _removeToFav = (id: string) =>
		setFav(fav.filter((item) => item.objectID !== id));

	const _handleLikes = (id: string) =>
		_isFav(id) ? _removeToFav(id) : _addToFav(id);

	const _handleTopic = (event: React.ChangeEvent<HTMLSelectElement>): void => {
		setTopic(event.target.value);
	};

	useEffect(() => {
		_getNews(topic, page);
    console.info('im executing')
	}, [topic]);

	const _handleTab = (tab: string) => setTab(tab);

	const SelectTopic = () => (
		<select value={topic} onChange={_handleTopic}>
			{topics.map((topic: string) => (
				<option value={topic}>{topic}</option>
			))}
		</select>
	);

	const Tabs = () => {
		return (
			<div>
				<span onClick={() => _handleTab(Tab.ALL)}>All</span>
				<span onClick={() => _handleTab(Tab.FAV)}>Fav</span>
			</div>
		);
	};

	const All = () => (
		<>
			<h3>All</h3>
			<InfiniteScroll
				pageStart={0}
				loadMore={() => _pagination()}
				hasMore={true || false}
				loader={
					<div className='loader' key={0}>
						Loading ...
					</div>
				}>
				<ul>
					{news?.map((item: Hit, idx: number) => (
						<li key={idx}>
							<a href={item.story_url} target='_blank'>
								{item.author}
							</a>
							<button onClick={() => _handleLikes(item.objectID)}>
								{_isFav(item.objectID) ? 'Remove fav' : 'add fav'}
							</button>
						</li>
					))}
				</ul>
			</InfiniteScroll>
		</>
	);

	const Fav = () => (
		<>
			<h3>Favorites</h3>
			<ul>
				{fav?.map((item: Hit, idx: number) => (
					<li key={idx}>
						<a href={item.story_url} target='_blank'>
							{item.author}
						</a>
						<button onClick={() => _addToFav(item.objectID)}>add fav</button>
					</li>
				))}
			</ul>
		</>
	);

	return (
		<div className='App'>
			<header>
				<h1
					style={{
						width: '208px',
						height: '28px',
						fontFamily: 'Libre Baskerville',
						fontSize: '28px',
						fontWeight: 'normal',
						fontStyle: 'normal',
						lineHeight: 1,
						letterSpacing: 'normal',
						color: '#3b3b3b',
					}}>
					Hacker News
				</h1>
			</header>
			<Tabs />
			<SelectTopic />
			<hr />
			{tab === Tab.ALL && <All />}
			{tab === Tab.FAV && <Fav />}
		</div>
	);
}

export default App;
