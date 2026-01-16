export const setUserFromLocalStorage = (user: any) => {
    localStorage.setItem('user_uid', user.uid);
    localStorage.setItem('user_name', user.displayName);
    localStorage.setItem('user_email', user.email);
    localStorage.setItem('user_photoURL', user.photoURL);
}

export const getUserFromLocalStorage = () => {
    return {
        uid: localStorage.getItem('user_uid'),
        name: localStorage.getItem('user_name'),
        email: localStorage.getItem('user_email'),
        photoURL: localStorage.getItem('user_photoURL')
    }
}

export const clearUserStorage = () => {
    localStorage.clear();
}
