export var setLoginUser = user => {
    window.localStorage.setItem('$LoginUser', JSON.stringify(user));
}
export var setLoginLink = user =>{
    window.localStorage.setItem('$LoginLink', JSON.stringify(user));
}
export var getLoginUser = () => {
    var loginUser = window.localStorage.getItem('$LoginUser');
    if (typeof loginUser === "object") {
        return loginUser;
    } else if (typeof loginUser === 'string') {
        try {
            loginUser = JSON.parse(loginUser);
        } catch (error) {
            loginUser = null;
        }
    } else {
        loginUser = null;
    }
    return loginUser;
}
export var getLoginLink = () => {
    var loginUser = window.localStorage.getItem('$LoginLink');
    if (typeof loginUser === "object") {
        return loginUser;
    } else if (typeof loginUser === 'string') {
        try {
            loginUser = JSON.parse(loginUser);
        } catch (error) {
            loginUser = null;
        }
    } else {
        loginUser = null;
    }
    return loginUser;
}
export var setProfile = user => {
    window.localStorage.setItem('$Profile', JSON.stringify(user));
}

export var getProfile = () => {
    var loginUser = window.localStorage.getItem('$Profile');
    if (typeof loginUser === "object") {
        return loginUser;
    } else if (typeof loginUser === 'string') {
        try {
            loginUser = JSON.parse(loginUser);
        } catch (error) {
            loginUser = null;
        }
    } else {
        loginUser = null;
    }
    return loginUser;
}