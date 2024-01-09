type User = Prettify<import("../models/user/user.types").IUser>;
type UserDocument = import("mongoose").Document<unknown, {}, User> & User;
