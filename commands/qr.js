module.exports.config = {
	name: "qr",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Thọ",
	description: "Mã hoá văn bản bằng mã QR",
	commandCategory: "general",
	usages: "qr [text]",
	cooldowns: 5,
	dependencies: ["request","qrcode","fs-extra"]
};

module.exports.run = async function({ api, event, args }) {
  var fs = require("fs-extra")
  var text = args.join(" ")
      if(!text) return api.sendMessage("Nhập những thứ bạn muốn thêm vào mã qr",event.threadID);
			var opt = {
				errorCorrectionLevel: 'H',
				type: 'image/png',
				quality:0.3,
				scale:50,
				margin:1,
				color:{dark:"#000000",light:"#ffffff"}
		}
		 api.sendTypingIndicator(event.threadID,() =>	require('qrcode').toFile(__dirname + '/cache/qr.png', text , opt, (err) => {
			if (err) throw err;
			api.sendMessage({
				attachment: fs.createReadStream(__dirname + '/cache/qr.png')
			},event.threadID, () => fs.unlinkSync(__dirname + '/cache/qr.png'), event.messageID);
		}))}
    