const prisma = require("../../prisma/client");

const getAllStudent = async (page = 1, pageSize = 10, search = "") => {
  const skip = (page - 1) * pageSize;

  // Fetch paginated students
  const studentsPromise = prisma.student.findMany({
    skip,
    take: pageSize,
    where: {
      OR: [
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        // { dateOfBirth: { contains: new Date(search) } },
        { class: { contains: search } },
        { guardianContact: { contains: search,  } },
        { guardianName: { contains: search } },
      
      ],
    },
  });

  // Fetch total count of students matching search criteria
  const totalCountPromise = prisma.student.count({
    where: {
      OR: [
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        // { dateOfBirth: { contains:new Date(search)} },
        { class: { contains: search } },
        { guardianContact: { contains: search,  } },
        { guardianName: { contains: search } },
      ],
    },
  });

  // Execute queries in parallel
  const [students, totalCount] = await Promise.all([
    studentsPromise,
    totalCountPromise,
  ]);

  return { students, totalCount };
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
  createStudent,
};
