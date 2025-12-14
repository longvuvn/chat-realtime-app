class UserResponse {
    constructor(user) {
        this.id = user._id;
        this.fullName = user.fullName;
        this.userName = user.userName;
        this.email = user.email;
        this.avatarImage = user.avatarImage;
        this.status = user.status;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }
}


module.exports = UserResponse;