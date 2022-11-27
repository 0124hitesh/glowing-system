const IsLogIn = () => {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo !== null;
}

export default IsLogIn;