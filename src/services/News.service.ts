import axios from "./Base.service";
import { INews } from "../interfaces/INews"
import { AxiosResponse } from "axios";


export const GetNews = async(query:string = "angular", page:number = 0): Promise<AxiosResponse<INews>> => {
	const params = { query, page }
	return await axios.get("search_by_date",{params})
}