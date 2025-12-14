class UserData{
    constructor({fullName, userName, email, password, status}){
        this.fullName = fullName;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.status = status;
    }
}

module.exports = UserData;