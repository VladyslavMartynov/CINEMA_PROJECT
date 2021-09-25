import {
    changePageSize,
    createUser,
    enterClickEvent,
    fetchDataFromServer,
    genreFilter,
    langFilter,
    userLogout
} from "./index";


export const searchInput = document.getElementById('searchInput') as HTMLInputElement;
export const searchBtn = document.getElementById('searchBtn')!;
export const filmWrap = document.getElementById('filmWrap')!;
export const loginBtn = document.getElementById('loginBtn')!;
export const loginName = document.getElementById('loginName')!;
export const loginPassword = document.getElementById('loginPassword')!;
export const logoutBtn = document.getElementById('logoutBtn')!;
export const ulPagination = document.getElementById('ulPagination')!;
export const selectPage = document.getElementById('selectPage')!;
export const genre = document.getElementById('genre')!;
export const lang = document.getElementById('lang')!;
export const favoriteWrap = document.getElementById('favoriteWrap')!;

loginBtn?.addEventListener('click', () => {
    createUser();
});
logoutBtn?.addEventListener('click', () => {
    userLogout();
});

searchBtn?.addEventListener('click', () => {
    fetchDataFromServer();
});

searchInput?.addEventListener('keypress', (e) => {
    enterClickEvent(e);
});

genre?.addEventListener('click', (e) => {
    genreFilter(e);
});

lang?.addEventListener('click', (e) => {
    langFilter(e);
});

selectPage?.addEventListener('change',(e) => {
    changePageSize(e)
});