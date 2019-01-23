var CryptoJS = require("crypto-js");


 const setCookie = (userId, req) => {
    //encrypt the userId
    const encryptedCookie = CryptoJS.AES.encrypt(userId, process.env.COOKIE_KEY).toString()
    //save cookie to user
}

export const isLoggedIn = async(userId) => {
    //decrypt the cookie
    var bytes  =  CryptoJS.AES.decrypt(userId, process.env.COOKIE_KEY);
    var id =  bytes.toString(CryptoJS.enc.Utf8);

    //check to see if id matches current user



}

export const login = async({email, password}) => {

}

export const logout = async() => {

}