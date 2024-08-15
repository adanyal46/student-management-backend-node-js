const prisma = require("../../prisma/client");

const getAllStudent = async () => {
  const user = await prisma.student.findMany({});
  return user;
};

const createStudent = async (data) => {
  const student = await prisma.student.create({ data });
  return student;
};

const getSingleStudent = async (id) => {
  const studentExist = await prisma.student.findFirst({ where: { id } });
  if (!studentExist) {
    throw new Error("Student not found!");
  } else {
    return studentExist;
  }
};

const updateStudent = async (id, updateData) => {
  await getSingleStudent(id);

  const updatedStudent = await prisma.student.update({
    where: { id },
    data: updateData,
  });

  return updatedStudent;
};

const deleteStudent = async (id) => {
  await getSingleStudent(id);
  return await prisma.student.delete({ where: { id } });
};

module.exports = {
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
  createStudent
};
