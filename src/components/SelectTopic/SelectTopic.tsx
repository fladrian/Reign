import { Dispatch, SetStateAction, FC } from 'react';

/* STYLE */
import styles from './SelectTopic.module.css'

/* EXTERNAL LIBRARIES */
import Select from 'react-select';

/* INTERFACSE */
import { ITopic } from '../../interfaces/ITopics';

/* HOOKS */
import { useLocalStorage } from '../../hooks/useLocalStorage';

/* ENUMS */
import { LocalStorageItems } from '../../constants/Enums';

interface Props {
	topics: ITopic[]
	topic: string
	setTopic: Dispatch<SetStateAction<string>>
	setPage: Dispatch<SetStateAction<number>>
	getNews: (topic:string, page:number) => {}
}

const SelectTopic: FC<Props> = ({setTopic, topic, topics, setPage, getNews}) => {
	// Handle topic local to set values if the topic change
	const _handleTopic = (event:any) => {
		setPage(1)
    setTopic(event.value);
    getNews(event.value, 0)
		useLocalStorage(LocalStorageItems.TOPIC, event.value)
	}
	// Return the current topic from parent state
	const _getCurrentTopic = (topicValue:string) => {
		return topics.find((topic:ITopic) => topic.value === topicValue )
	}
	
	return (
		<section className={styles.selectContainer}>
			<Select
				defaultValue={_getCurrentTopic(topic)}
				options={topics as any} // casting as any for typescript issues 
				onChange={_handleTopic}
				className={styles.select}
      />
		</section>
	)
}
export default SelectTopic