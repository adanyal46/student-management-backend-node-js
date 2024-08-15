const prisma = require("../../prisma/client");

const StudentListResource = (students) => {
  return students.map((student) => ({
    id: student.id,
    userId: prisma.user.findUnique({ where: { id: student.userId } }),
    firstName: student.firstName,
    lastName: student.lastName,
    dateOfBirth: student.dateOfBirth,
    class: student.class,
    guardianName: student.guardianName,
    guardianContact: student.guardianContact,
  }));
};
const StudentResource = (user) => {
  return {
    id: student.id,
    userId: prisma.user.findFirst({ where: { id: student.userId } }),
    firstName: student.firstName,
    lastName: student.lastName,
    dateOfBirth: student.dateOfBirth,
    class: student.class,
    guardianName: student.guardianName,
    guardianContact: student.guardianContact,
  };
};

module.exports = { StudentListResource, StudentResource };
