const bcrypt = require("bcrypt");


const hashedpassword = async (password) => {
	const hash = await bcrypt.hash(password, 10);
	return hash;
}

const unhashpassword = async ( password, hashedpassword ) => {
	return await bcrypt.compare(password, hashedpassword);
}

module.exports = {hashedpassword, unhashpassword}