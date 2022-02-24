import { useState, useEffect } from 'react'
import './App.css'

/* SERVICE */
import { GetNews } from './services/News.service';

/* INTERFACES */
import { Hit } from './interfaces/INews';


function App() {
  const [news, setNews] = useState<Hit[]>([])
  const [fav, setFav] = useState<Hit[]>([])
  const [topic, setTopic] = useState<string>()
  const topics:string[] = ["angular", "react", "vue"]

  const _getNews = async (topic?:string, page?:number) => {
    const {data:{hits}} = await GetNews(topic, page)
    setNews(hits)
  }

  const _addToFav = (id:string) => {
    const favoriteArray = [...fav]
    const newFavorite = news!.find(item => item.objectID === id)
    favoriteArray.push(newFavorite as Hit)
    setFav(favoriteArray)
  }

  const _isFav = (id:string) => fav.some(item => item.objectID === id)

  const _removeToFav = (id:string) => setFav(fav.filter(item => item.objectID !== id))

  const _handleLikes = (id:string) => _isFav(id) ? _removeToFav(id) : _addToFav(id)

  const _handleTopic = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setTopic(event.target.value)
  }

  useEffect(()=>{ _getNews(topic) },[topic])

  const SelectTopic = () => (
    <select value={topic} onChange={_handleTopic}>
      {topics.map((topic:string)=>(
        <option value={topic}>{topic}</option>
      ))}
    </select>
  )

  return (
    <div className="App">
      <header>
        <h1 style={{
            width: "208px",
            height: "28px",
            fontFamily: "Baskerville",
            fontSize: "28px",
            fontWeight: "normal",
            fontStyle: "normal",
            lineHeight: 1,
            letterSpacing: "normal",
            color: "#3b3b3b",
        }} >Hacker News</h1>
      </header>
      <SelectTopic />
      <ul>
        {news?.map((item: Hit, idx: number) => (
          <li key={idx}>
            <a href={item.story_url} target="_blank">
            {item.author}
            </a>
            <button
            onClick={() => _handleLikes(item.objectID)}>
              {_isFav(item.objectID) ? "Remove fav" : "add fav"}</button>
            </li>

        ))}
      </ul>

      <hr />
      <h2>Favorites</h2>
      <ul>
        {fav?.map((item: Hit, idx: number) => (
          <li key={idx}>
            <a href={item.story_url} target="_blank">
            {item.author}
            </a>
            <button onClick={() => _addToFav(item.objectID)}>add fav</button>
            </li>

        ))}
      </ul>
    </div>
  )
}

export default App
function value(value: any) {
  throw new Error('Function not implemented.');
}

