import { IError } from "../../models/Error";
import { INeighborhoodReport, INeighborhoodDetailed, IReportsData } from "../../models/neighborhoods/neighborhood";

export interface INeighborhoodsState {
    detailedList: _.Dictionary<INeighborhoodDetailed> | null,
    ngReports: IReportsData | null,
    allReports: _.Dictionary<INeighborhoodReport> | null,
    fetchError: IError | null,
}

export const initialNeighborhoodsState: INeighborhoodsState = {
    detailedList: null,
    ngReports: null,
    allReports: null,
    fetchError: null
}
