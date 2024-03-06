require("dotenv").config();

const PORT = process.env.PORT;

const JWT = {
	SECRET: process.env.SECRET,
	EXPIRES: process.env.EXPIRES
};

const DB_DATA = {
	DB_URL: process.env.DB_URL
};


module.exports = {PORT,JWT,DB_DATA}