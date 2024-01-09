export interface IMusic{
    id: string,
    title: string,
    artists: IArtist[],
    album: IAlbum,
    time: string
}

interface IArtist{
    id: string,
    name: string
}

interface IAlbum{
    id: string,
    name: string,
    imageUrl: string
}