import { favoriteWrap, filmWrap, ulPagination } from "./DomElements";
import { Film, User } from "./Types";
import { changePageNumber, itemPerPage, loadFavourite, page, resultData } from "./index";

export function createPage(pageNum: number, size: number, filterGenre: string, filterLang: string) {
    let notes = resultData
        .filter(el => {
            if (filterGenre !== 'All') {
                if (el.show.genres.includes(filterGenre)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true
            }
        })
        .filter(el => {
            if (filterLang !== 'All') {
                if (el.show.language.toUpperCase() === filterLang.toUpperCase()) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true
            }
        })

    if (!ulPagination) {
        return
    }

    ulPagination.innerText = '';

    let countOfLi = Math.ceil(notes.length / size);
    if (pageNum > countOfLi) {
        pageNum = 1;
    }

    let start = (pageNum - 1) * size;
    let end = start + size;
    notes = notes.slice(start, end);

    for (let i = 1; i <= countOfLi; i++) {
        let li = document.createElement('li') as any;
        li.innerText = i;
        ulPagination.append(li);

        if (i === +(pageNum)) {
            li.classList.add('active');
        }

        li.addEventListener('click',() => {
            changePageNumber(i);
        })
    }

    showPage(notes)
}

export function showPage(notes: Film []) {
    filmWrap.innerText = '';

    for(let note of notes) {
        createFilm(note.show, filmWrap);
    }
}

export function createFilm (note: any, target: HTMLElement , isFavorite: boolean = false) {
    const div: HTMLElement = document.createElement('div')!;
    const img: HTMLElement = document.createElement('img')!;
    const a: HTMLElement = document.createElement('a')!;
    const span: HTMLElement = document.createElement('span')!;

    const likeSpan: HTMLElement = document.createElement('span')!;
    const likeImg: HTMLElement = document.createElement('img')!;
    likeImg.setAttribute('src', 'images/like.jpeg');
    likeImg.setAttribute('class', 'like__img');
    likeSpan.append(likeImg);

    const crossImg = document.createElement('img');
    crossImg.setAttribute('src','images/cross.png');
    crossImg.setAttribute('class', 'crossimg');
    span.append(crossImg);

    if (isFavorite) {
        div.append(span);
        likeImg.remove();
        likeSpan.remove();
    }

    img.setAttribute('src',`${note.image?.original || note.image?.medium || 'images/netflix_mid.jpeg'}`);
    img.setAttribute('class','img');
    img.setAttribute('myid',`${note.id}`)
    a.append(img);


    div.setAttribute('class', 'film__item');
    div.append(a);
    div.append(likeSpan);
    target?.append(div);


    if (!isFavorite) {
        likeSpan.addEventListener('click', () => {
            const data = localStorage.getItem('user')!;
            const user = JSON.parse(data) as User;
            if (!user.favouriteFilms.some(el => +el.show.id === +note.id)) {
                const addedFilm = resultData.find(el => +el.show.id === +note.id)!;
                user.favouriteFilms.push(addedFilm);
                localStorage.setItem('user', JSON.stringify(user));
                alert('This film was added to favourite films!');
            } else {
                alert('Film has already been added!')
            }
        })
    } else {
        span.addEventListener('click', () => {
            const data = localStorage.getItem('user')!;
            const user = JSON.parse(data) as User;
            user.favouriteFilms = user.favouriteFilms.filter(el =>  +el.show.id !== +note.id);
            localStorage.setItem('user', JSON.stringify(user));
            favoriteWrap.innerText = '';
            loadFavourite();
            alert('This dilm was deleted from favourites!')
        })

        a.addEventListener('click', () => {
            const div: HTMLElement = document.createElement('div');
            div.setAttribute('class','modal');
            div.setAttribute('id', 'myModal');

            const modalcontent: HTMLElement = document.createElement('div');
            const h2: HTMLElement = document.createElement('h2');
            h2.setAttribute('class','modal__slogan');
            h2.innerText = note.name;

            const imgModal: HTMLElement = document.createElement('img');
            imgModal.setAttribute('class', 'modal__img');
            imgModal.setAttribute('src', `${note.image?.medium || note.image?.original || 'images/netflix_mid.jpeg'}`);

            const p: HTMLElement = document.createElement('p');
            p.setAttribute('class', 'modal__text');
            p.innerHTML = note.summary;

            const span: HTMLElement = document.createElement('span');
            span.setAttribute('class', 'modal__rating');
            span.innerText = note.rating?.average || 5.0;

            modalcontent.append(h2);
            modalcontent.append(imgModal);
            modalcontent.append(p);
            modalcontent.append(span);
            modalcontent.setAttribute('class', 'modal-content');

            // modalcontent.innerText = note.id;
            div.append(modalcontent);
            div.addEventListener('click', () => {
                div.remove();
            })

            document.body.append(div);
            div.style.display = 'block';
            div.setAttribute('isFirst', 'true');


            document.body.addEventListener('click', (event) => {
                event.stopImmediatePropagation();
                const elem = document.getElementById('myModal')!;
                if (elem?.getAttribute('isFirst') === 'true') {
                    elem.setAttribute('isFirst','false');
                    return
                }

                elem?.remove();
            })
        })
    }
}