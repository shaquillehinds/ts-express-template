// type User = ExtractModelType<typeof import("../models/user").default>;
// type UserDocument = import("mongoose").Document<unknown, {}, User> & User;
type User = import("../models/user/user.types").IUser;
type UserDocument = import("mongoose").Document<unknown, {}, User> & User;
