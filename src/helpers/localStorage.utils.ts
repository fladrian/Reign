export const setToLocalStorage = (name:string, value:any) => {
	localStorage.setItem(name, JSON.stringify(value))
}

export const getFromLocalStorage = (name:string) => {
	const item = localStorage.getItem(name)
	return JSON.parse(item as string)
}