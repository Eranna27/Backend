
// Checks if required fields are present in the request body

exports.getMissingFields = (body, requiredFields) => {
  return requiredFields.filter((field) => !body[field]);
};

// Team Leader  valid Status

exports.isValidTeamLeaderStatus = (status) =>
  ["Active", "Trash"].includes(status);


// SFZ EVENT valid Status
exports.isValidSFZEventStatus = (status) =>
  ["Published", "Draft", "Pending"].includes(status);


// Attendance Type valid Status
exports.isValidAttendanceTypeStatus = (status) =>
  ["online", "in-person"].includes(status);


// ScheduleType valid Status
exports.isValidScheduleTypeStatus = (status) =>
  ["weekly", "monthly","allAtOnce"].includes(status);