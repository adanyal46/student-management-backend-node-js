const { UserListResource, UserResource } = require("../resource/userResource");
const userService = require("../services/userService");

const getAllUser = async (req, res, next) => {
  try {
    const users = await userService.getAllUser();
    return res
      .status(201)
      .json({ success: true, users: UserListResource(users) });
  } catch (error) {
    next(error);
  }
};

const getSingleUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getSingleUser(parseInt(id));
    return res.status(201).json({ success: true, user: UserResource(user) });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userService.updateUser(parseInt(id), req.body);
    return res
      .status(200)
      .json({
        success: true,
        message: "User Updated!",
        user: UserResource(user),
      });
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    await userService.deleteUser(parseInt(id));
    return res.status(200).json({ success: true, message: "User Deleted!" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUser, getSingleUser, updateUser, deleteUser };
