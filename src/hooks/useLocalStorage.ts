/* UTILS */
import { getFromLocalStorage, setToLocalStorage } from '../utils/localStorage.utils';

export const useLocalStorage = (name:string, value?:any) => {

	if(name && value) {
		setToLocalStorage(name, value)
		return;
	}

	return getFromLocalStorage(name)
}