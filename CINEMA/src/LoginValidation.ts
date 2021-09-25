import { User } from "./Types";
import { loginName, loginPassword } from "./DomElements";

export const loginValidation = (): void => {
    if(!localStorage.getItem('user') && !document.location.href.endsWith('login.html')){
        document.location.href = 'login.html';
    }
}

export const validationOfUserData = (userData: User) => {
    let trigger: boolean = false;

    if(userData.name.length < 3){
        trigger = true;
        loginName.style.border = '5px solid red';
        loginName.style.transition = 'all 1s';

        setTimeout(() => {
            loginName.style.border = '1px solid black';
        },2000);
    }

    if(userData.password.length < 6){
        trigger = true;
        loginPassword.style.border = '5px solid red';
        loginPassword.style.transition = 'all 1s';

        setTimeout(() => {
            loginPassword.style.border = '1px solid black';
        },2000);
    }

    return trigger;
}