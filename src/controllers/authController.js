const { authResource } = require("../resource/authResource");
const authService = require("../services/authService");

const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await authService.register(username, email, password);
    return res.status(201).json(authResource(newUser));
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const { user, token } = await authService.login(username, password);
    return res.status(200).json({ user: authResource(user), token });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
