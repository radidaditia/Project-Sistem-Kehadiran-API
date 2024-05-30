const {
  successResponse,
  internalErrorResponse,
  errorResponse,
} = require("../config/responseJson");
const { kehadiran, users } = require("../models");

const getAttendance = async (req, res) => {
  try {
    const attendance = await kehadiran.findAll({
      where: {
        userId: req.user.id,
      },
      attributes: ["kelas", "absen", "nama", "absensi"],
    });

    successResponse(res, "Data fetched successfully", attendance, 200);
  } catch (err) {
    internalErrorResponse(res, err, 500);
  }
};

const createAttendance = async (req, res) => {
  const userId = req.user.id;
  const { kelas, absen, nama, absensi } = req.body;

  try {
    const attendance = await kehadiran.create({
      kelas,
      absen,
      nama,
      absensi,
      userId,
    });

    if (!attendance) {
      errorResponse(res, "Data not created", 400);
    } else {
      successResponse(res, "Data added successfully", attendance, 201);
    }
  } catch (err) {
    internalErrorResponse(res, err, 500);
  }
};

const updateAttendance = async (req, res) => {
  const { kelas, absen } = req.params;
  const userId = req.user.id;
  const { absensi } = req.body;

  try {
    const attendance = await kehadiran.findOne({
      where: {
        kelas,
        absen,
        userId,
      },
    });

    if (!attendance) {
      errorResponse(res, "Data not found", 404);
    }
    const updatedAttendance = await kehadiran.update(
      {
        absensi,
      },
      {
        where: {
          kelas,
          absen,
          userId,
        },
      }
    );

    const attendanceReponse = {
      id: attendance.id,
      absensi: attendance.absensi,
    };

    if (!updatedAttendance) {
      errorResponse(res, "Event not updated", 400);
    } else {
      successResponse(
        res,
        "Event updated successfully",
        attendanceReponse,
        200
      );
    }
  } catch (err) {
    console.error(err);
    internalErrorResponse(res, err, 500);
  }
};

const findStudent = async (req, res) => {
  const { kelas, absen } = req.params;
  const userId = req.user.id;

  try {
    const attendance = await kehadiran.findOne({
      where: {
        kelas: parseInt(kelas),
        absen: parseInt(absen),
        userId,
      },
      attributes: ["id", "kelas", "absen", "nama", "absensi"],
    });

    if (!attendance) {
      errorResponse(res, "Data not found", 404);
    } else {
      successResponse(res, "Data fetched successfully", attendance, 200);
    }
  } catch (err) {
    internalErrorResponse(res, err, 500);
  }
};

const percentase = async (req, res) => {
  const { kelas, absen } = req.params;
  const userId = req.user.id;

  try {
    const attendance = await kehadiran.findAll({
      where: {
        kelas: parseInt(kelas),
        absen: parseInt(absen),
        userId,
      },
      attributes: ["id", "kelas", "absen", "nama", "absensi"],
    });

    if (!attendance || attendance.length === 0) {
      errorResponse(res, "Data not found", 404);
      return;
    }

    const totalMeetings = attendance.length;
    let presentCount = 0;

    attendance.forEach((attendance) => {
      if (attendance.absensi === "Hadir") {
        presentCount++;
      }
    });

    const attendancePercentage = (presentCount / totalMeetings) * 100 + "%";

    successResponse(
      res,
      "Data fetched successfully",
      {
        data: attendance,
        totalMeetings,
        presentCount,
        attendancePercentage,
      },
      200
    );
  } catch (err) {
    internalErrorResponse(res, err, 500);
  }
};

module.exports = {
  createAttendance,
  getAttendance,
  updateAttendance,
  percentase,
  findStudent,
};
