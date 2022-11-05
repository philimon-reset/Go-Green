const bcrypt = require("bcrypt");


const hashedpassword = async (password) => {
	return await bcrypt.hash(password, 10);
}

const unhashpassword = async ( password, hashedpassword ) => {
	return await bcrypt.compare(password, hashedpassword);
}

module.exports = {hashedpassword, unhashpassword}