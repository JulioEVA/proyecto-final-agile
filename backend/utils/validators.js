exports.validateDate = (date) => {
  try {
    return date >= new Date();
  } catch {
    return false;
  }
};
