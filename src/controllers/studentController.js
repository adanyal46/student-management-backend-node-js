const {
  StudentListResource,
  StudentResource,
} = require("../resource/studentResource");
const studentService = require("../services/studentService");

const getAllStudent = async (req, res, next) => {
  const { page = 1, pageSize = 10, search = '' } = req.query;

  try {
    const students = await studentService.getAllStudent(Number(page), Number(pageSize), search);
    return res
      .status(201)
      .json({ success: true, ...students });
  } catch (error) {
    next(error);
  }
};

const createStudent = async (req, res, next) => {
  try {
    const student = await studentService.createStudent(req.body);
    return res
      .status(201)
      .json({
        success: true,
        student: StudentListResource(student),
        message: "Student Created!",
      });
  } catch (error) {
    next(error);
  }
};

const getSingleStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await studentService.getSingleStudent(parseInt(id));
    return res
      .status(201)
      .json({ success: true, student: StudentResource(student) });
  } catch (error) {
    next(error);
  }
};

const updateStudent = async (req, res, next) => {
  const { id } = req.params;
  try {
    const student = await studentService.updateStudent(parseInt(id), req.body);
    return res.status(200).json({
      success: true,
      message: "Student Updated!",
      student: StudentResource(student),
    });
  } catch (error) {
    next(error);
  }
};
const deleteStudent = async (req, res, next) => {
  const { id } = req.params;
  try {
    await studentService.deleteStudent(parseInt(id));
    return res.status(200).json({ success: true, message: "Student Deleted!" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllStudent,
  createStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
  
};
