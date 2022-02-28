/* UTILS */
import { getFromLocalStorage, setToLocalStorage } from '../helpers/localStorage.utils';

export const useLocalStorage = (name:string, value?:any) => {

	if(name && value) {
		setToLocalStorage(name, value)
		return;
	}

	return getFromLocalStorage(name)
}