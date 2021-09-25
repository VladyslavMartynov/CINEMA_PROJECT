import { URL_ADRESS, URL_FIRST_LOAD } from './constants';
import { searchInput, favoriteWrap, loginName, loginPassword } from './DomElements';
import { Film, User } from "./Types";
import { createFilm, createPage } from "./createPage";
import { loginValidation, validationOfUserData } from "./LoginValidation";

export let filterGenre: string = 'All';
export let filterLang: string = 'All';
export let itemPerPage: number = 4;
export let page: number = 1;
export let resultData: Film [] = [];

loginValidation();

export const createUser = (): void => {
    const userData: User = {
        name: (loginName as any ).value,
        password: (loginPassword as any).value,
        favouriteFilms: [],
    }

    if(validationOfUserData(userData)){
        return
    }

    const user = JSON.stringify(userData);
    localStorage.setItem('user', user);
    document.location.href = 'index.html';
}

export const userLogout = (): void => {
    localStorage.clear();
    document.location.href = 'login.html';
}

export const enterClickEvent = (e: { keyCode: number; }) => {
    if(e.keyCode === 13){
        fetchDataFromServer();
    }
}

const firstLoad = async () => {
    const json = await fetch(`${URL_FIRST_LOAD}`);
    resultData = ((await json.json() ) as any )
        .filter((el:any, i: any) => {
            return i < 50;
        })
        .map((i: any) => {
        return {
            show:{
                ...i
            }
        }
    });
    createPage(page, itemPerPage, filterGenre, filterLang);
}

firstLoad();

export const fetchDataFromServer = async () => {
    const inputVal: string = searchInput.value;
    const json = await fetch(`${URL_ADRESS}${inputVal}`);
    resultData = await json.json();
    createPage(page, itemPerPage, filterGenre, filterLang);
}

export const genreFilter = (event: any) => {
    filterGenre = event.target.value;
    createPage(page, itemPerPage, filterGenre, filterLang);
}

export const langFilter = (event: any) => {
    filterLang = event.target.value;
    createPage(page, itemPerPage, filterGenre, filterLang);
}

//Pagination
export const changePageSize = (event: any) => {
    itemPerPage = +(event.target.value);
    console.log(event.target.value);
    createPage(page, itemPerPage, filterGenre, filterLang);
}

export const changePageNumber =  (i : number) => {
    page = i;
    createPage(i, itemPerPage, filterGenre, filterLang);
}

export const loadFavourite = () => {
    const data = localStorage.getItem('user')!;
    const user = JSON.parse(data) as User;
    for(let note of user.favouriteFilms) {
        createFilm(note.show, favoriteWrap, true);
    }
}

loadFavourite();