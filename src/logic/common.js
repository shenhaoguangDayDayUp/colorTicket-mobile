export var setCommon = config => {

    sessionStorage.setItem('TOKEN', JSON.stringify(config));
}

export var getCommon = () => {
    var config = sessionStorage.getItem('TOKEN');
    if (typeof config === "object") {
        return config;
    } else if (typeof config === 'string'&& config =='undefined') {
        config = null;
    }
    return config;
}
export var setPassword = config => {
    sessionStorage.setItem('pwdRedeem', JSON.stringify(config));
}
export var getPassword = config => {
    var config = sessionStorage.getItem('pwdRedeem');
    if (typeof config === "object") {
        return config;
    } else if (typeof config === 'string'&& config =='undefined') {
        config = null;
    }
    return config;
}

