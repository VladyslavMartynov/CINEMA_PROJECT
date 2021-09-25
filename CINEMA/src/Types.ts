export interface Film {
    show: {
        name: string,
        image: {
            medium: string,
            original: string,
        },
        summary: string,
        genres: string [],
        language: string,
        id: number,
        rating: {
            average: number
        }
    }
}

export interface User {
    name: string,
    password: string,
    favouriteFilms: Array<Film>,
}