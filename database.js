const mysql =require('mysql2')
require('dotenv').config()
console.log(process.env.HOST)
console.log(process.env.USER)
console.log(process.env.PASSWORD)
console.log(process.env.DATABASE)
const dbconnection= mysql.createPool({
    host: process.env.HOST, 
    user: "localuh",
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}).promise()

async function getLocation(){
    const [rows]= await dbconnection.query("SELECT * FROM location")
    return rows
} 
async function insertLocation(device_name, latitude, longitude, mapUrl) {
    const query = "INSERT INTO location (device_name, latitude, longitude, mapUrl) VALUES (?, ?, ?, ?)";
    const values = [device_name, latitude, longitude, mapUrl];
    const result = await dbconnection.query(query, values);
    return result;
  }
module.exports ={getLocation,insertLocation}