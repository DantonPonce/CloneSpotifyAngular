import { IMusic } from './IMusics';
export interface IArtist{
    id: string,
    name: string,
    imageUrl: string,
    musics?: IMusic[];
}