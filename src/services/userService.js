const prisma = require("../../prisma/client");

const getAllUser = async () => {
  const user = await prisma.user.findMany({});
  return user;
};

const getSingleUser = async (id) => {
  const userExist = await prisma.user.findFirst({ where: { id } });
  if (!userExist) {
    throw new Error("User not found!");
  } else {
    return userExist;
  }
};

const updateUser = async (id, updateData) => {
  await getSingleUser(id);

  const updatedUser = await prisma.user.update({
    where: { id },
    data: updateData,
  });

  return updatedUser;
};

const deleteUser = async (id) => {
  await getSingleUser(id);

  return await prisma.user.delete({ where: { id } });
};

module.exports = { getAllUser, getSingleUser, updateUser, deleteUser };
