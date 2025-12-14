class UserUpdateData {
    constructor({fullName, userName, email, password, avatarImage, status}) {
        this.fullName = fullName;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.avatarImage = avatarImage;
        this.status = status;
    }
}

module.exports = UserUpdateData;