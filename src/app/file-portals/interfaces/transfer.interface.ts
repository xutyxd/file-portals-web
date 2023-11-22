
export interface ITransfer {
    uuid: string,
    name: string, 
    size: number,
    started: number,
    ended?: number,
    transferred: number
};