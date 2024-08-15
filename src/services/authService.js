const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../../prisma/client");
const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET || "your-secret-key";

const register = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const checkUsername = await prisma.user.findUnique({ where: { username } });

  if (checkUsername) {
    throw new Error("Username Already Exists");
  }

  const checkEmail = await prisma.user.findUnique({ where: { email } });
  if (checkEmail) {
    throw new Error("Email Already Exists");
  }

  return await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      role: "student",
    },
  });
};

const login = async (username, password) => {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }
  const token = jwt.sign({ userId: user.id, role: user.role }, jwtSecret, {
    expiresIn: "1h",
  });

  const { password:hashedPassword, ...rest } = user;

  return { user: rest, token };
};

module.exports = { register, login };
