const bcrypt = require('bcryptjs');
const hashPassword = async(password) => {
    const salt = await bcrypt.hash(password, 16);
    return salt;
}
const comparePassword = async(password, hashPassword) => {
    const result = await bcrypt.compare(password, hashPassword);
    return result;
}

module.exports = {
    hashPassword,
    comparePassword
}