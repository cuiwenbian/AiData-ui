/* const ipfsFile = require('./ipfsFile');
const fs = require('fs');
console.log(fs)
// const url = "http://61.155.145.6:5001/ipfs/"
//操作文件
let addPath = "../logo.png";
let getPath = "../logo.png";
let buff = fs.readFileSync(addPath);
ipfsFile.add(buff).then((hash) => {
	console.log(hash);
	console.log("http://61.155.145.6:5001/ipfs/" + hash);
	return ipfsFile.get(hash);
}).then((buff) => {
	fs.writeFileSync(getPath, buff);
	console.log("file:" + getPath);
}).catch((err) => {
	console.log(err);
}) */
const ipfsAPI = require('ipfs-api')
const ipfs = ipfsAPI('61.155.145.6', '5001', {protocol: 'http'})
const buffer = Buffer.from('this is a demo')
ipfs.add(buffer)
    .then( rsp => console.log(rsp[0].hash))
.catch(err => console.error(err))
console.log("ipfs")