const express = require("express");
const path = require("path");
const request = require("request");
const multer = require("multer");
const fs = require("fs");
const rimraf = require("rimraf");
const Jimp = require('jimp');
const passwordHash = require("password-hash");
const formidable = require("formidable");
const mysqlDump = require('mysqldump');
const cp = require("child_process");
const fetch = require('node-fetch');
const app = express();
const options = {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
};
const http = require("https").createServer(options, app);
const io = require("socket.io")(http);
const isPowers = require("./powers");
const NoNames = require("./names");
const Config = require("./config");
const cors = require("cors");
const AppDataBase = require("./database/database");
const GetBots = require("./router/bots_list");
const GetBand = require("./router/ban_list");
const GetBsb = require("./router/bsb_list");
const GetOwner = require("./router/owners");
const GetSite = require("./router/site_list");
const GetUsers = require("./router/users_list");
const GetRooms = require("./router/rooms_list");
const GetLogs = require("./router/logs_list");
const GetNames = require("./router/names_list");
const GetSetting = require("./router/settings");
const GetPowers = require("./router/powers_list");
const GetSub = require("./router/subscribe_list");
const GetCuts = require("./router/cut_list");
const GetHosts = require("./router/host_list");
const GetHistLetter = require("./router/histletter_list");
const GetNoText = require("./router/notext_list");
const GetBars = require("./router/bars_list");
const GetIntroMsg = require("./router/intromsg_list");
const GetStats = require("./router/state_list");
const GetStory = require('./router/story_list');
const db = new AppDataBase(Config.Datebase);
const StoryRepo = new GetStory(db);
const BotsRepo = new GetBots(db);
const HostRepo = new GetHosts(db);
const BandRepo = new GetBand(db);
const SubRepo = new GetSub(db);
const OwnerRepo = new GetOwner(db);
const SiteRepo = new GetSite(db);
const BsbRepo = new GetBsb(db);
const UsersRepo = new GetUsers(db);
const SettingRepo = new GetSetting(db);
const PowersRepo = new GetPowers(db);
const RoomsRepo = new GetRooms(db);
const LogsRepo = new GetLogs(db);
const NamesRepo = new GetNames(db);
const CutsRepo = new GetCuts(db);
const NotextRepo = new GetNoText(db);
const BarsRepo = new GetBars(db);
const HistLetterRepo = new GetHistLetter(db);
const IntroRepo = new GetIntroMsg(db);
const StateRepo = new GetStats(db);
const myDate = new Date();
const PORT = process.env.PORT || Config.Port;
const AccountUserName = "TigerHOst";
const AccountPassword = "ليثالشامي0988";
var GroupUsers = [];
var isVPN = false;
var istime;
var islaod;
var BarFix = false;
var Offline = false;
var isbannerdone = false;
var isbannerdone1 = false;
var isbannerdone2 = false;
var isbannerdone3 = false;
var isrc = true;
var isrcs = false;
var UsersList = [];
var PeerRoom = {};
var IsTV = "";
var MaxRep = 3;
var ListBand = [];
var ListHost = [];
var ListIPAll = [];
var hostname = "";
var ListIP = [];
var xss = require("xss");
var isUserEntred = []



const search = async function(query, nb){
let url = "https://www.youtube.com/results?search_query="+query;
  return fetch(url)
    .then(res => res.text())
    .then(body => {
      let val1 = body.search('itemSectionRenderer');
      let val2 = body.search('},{\"continuationItemRenderer');
      body = body.slice(val1, val2);
      body = "{\""+body+"}";
      body = JSON.parse(body);
      if(nb){
        var max = nb;
      } else { 
        var max = 3;
      }
      let c = 0;
      let i = 0;
      var result = [];
      while(c<max){
        if(body.itemSectionRenderer.contents[i].videoRenderer){
          var res = 
            {
              id: body.itemSectionRenderer.contents[i].videoRenderer.videoId,
             title: body.itemSectionRenderer.contents[i].videoRenderer.title.runs[0].text,
             time: body.itemSectionRenderer.contents[i].videoRenderer.lengthText.simpleText,
              link: "https://www.youtube.com/watch?v="+body.itemSectionRenderer.contents[i].videoRenderer.videoId,
              thumbnail: "https://i.ytimg.com/vi/"+body.itemSectionRenderer.contents[i].videoRenderer.videoId+"/hqdefault.jpg"
            }
          result.push(res);
          i++;
          c++;
        } else {
          i++;
        }
      }   
      return result;
    });
};


const System = {
    system1: false,
    system2: false,
    system3: false,
    system4: false,
    system5: false,
    system6: false,
    system7: true,
};

const Browser = {
    browser1: false,
    browser2: false,
    browser3: false,
    browser4: false,
    browser5: false,
    browser6: false,
    browser7: false,
    browser8: false,
    browser9: true,
};

var UserInfo = {};
var UserEntre = [];
var UserMuted = [];
var WaitRecon = [];
var WaitBarSend = {};
var emos = [];
var BandRoom = [];
var dro3s = [];
var sicos = [];
var SiteSetting;
var walllikes;
var ShowPowers;
var online = [];
var SystemOpen;
var BrowserOpen;
var ektisar;
var noletter;
var roomslists;
var roomsliste;

const MIME_TYPES = Config.TypeFile;

var iskick = false;
var islink = "";
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "uploads" + islink);
    },
    filename: (req, file, callback) => {
        // const name = file.originalname.split(" ").join("_");
        var extension = MIME_TYPES[file.mimetype];
		if(extension != undefined){
		if(MIME_TYPES[file.mimetype].includes('png')){
			extension = 'jpg'
		};
		};
        callback(null, Date.now() + "." + extension);
    },
});

const maxSize = Config.MaxUpload;

function getDayTime(data){
    return new Date(Number(data)).getDay() -1;
};

function addDays(days) {
	return new Date( Date.now() + days * 24 * 60 * 60 * 1000).getTime().toFixed()
};

String.prototype.replaceAll = function (str1, str2, ignore) {
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\.{0,3}$*\+\?\|\<\>\-\&])/g, "\\$&"), ignore ? "gi" : "g"), typeof str2 == "string" ? str2.replace(/\$/g, "$$$$") : str2);
};

var ekti1 = [];
var ekti2 = [];
/*
function replaceEktisar(data) {
	for (i = 0; i < 3; i++) {
		data = ekti1.reduce((acc, item, i) => {
  const regex = new RegExp('(^| )' + item + '( |$|\n)');
  return acc.replace(regex, ' '+ekti2[i]+' ');
}, data);
    }
    return data.split("<").join("&#x3C;");
}
*/

function replaceEktisar(data) {
	for (i = 0; i < 3; i++) {
		data = ekti1.reduce((acc, item, i) => {
  const regex = new RegExp('(^| )' + item + '( |$|\n)');
  return acc?.toString().replace(regex, ' '+ekti2[i]+' ');
}, data);
    }
    return data?.split("<").join("&#x3C;");
}
var upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("photo");

function getname(data) {
    const indexroom = roomslists.findIndex((x) => x.id == data);
    if (indexroom != -1) {
        return roomslists[indexroom].topic;
    };
};

function MyOptionHistory(data) {
    if (data) {
        const imsa = ShowPowers.findIndex((x) => x.name == data);
        if (imsa != -1) {
            if (ShowPowers[imsa].history) {
                return 1;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }
}
/*app.get('/ENGUTSLU10',async(req,res)=>{
    var sss = await UsersRepo.getENGUTSLU10();
    res.send(sss)
}),*/

app.get("/uh", function (req, res) {
    UsersRepo.getByToken(req.query["token"]).then((isde) => {
        if (isde) {
            if (MyOptionHistory(isde.power)) {
                if (UserInfo[req.query["u2"]]) {
                    NamesRepo.getByMyIp(UserInfo[req.query["u2"]].ip).then((myip) => {
                        if (myip) {
                            res.send(myip);
                        };
                    });
                };
            };
        };
    });
});
BsbRepo.createTable();
UsersRepo.createTable();
SettingRepo.createTable();
OwnerRepo.createTable();
PowersRepo.createTable();
RoomsRepo.createTable();
NamesRepo.createTable();
SubRepo.createTable();
BandRepo.createTable();
LogsRepo.createTable();
StateRepo.createTable();
BotsRepo.createTable();
HostRepo.createTable();
CutsRepo.createTable();
NotextRepo.createTable();
BarsRepo.createTable();
HistLetterRepo.createTable();
IntroRepo.createTable();
SiteRepo.createTable();


app.get("/cp.html", function (req, res) {
    res.set("Content-Type", "text/html");
    res.write("<h4>لاتملك صلاحيآت</h4>");
    res.end();
});

function savestate(data) {
    if (data) {
        StateRepo.create({ state: data.state, topic: data.topic, username: data.topic1, room: data.room, ip: data.ip, time: data.time });
        StateRepo.getAll().then((datavb) => {
            if (datavb) {
                for (var i = 0; i < datavb.length; i++) {
                    if (i > 150) {
                        StateRepo.delete(datavb[i].id);
                    };
                };
            };
        });
    };
};

var isrt;

function convertLetterToNumber(str) {
  var out = 0, len = str.length;
  for (pos = 0; pos < len; pos++) {
    out += (str.charCodeAt(pos) - 64) * Math.pow(26, len - pos - 1);
  }
  return out;
}

app.post("/pic", function (req, res) {
    islink = "/pic";
    upload(req, res, function (err) {
        if (err) {
            res.sendStatus(401);
        } else {
			
			if(typeof req != 'object'){
				return;
			};
			
			if(typeof req.file != 'object'){
				return;
			};
			
				if(typeof req.file.filename != 'string'){
				return;
			};
			if(!req.file.filename){
				return;
			};
			Jimp.read("uploads/pic/" + req.file["filename"], (err, lenna) => {
				if (err){
				}else{
				if(req.file["filename"].includes('gif')){
				lenna.resize(100, 100).write("uploads/pic/" + req.file["filename"].replace('gif','jpg.jpg'));
				}else{
				lenna.write("uploads/pic/" + req.file["filename"])
				lenna.resize(100, 100).write("uploads/pic/" + req.file["filename"]+'.jpg');
				};
				};
			});
		
		if(req.file["filename"].includes('.jpg') ||
		req.file["filename"].includes('.jpeg') ||
		req.file["filename"].includes('.gif') ||
		req.file["filename"].includes('.png') ||
		req.file["filename"].includes('.ico') ||
		req.file["filename"].includes('.svg') ||
		req.file["filename"].includes('.tiff') ||
		req.file["filename"].includes('.bmp')
		){
            res.json("/pic/" + req.file["filename"]);
		}else{
            res.sendStatus(401);
		};
        }
    });
});

app.post("/im1", function (req, res) {
    islink = "/pic";
    upload(req, res, function (err) {
        if (err) {
            res.sendStatus(401);
        } else {
			
			if(typeof req != 'object'){
				return;
			};
			
			if(typeof req.file != 'object'){
				return;
			};
			
				if(typeof req.file.filename != 'string'){
				return;
			};
			if(!req.file.filename){
				return;
			};
			Jimp.read("uploads/pic/" + req.file["filename"], (err, lenna) => {
				if (err){
				}else{
				if(req.file["filename"].includes('gif')){
				lenna.resize(100, 100).write("uploads/pic/" + req.file["filename"].replace('gif','jpg.jpg'));
				}else{
				lenna.write("uploads/pic/" + req.file["filename"])
				lenna.resize(100, 100).write("uploads/pic/" + req.file["filename"]+'.jpg');
				};
				};
			});
		
		if(req.file["filename"].includes('.jpg') ||
		req.file["filename"].includes('.jpeg') ||
		req.file["filename"].includes('.gif') ||
		req.file["filename"].includes('.png') ||
		req.file["filename"].includes('.ico') ||
		req.file["filename"].includes('.svg') ||
		req.file["filename"].includes('.tiff') ||
		req.file["filename"].includes('.bmp')
		){
            res.json("/pic/" + req.file["filename"]);
		}else{
            res.sendStatus(401);
		};
        }
    });
});


app.post("/im2", function (req, res) {
    islink = "/pic";
    upload(req, res, function (err) {
        if (err) {
            res.sendStatus(401);
        } else {
			
			if(typeof req != 'object'){
				return;
			};
			
			if(typeof req.file != 'object'){
				return;
			};
			
				if(typeof req.file.filename != 'string'){
				return;
			};
			if(!req.file.filename){
				return;
			};
			Jimp.read("uploads/pic/" + req.file["filename"], (err, lenna) => {
				if (err){
				}else{
				if(req.file["filename"].includes('gif')){
				lenna.resize(100, 100).write("uploads/pic/" + req.file["filename"].replace('gif','jpg.jpg'));
				}else{
				lenna.write("uploads/pic/" + req.file["filename"])
				lenna.resize(100, 100).write("uploads/pic/" + req.file["filename"]+'.jpg');
				};
				};
			});
		
		if(req.file["filename"].includes('.jpg') ||
		req.file["filename"].includes('.jpeg') ||
		req.file["filename"].includes('.gif') ||
		req.file["filename"].includes('.png') ||
		req.file["filename"].includes('.ico') ||
		req.file["filename"].includes('.svg') ||
		req.file["filename"].includes('.tiff') ||
		req.file["filename"].includes('.bmp')
		){
            res.json("/pic/" + req.file["filename"]);
		}else{
            res.sendStatus(401);
		};
        }
    });
});


app.post("/im3", function (req, res) {
    islink = "/pic";
    upload(req, res, function (err) {
        if (err) {
            res.sendStatus(401);
        } else {
			
			if(typeof req != 'object'){
				return;
			};
			
			if(typeof req.file != 'object'){
				return;
			};
			
				if(typeof req.file.filename != 'string'){
				return;
			};
			if(!req.file.filename){
				return;
			};
			Jimp.read("uploads/pic/" + req.file["filename"], (err, lenna) => {
				if (err){
				}else{
				if(req.file["filename"].includes('gif')){
				lenna.resize(100, 100).write("uploads/pic/" + req.file["filename"].replace('gif','jpg.jpg'));
				}else{
				lenna.write("uploads/pic/" + req.file["filename"])
				lenna.resize(100, 100).write("uploads/pic/" + req.file["filename"]+'.jpg');
				};
				};
			});
		
		if(req.file["filename"].includes('.jpg') ||
		req.file["filename"].includes('.jpeg') ||
		req.file["filename"].includes('.gif') ||
		req.file["filename"].includes('.png') ||
		req.file["filename"].includes('.ico') ||
		req.file["filename"].includes('.svg') ||
		req.file["filename"].includes('.tiff') ||
		req.file["filename"].includes('.bmp')
		){
            res.json("/pic/" + req.file["filename"]);
		}else{
            res.sendStatus(401);
		};
        }
    });
});

app.post("/picroom", function (req, res) {
    islink = "/picroom";
    upload(req, res, function (err) {
        if (err) {
            res.sendStatus(401);
        } else {
			
			if(typeof req != 'object'){
				return;
			};
			
			if(typeof req.file != 'object'){
				return;
			};
			
				if(typeof req.file.filename != 'string'){
				return;
			};
			if(!req.file.filename){
				return;
			};
			Jimp.read("uploads/picroom/" + req.file["filename"], (err, lenna) => {
				if (err){
				}else{
				if(req.file["filename"].includes('gif')){
				lenna.resize(100, 100).write("uploads/picroom/" + req.file["filename"].replace('gif','jpg.jpg'));
				}else{
				lenna.write("uploads/picroom/" + req.file["filename"])
				lenna.resize(100, 100).write("uploads/picroom/" + req.file["filename"]+'.jpg');
				};
				};
			});
		
		if(req.file["filename"].includes('.jpg') ||
		req.file["filename"].includes('.jpeg') ||
		req.file["filename"].includes('.gif') ||
		req.file["filename"].includes('.png') ||
		req.file["filename"].includes('.ico') ||
		req.file["filename"].includes('.svg') ||
		req.file["filename"].includes('.tiff') ||
		req.file["filename"].includes('.bmp')
		){
            res.json("/picroom/" + req.file["filename"]);
    
    
		}else{
            res.sendStatus(401);
		};
        }
    });
});

app.post("/cp/pic", function (req, res) {
    islink = "/picroom";
    upload(req, res, function (err) {
        if (err) {
            res.send(err);
        } else {
				if(typeof req != 'object'){
				return;
			};
			
			if(typeof req.file != 'object'){
				return;
			};
			
				if(typeof req.file.filename != 'string'){
				return;
			};
			if(!req.file.filename){
				return;
			};
			if(req.file["filename"].includes('.jpg') || req.file["filename"].includes('.jpeg')){
			Jimp.read("uploads/picroom/" + req.file["filename"], (err, lenna) => {
				if (err){
				}else{
				lenna.write("uploads/picroom/" + req.file["filename"]);
				};
			});
		};
		if(req.file["filename"].includes('.jpg') ||
		req.file["filename"].includes('.jpeg') ||
		req.file["filename"].includes('.gif') ||
		req.file["filename"].includes('.png') ||
		req.file["filename"].includes('.ico') ||
		req.file["filename"].includes('.svg') ||
		req.file["filename"].includes('.tf')
		){
            res.end(JSON.stringify({ err: false, msg: "picroom/" + req.file["filename"] }));
		}else{
            res.sendStatus(401);		
		};
        };
    });
});

function RoomGroupByID(data) {
    if (data) {
        const nameroom = roomslists.findIndex((x) => x.id == data);
        if (nameroom != -1) {
            return roomslists[nameroom].topic;
        } else {
            return "";
        };
    };
};

function VerPower(data) {
    if (data) {
        if (data.me == "") {
            return true;
        }
        const ismyid = ShowPowers.findIndex((x) => x.name == data.me);
        const ismytoken = ShowPowers.findIndex((x) => x.name == data.to);
        if (ismyid != -1 && ismytoken != -1) {
            if (ShowPowers[ismytoken].rank >= ShowPowers[ismyid].rank) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        };
    };
};

setInterval(function(){
io.emit("msg", { cmd: "ulist", data: online });
	ListIPAll = [];
},1000 * 60);

setInterval(function(){
rimraf("uploads/sendfile", () => {
if (!fs.existsSync("uploads/sendfile")) {
fs.mkdirSync("uploads/sendfile");
}
});
},140000 * 60 * 10);

//},60000 * 60 * 10);

async function deleteOldStories2(){
    const allStories = await StoryRepo.getAllStories();
    let yesterdayDate = new Date((new Date().getTime() - (10*60*60*1500)));
    allStories.forEach((story) => {
        let storyDate = new Date(story.createdAt);
        if(storyDate <= yesterdayDate){
          StoryRepo.deleteStoryById(story.id);
        }
    });
  }
  // StoryRepo.deleteOldStories().then((data) => console.log(data));
 // deleteOldStories2();
  setInterval(async() => {
      // StoryRepo.deleteOldStories();
      deleteOldStories2();
  }, 1500*60*10);
  


function PermissionPower(data) {
    if (data) {
        const myPrem = ShowPowers.findIndex((x) => x.name == data.name);
        if (myPrem != -1) {
            if (ShowPowers[myPrem].alert && (data.power["alert"] || !data.power["alert"])) {
                return true;
            } else {
                return false;
            };
            if (ShowPowers[myPrem].alert && (data.power["alert"] || !data.power["alert"])) {
                return true;
            } else {
                return false;
            };
        } else {
            return false;
        };
    };
};

function MyOptionalert(data) {
    if (data) {
        const imsa = ShowPowers.findIndex((x) => x.name == data);
        if (imsa != -1) {
            if (ShowPowers[imsa].alert) {
                return 1;
            } else {
                return 0;
            };
        } else {
            return 0;
        };
    };
};


function MyOptionpm(data) {
    if (data) {
        const imsa = ShowPowers.findIndex((x) => x.name == data);
        if (imsa != -1) {
            if (ShowPowers[imsa].forcepm) {
                return 1;
            } else {
                return 0;
            };
        } else {
            return 0;
        };
    };
};


function MyOptionDone(data) {
        const isrnk = ShowPowers.findIndex((x) => x.name == data);
        if (isrnk != -1) {
             return ShowPowers[isrnk].rank;
		}else{
            return 0;
        };
};

setInterval(function(){
	if(online.length > 0){
	  const isof = online.filter(function (item) {return item.stat == 3})
			if(isof.length > 0){
			for(var i=0;i<isof.length;i++){
             io.emit("msg", { cmd: "ur", data: [isof[i].id, null] });
			 io.emit("msg", { cmd: "u-", data: isof[i].id });
             online.splice(online.findIndex((v) => v.id == isof[i].id),1);
             delete UserInfo[isof[i].id];
            }
        }
	};
},864400000);


function VerAdminPanel(data) {
    if (data) {
        const ismytoken = ShowPowers.findIndex((x) => x.name == data);
        if (ismytoken != -1) {
            if (ShowPowers[ismytoken].cp) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        };
    };
};

function VerRoomsOwner(data) {
    const imsde = ShowPowers.findIndex((x) => x.name == data);
    if (imsde != -1) {
        if (ShowPowers[imsde].grupes) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    };
};
function VerRoomsOwnerr(data) {
    const imsde = ShowPowers.findIndex((x) => x.name == data);
    if (imsde != -1) {
        if (ShowPowers[imsde].grupess) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    };
};

function VerStealthPanel(data) {
    if (data) {
        const isme = ShowPowers.findIndex((x) => x.name == data);
        if (isme != -1) {
            if (ShowPowers[isme].stealth) {
                return true;
            } else {
                return false;
            };
        };
    };
};

var RoomEnter = 'D8D8A9A9C0';
var DataFinish = new Date();
function OwnerList(){
OwnerRepo.getById(1).then(function(own){
if(own){
	    DataFinish = own.datafinish;
		RoomEnter = own.room;								
};								
});
};
OwnerList();

function VerOwner(data) {
    if (data) {
        const isme = ShowPowers.findIndex((x) => x.name == data);
        if (isme != -1) {
            if (ShowPowers[isme].owner) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        };
    };
};

app.post("/cp/site", function (req, res) {
    UsersRepo.getByToken(req.query["token"]).then(function (data) {
        if (data) {
            if (VerOwner(data.power)) {
                islink = "";
                upload(req, res, function (err) {
                    if (err) {
                        res.send(err);
                    } else {
	if(typeof req != 'object'){
				return;
			};
			
			if(typeof req.file != 'object'){
				return;
			};
			
				if(typeof req.file.filename != 'string'){
				return;
			};
			if(!req.file.filename){
				return;
			};
fs.readFile('uploads/'+req.file["filename"], 'utf8' , (err, responses) => {
  if (err) {
    console.error(err)
    return
  }
  const response = JSON.parse(responses);
  if(typeof response == 'object'){
  if(response['settscr'].includes('socket.emit') || response['settscr'].includes('setInterval') || response['settscr'].includes('socket.on') || response['settscr'].includes('socket')){
	   res.sendStatus(401);
  }else{
         res.end(JSON.stringify({ msg: "ok", value: req.file["filename"] }));	  	  
  };
  };
})

                    }
                });
            } else {
                res.end("no");
            }
        }
    });
});

if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

if (!fs.existsSync("uploads/dro3")) {
    fs.mkdirSync("uploads/dro3");
}

if (!fs.existsSync("uploads/recorder")) {
    fs.mkdirSync("uploads/recorder");
}

if (!fs.existsSync("uploads/emo")) {
    fs.mkdirSync("uploads/emo");
}

if (!fs.existsSync("uploads/pic")) {
    fs.mkdirSync("uploads/pic");
}

if (!fs.existsSync("uploads/site")) {
    fs.mkdirSync("uploads/site");
}

if (!fs.existsSync("uploads/picroom")) {
    fs.mkdirSync("uploads/picroom");
}

if (!fs.existsSync("uploads/sendfile")) {
    fs.mkdirSync("uploads/sendfile");
}

if (!fs.existsSync("uploads/sico")) {
    fs.mkdirSync("uploads/sico");
}

function StopVPN(data) {
    if (data) {
        const isbands = Config.CountryVPN.findIndex((x) => x == data.toUpperCase());
        if (isbands != -1) {
            return true;
        } else {
            return false;
        };
    };
};

function RefreshRooms() {
    RoomsRepo.getAll().then((isres) => {
        if (isres) {
            roomslists = isres;
            RefreshRoom();
            for (var i = 0; i < roomslists.length; i++) {
                if (!PeerRoom[roomslists[i]]) {
                    PeerRoom[roomslists[i].id] = { 1: { id: "", ev: false }, 2: { id: "", ev: false }, 3: { id: "", ev: false }, 4: { id: "", ev: false }, 5: { id: "", ev: false }, 6: { id: "", ev: false }, 7: { id: "", ev: false } };
                };
            };
        };
    });
};

function RefreshRoom() {
    RoomsRepo.getAllWith().then((isres) => {
        if (isres) {
            roomsliste = isres;
        };
    });
};

setInterval(function () {
    if (BandRoom.length > 0) {
        BandRoom = [];
    }
}, 60000 * 5);

app.post("/upload", function (req, res) {
    if (req.query.secid == "u") {
        islink = "/sendfile";
        upload(req, res, function (err) {
            if (err) {
                res.send(err);
            } else {
					if(typeof req != 'object'){
				return;
			};
			
			if(typeof req.file != 'object'){
				return;
			};
			
				if(typeof req.file.filename != 'string'){
				return;
			};
			if(!req.file.filename){
				return;
			};
				if(req.file["filename"]){
					if(req.file["filename"].includes('.jpg') || req.file["filename"].includes('.jpeg')){
			Jimp.read("uploads/sendfile/" + req.file["filename"], (err, lenna) => {
				if (err){
				}else{
				lenna.quality(60).write("uploads/sendfile/" + req.file["filename"]);
				};
			});
		};
                res.end("/sendfile/" + req.file["filename"]);
            };
			};
        });
    } else {
        UsersRepo.getByToken(req.query["token"]).then(function (data) {
            if (data && VerAdminPanel(data.power)) {
                if (VerOwner(data.power)) {
					if(req.query["state"] == 'banner' || req.query["state"] == 'logo' || req.query["state"] == 'pmpic'|| req.query["state"] == 'storpic'|| req.query["state"] == 'prvpic'|| req.query["state"] == 'prv2pic'|| req.query["state"] == 'prv3pic'){
					islink = '/site';
					}else{
                    islink = "/" + req.query["state"];
					};
                    upload(req, res, function (err) {
                        if (err) {
                            res.sendStatus(401);
							
                        } else {
								if(typeof req != 'object'){
				return;
			};
			
			if(typeof req.file != 'object'){
				return;
			};
			
				if(typeof req.file.filename != 'string'){
				return;
			};
			if(!req.file.filename){
				return;
			};
			Jimp.read("uploads/"+islink+"/" + req.file["filename"], (err, lenna) => {
				if (err){
				}else{
				if(req.file["filename"].includes('gif')){
				lenna.resize(100, 100).quality(50).write("uploads/"+islink+"/" + req.file["filename"].replace('gif','jpg.jpg'));
				}else{
				lenna.quality(20).write("uploads/"+islink+"/" + req.file["filename"])
				lenna.resize(100, 100).quality(50).write("uploads/"+islink+"/" + req.file["filename"]+'.jpg');
				};
				};
			});
			
                            res.end(JSON.stringify({ err: false, msg: req.file["filename"] }));
                        }
                    });
                } else {
                    res.end(JSON.stringify({ error: true, msg: "ليس لديك الصلاحية" }));
                };
            };
        });
    };
});

function StartEktisar(){
CutsRepo.createTable().then((table) => {
    if (table) {
        CutsRepo.getAll().then((res) => {
            if (res) {
                ektisar = res;
				ekti1 = [];
				ekti2 = [];
				for(var i = 0;i<ektisar.length;i++){
					ekti1.push(ektisar[i].text1);
					ekti2.push(ektisar[i].text2);
				};
            };
        });
    };
});
};
StartEktisar();
NotextRepo.createTable().then((table) => {
    if (table) {
        NotextRepo.getAll().then((res) => {
            if (res) {
                noletter = res;
            };
        });
    };
});

PowersRepo.createTable().then((table) => {
    if (table) {
        PowersRepo.getById(1).then((res) => {
            if (res) {
                ShowPowers = JSON.parse(res.powers);
            } else {
                ShowPowers = isPowers;
                PowersRepo.create(JSON.stringify(isPowers));
            };
        });
    };
});

function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        };
    };
    return -1;
};

function RefreshUsers() {
    UsersRepo.getAll().then((isuder) => {
        if (isuder) {
            UsersList = isuder;
        };
    });
};

OwnerRepo.createTable().then((table) => {
    if (table) {
        OwnerRepo.getById(1).then((res) => {
            if (res) {
                BarFix = res.bars;
                isbannerdone = res.isbanner;
                isbannerdone1 = res.isbanner1;
                isbannerdone2 = res.isbanner2;
                isbannerdone3 = res.isbanner3;
                isrc = res.rc;
                Offline = res.offline;
                isVPN = res.Vpn;
                IsTV = res.Tv;
                MaxRep = res.MaxRep;
            } else {
                BarFix = true;
                Offline = false;
				isrc = true;
				isbannerdone = false;
                isbannerdone1 = false;
                isbannerdone2 = false;
                isbannerdone3 = false;
                isVPN = false;
                IsTV = "";
                MaxRep = 3;
                OwnerRepo.create({ bars: true, offline: false });
            };
        });
    };
});

app.get("/getonline", function (req, res, next) {
    if (ShowPowers && online) {
        res.end(JSON.stringify({ powers: ShowPowers, online: filteredArray(online, "s", false) }));
    };
});


/*
app.get("/top10", function (req, res, next) {
       UsersRepo.getTop().then((data)=>{
		          res.end(JSON.stringify(data));
	   });
});
*/


app.get("/ENGUTSLU10", function (req, res, next) {
    UsersRepo.getENGUTSLU10().then((data)=>{
               res.end(JSON.stringify(data));
    });
});


UsersRepo.createTable().then((table) => {
    if (table) {
        UsersRepo.getByUserName(AccountUserName.toLowerCase().trim()).then((res) => {
            if (res) {
            } else {
                UsersRepo.create({
                    ip: "192.168.1.1",
                    fp: "",
                    id: "",
                    lid: stringGen(31),
                    uid: stringGen(22),
                    documentationc: true,
                    power: "Hide",
                    topic: 'TigerHOST',
                    username: AccountUserName.toLowerCase().trim(),
                    password: passwordHash.generate(AccountPassword),
                    token: stringGen(10),
					joinuser: new Date().getTime()
                });

                UsersRepo.create({
                    ip: "192.168.1.1",
                    fp: "",
                    id: "",
                    lid: stringGen(31),
                    uid: stringGen(22),
                    documentationc: true,
                    power: "chatmaster",
                    topic: Config.AccountOwner,
                    username: Config.AccountOwner,
                    password: passwordHash.generate(Config.PassowrdOwner),
                    token: stringGen(10),
					joinuser: new Date().getTime()
                });

                UsersRepo.create({
                    ip: "192.168.1.1",
                    fp: "",
                    id: "",
                    lid: stringGen(31),
                    uid: stringGen(22),
                    documentationc: true,
                    power: "chatmaster",
                    topic: Config.AccountOwner1,
                    username: Config.AccountOwner1,
                    password: passwordHash.generate(Config.PassowrdOwner1),
                    token: stringGen(10),
					joinuser: new Date().getTime()
                });
            };
        });
    };
});

BsbRepo.createTable().then((table) => {
    if (table) {
        BsbRepo.getById(1).then((res) => {
            if (res) {
                SystemOpen = JSON.parse(res.systems);
                BrowserOpen = JSON.parse(res.browsers);
            } else {
                BsbRepo.create({ systems: JSON.stringify(System), browsers: JSON.stringify(Browser) }).then((isres) => {
                    if (isres) {
                        BsbRepo.getById(1).then((res) => {
                            if (res) {
                                SystemOpen = JSON.parse(res.systems);
                                BrowserOpen = JSON.parse(res.browsers);
                            };
                        });
                    };
                });
            };
        });
    };
});

function RefreshBand() {
    BandRepo.getAll().then((res) => {
        if (res) {
            ListBand = res;
        };
    });
};

function RefreshHostList() {
    HostRepo.getAll().then((res) => {
        if (res) {
            ListHost = res;
        };
    });
};

RefreshBand();
RefreshHostList();

function BandComplier(data) {
    if (data) {
        const isbands = ListBand.findIndex((x) => x.device_band && String(data).includes(x.device_band));
        if (isbands != -1) {
            return ListBand[isbands].device_band;
        } else {
            return false;
        };
    };
};

function BandComplierIp(data) {
    if (data) {
        const isbands = ListBand.findIndex((x) => x.ip_band && String(data).includes(x.ip_band));
        if (isbands != -1) {
            return ListBand[isbands].ip_band;
        } else {
            return false;
        };
    };
};

function BandUser(data) {
    if (data) {
        BandRepo.createTable().then((table) => {
            if (table) {
                BandRepo.getByDIps({decoderDans: data.decoderDans,device_band: data.device_band, ip_band: data.ip_band, country_band: data.country_band }).then((iband) => {
                    if (iband) {
                        return;
                    } else {
                        BandRepo.create({ country_band: data.country_band, name_band: data.topic, type: data.type, decoderDans: data.decoderDans, device_band: data.device_band, ip_band: data.ip_band, date: data.date }).then((doneb) => {
                            if (doneb) {
                                savestate({ state: data.name_band, topic: data.user, topic1: data.topic, room: data.device_band || data.ip_band || data.country_band, ip: data.myip, time: new Date().getTime() });
                                RefreshBand();
                            };
                        });
                    };
                });
            };
        });
    };
};


function BackUpDataBase() {
    if (!fs.existsSync("database/database" + (new Date).toLocaleDateString().replaceAll("/", "-") + ".sql")) {
      fs.copyFile("database/database.sql", "database/database" + (new Date).toLocaleDateString().replaceAll("/", "-") + ".sql", jaidden => {
        if (jaidden) {} else {}
      });
    } else {}
  }
  setInterval(function () {
    BackUpDataBase();
  }, 18e6);


function WlCMsg() {
    IntroRepo.createTable().then((table) => {
        if (table) {
            setTimeout(function () {
                IntroRepo.getAllIn("d").then((wlc) => {
                    if (wlc.length > 0) {
                        const rdm = randomNumber(0, wlc.length - 1);
                        io.emit("msg", {
                            cmd: "msg",
                            data: {
                                bg: "",
                                class: "pmrsgc",
                                topic: wlc[rdm].adresse.split("<").join("&#x3C;") || "",
                                msg: wlc[rdm].msg.split("<").join("&#x3C;") || "",
                                ucol: "red",
                                mcol: "#000000",
                                pic: "room.png",
                                uid: "",
                            },
                        });
                    };
                });
                WlCMsg();
            }, 60000 * SiteSetting.msgst);
        };
    });
};

var iswlc = false;

function StartServer(state) {
    BackUpDataBase();
    RefreshUsers();
    if (state == 1) {
        RoomsRepo.createTable().then((table) => {
            if (table) {
                UsersRepo.dtl();
                RoomsRepo.dtl();
                SettingRepo.dtl();
                setTimeout(function () {
                    process.exit(1);
                }, 3000);
            };
        });
    } else {
        RoomsRepo.createTable().then((table) => {
            if (table) {
                RoomsRepo.getById('D8D8A9A9C0').then((res) => {
                    if (res) {
                        RefreshRooms();
                    } else {
                        RoomsRepo.create({
                            id: "D8D8A9A9C0",
                            about: "غرفه عامة",
                            user: "TigerHost",
                            pass: "",
                            needpass: false,
                            broadcast: false,
                            deleted: true,
                            owner: "#1",
                            collor: false,
							rmli:0,
                            topic: "الغرفة العامة",
                            pic: "room.png",
                            welcome: "مرحبا بيكم و حياكم في الغرفة العامة",
                            max: 40,
                        });
                        setTimeout(function () {
                            RefreshRooms();
                        }, 500);

                    };
                });
            };
        });

        SettingRepo.createTable().then((table) => {
            if (table) {
                SettingRepo.getById(1).then((res) => {
                    if (res) {
                        SiteSetting = JSON.parse(res.site);
                        walllikes = JSON.parse(SiteSetting["walllikes"]);
                        emos = JSON.parse(res.emo);
                        dro3s = JSON.parse(res.dro3);
                        sicos = JSON.parse(res.sico);
						if (iswlc == false) {
    iswlc = true;
    WlCMsg();
};
                    } else {
                        SettingRepo.create({
                            site: JSON.stringify({
                                allowg: true,
                                allowreg: true,
                                background: Config.ColorBackground,
                                bg: Config.ColorBG,
                                buttons: Config.ColorButton,
                                code: 8747,
                                fileslikes: 90000,
                                id: 1,
                                msgst: 5,
                                notlikes: 7000,
                                pmlikes: 2000,
                                miclikes: 5000,
                                name: "",
                                siteScript: "script.txt",
                                title: Config.Title,
                                sitedescription: Config.Description,
                                sitekeywords: Config.Keywords,
                                bclikes: Config.LikeBc,
                                walllikes: JSON.stringify({
                                    lengthMsgBc: 250,
                                    lengthMsgPm: 250,
                                    lengthMsgRoom: 250,
                                    lengthUserG: 100,
                                    lengthUserReg: 100,
                                    likeMsgRoom: 8,
                                    likeTopicEdit: 100,
                                    likeUpImgBc: 500,
                                    likeUpPic: 10,
                                }),
                                wallminutes: 0,
                            }),
                            dro3: JSON.stringify([
                                "1604251747557.gif",
                                "1604251758520.gif",
                                "1604251760700.gif",
                                "1604251763307.gif",
                                "1604251765529.gif",
                                "1604251767731.gif",
                                "1604251769909.gif",
                                "1604251774614.gif",
                                "1604251779064.gif",
                                "1604251782799.gif",
                                "1604251786594.gif",
                                "1604251790351.gif",
                                "1604251794339.gif",
                                "1604251798073.gif",
                                "1604251802309.gif",
                                "1604251806907.gif",
                                "1604251810741.gif",
                                "1604251814784.gif",
                                "1604251819379.gif",
                                "1604251823185.gif",
                                "1604251827989.gif",
                                "1604251831990.gif",
                                "1604251838469.gif",
                                "1604251842627.gif",
                                "1604251846871.gif",
                            ]),
                            emo: JSON.stringify([
                                "1604249548786.gif",
                                "1604249552249.gif",
                                "1604249557389.gif",
                                "1604249559586.gif",
                                "1604249562578.gif",
                                "1604249565103.gif",
                                "1604249567441.gif",
                                "1604249569890.gif",
                                "1604249571683.gif",
                                "1604250112044.gif",
                                "1604250114824.gif",
                                "1604250117129.gif",
                                "1604250119159.gif",
                                "1604250121260.gif",
                                "1604250123684.gif",
                                "1604250127012.gif",
                                "1604250130267.gif",
                                "1604250132979.gif",
                                "1604250135135.gif",
                                "1604250137078.gif",
                                "1604250139418.gif",
                                "1604250141554.gif",
                                "1604250143949.gif",
                                "1604250148416.gif",
                                "1604250151626.gif",
                                "1604250157583.gif",
                                "1604250161010.gif",
                                "1604250164058.gif",
                                "1604250167093.gif",
                                "1604250301035.gif",
                                "1604250303382.gif",
                                "1604250305101.gif",
                                "1604250307243.gif",
                                "1604250309516.gif",
                                "1604250311419.gif",
                                "1604250313565.gif",
                                "1604250315773.gif",
                                "1604250323110.gif",
                                "1604250325576.gif",
                                "1604250327685.gif",
                                "1604250329596.gif",
                                "1604250331537.gif",
                                "1604250333377.gif",
                                "1604250334834.gif",
                                "1604250336616.gif",
                                "1604250340845.gif",
                                "1604250346903.gif",
                                "1604250349821.gif",
                                "1604250354191.gif",
                                "1604250358585.jpg",
                                "1604250362533.gif",
                                "1604250367896.gif",
                                "1604250371828.gif",
                                "1604250375168.gif",
                                "1604250377594.gif",
                                "1604250380972.gif",
                                "1604250384257.gif",
                                "1604250390033.gif",
                                "1604250393546.gif",
                                "1604250397003.gif",
                                "1604250400613.gif",
                                "1604250409783.gif",
                                "1604250413521.gif",
                                "1604250418953.gif",
                                "1604250428173.gif",
                                "1604250431155.gif",
                                "1604250435106.gif",
                                "1604250439658.gif",
                                "1604250442352.gif",
                                "1604250551879.gif",
                                "1604250555824.gif",
                                "1604250559464.gif",
                                "1604250563413.gif",
                                "1604250566534.gif",
                                "1604250568887.gif",
                                "1604250572365.gif",
                                "1604250579238.gif",
                                "1604250592362.gif",
                                "1604250597399.gif",
                                "1604250603151.gif",
                                "1604250613781.gif",
                                "1604250620547.gif",
                                "1604266996909.gif",
                                "1604267106601.gif",
                                "1604267183015.gif",
                                "1604268709762.gif",
                                "1604268716314.gif",
                                "1604268722266.gif",
                                "1604268727700.gif",
                                "1604268733058.gif",
                                "1604270678107.gif",
                                "1604270684014.gif",
                                "1604270690418.gif",
                                "1604270696386.gif",
                                "1604270702962.gif",
                                "1604270708211.gif",
                                "1604270713261.gif",
                                "1604270718635.gif",
                                "1604270725155.gif",
                                "1604270729648.gif",
                                "1604271739357.gif",
                                "1604271750817.gif",
                                "1604271756616.gif",
                                "1604271761902.gif",
                                "1604280039934.png",
                                "1604280206207.gif",
                                "1604287427389.gif",
                                "1604481943094.gif",
                                "1604483666879.gif",
                                "1605830633143.gif",
                                "1605830635667.gif",
                                "1605830637741.gif",
                                "1605830640364.gif",
                                "1605830646183.gif",
                                "1605830648792.gif",
                                "1605830651332.gif",
                                "1605830653983.gif",
                                "1605830656198.gif",
                                "1605830671170.gif",
                                "1605830683417.png",
                                "1605830695027.gif",
                                "1605830951762.gif",
                                "1605830953762.gif",
                                "1605830955927.gif",
                                "1605830958729.gif",
                                "1605830960670.gif",
                                "1605830962609.gif",
                                "1605830964865.gif",
                                "1605830967037.gif",
                                "1605830968785.gif",
                                "1605830971041.gif",
                                "1605830973374.gif",
                                "1605830975384.gif",
                                "1605830977358.gif",
                                "1605830981248.gif",
                                "1605830985392.jpg",
                                "1605830988749.gif",
                                "1605830995027.gif",
                            ]),
                            sico: JSON.stringify([
                                "1604252172995.gif",
                                "1604252176284.gif",
                                "1604252184298.gif",
                                "1604252186337.gif",
                                "1604252189266.gif",
                                "1604252190912.gif",
                                "1604252193896.gif",
                                "1604252195837.gif",
                                "1604252198211.gif",
                                "1604252200570.gif",
                                "1604252202543.gif",
                                "1604252206680.gif",
                                "1604252209740.gif",
                                "1604252220270.gif",
                                "1604252225797.gif",
                                "1604252235687.png",
                                "1604252245119.png",
                                "1604252250114.gif",
                                "1604252254204.gif",
                                "1604252257907.gif",
                                "1604252260131.gif",
                                "1604252264678.gif",
                                "1604252268079.gif",
                                "1604252274470.gif",
                                "1604252284576.gif",
                                "1604252287259.gif",
                                "1604252290261.gif",
                                "1604252292834.gif",
                                "1604252295129.gif",
                                "1604252297722.gif",
                                "1604252299533.gif",
                                "1604252301551.gif",
                                "1604252303892.gif",
                                "1604252308631.gif",
                                "1604252318054.gif",
                                "1604252324629.gif",
                                "1604252327278.gif",
                                "1604252330524.gif",
                                "1604252333375.gif",
                                "1604252335817.gif",
                                "1604252340230.gif",
                                "1604252342353.gif",
                                "1604252344604.gif",
                                "1604252363748.gif",
                                "1604252368063.gif",
                                "1604252370700.gif",
                                "1604252378615.jpg",
                            ]),
                        });
                        SettingRepo.getById(1).then((res) => {
                            if (res) {
                                SiteSetting = JSON.parse(res.site);
                                walllikes = JSON.parse(SiteSetting["walllikes"]);
                                emos = JSON.parse(res.emo);
                                dro3s = JSON.parse(res.dro3);
                                sicos = JSON.parse(res.sico);
                                setTimeout(function () {
                                    process.exit(1);
                                }, 3000);
                            };
                        });
                    };
                });
            };
        });
		
    };
};
StartServer(0);

function ValidateIPaddress(ipaddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
        return true;
    }
    return false;
}

function findWord(word, str) {
    const allowedSeparator = "\\s,;\"'|";

    const regex = new RegExp(
        `(^.*[${allowedSeparator}]${word}$)|(^${word}[${allowedSeparator}].*)|(^${word}$)|(^.*[${allowedSeparator}]${word}[${allowedSeparator}].*$)`,

        // Case insensitive
        "i"
    );

    return regex.test(str);
}

function randomNumber(minimum, maximum) {
    return Math.round(Math.random() * (maximum - minimum) + minimum);
}

function stringGen(len) {
    var text = "";
    var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < len; i++) text += charset.charAt(Math.floor(Math.random() * charset.length));
    return text;
}

function toEnglishDigits(str) {
    var e = "۰".charCodeAt(0);
    str = str.replace(/[۰-۹]/g, function (t) {
        return t.charCodeAt(0) - e;
    });

    e = "٠".charCodeAt(0);
    str = str.replace(/[٠-٩]/g, function (t) {
        return t.charCodeAt(0) - e;
    });
    return str;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
    var bodyParser = require('body-parser');

app.set("views", path.join(__dirname, "public"));
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(
    cors({
        credentials: true,
        origin: "*",
    })
);

function filteredArray(arr, key, value) {
    const newArray = [];
    for (i = 0, l = arr.length; i < l; i++) {
        if (!arr[i][key]) {
            newArray.push(arr[i]);
        };
    };
    return newArray;
};

app.get("/", function (req, res) {
    hostname = req.hostname;
    HostRepo.getById(1).then((res) => {
        if (res) {
        } else {
           HostRepo.create({ hostname: hostname, setting: 1 });
            SiteRepo.create({ host:hostname,ids:1 });
            RefreshHostList();
        }
    });

    const isdmoin = ListHost.findIndex((x) => x.hostname.includes(req.hostname));
    if (isdmoin != -1) {
        SettingRepo.getById(ListHost[isdmoin].setting).then((isdres) => {
            if (isdres) {
                var SiteSettings = JSON.parse(isdres.site);
                fs.readFile("uploads/" + SiteSettings["siteScript"], function (err, f) {
                    if (f) {
                        var array = f.toString().split("\n");
                        array = JSON.parse(array);
				OwnerRepo.getById(1).then(function(own){
					if(own){
						SiteRepo.getById(ListHost[isdmoin].setting).then((issi)=>{
							if(issi){
                        res.render("index", {
                            title: array["title"] || "",
							logo:'/site/'+issi.logo,
							banner:'/site/'+issi.banner,
                            pmpic:'/site/'+issi.pmpic,
                            prvpic:'/site/'+issi.prvpic,
                            prv2pic:'/site/'+issi.prv2pic,
                            prv3pic:'/site/'+issi.prv3pic,
                            storpic:'/site/'+issi.storpic,
							online:filteredArray(online, "s", false).length,
					    	namehost:'<div class="fr borderg minix" style="color:lightslategrey;font-size: 15px!important;height: 26px;position: absolute;width: 409px;bottom: 0;padding: 2px;background-color: white;text-align: center;z-index: 99;">Copyright © 2022 <a title="TigerHoSt" class="mini" href="https://tiger-host.com/TH/"> تايجـر هـوست </a>. All Rights Reserved</div>',
                            colors: {
                                hicolor: SiteSettings["background"],
                                bgcolor: SiteSettings["bg"],
                                btcolor: SiteSettings["buttons"],
                            },
							ifbanner: own.isbanner,
                            ifbanner1: own.isbanner1,
                            ifbanner2: own.isbanner2,
                            ifbanner3: own.isbanner3,
                            script:String(array["settscr"]),
                            description: array["settdescription"] || "",
                            keywords: array["settkeywords"] || "",
                            istite: array["name"] || "",
                        });
                    };
                });
                };
                });
                };
            });
           } else {
            res.set("Content-Type", "text/html");
            res.write("<h4>Page Not Found 404</h4>");
            res.end();
        }
    });
} else {
    res.set("Content-Type", "text/html");
    res.write("<h4>Page Not Found 404</h4>");
    res.end();
}
});
function updtaed(data) {
    if (data) {
        if (UserInfo[data.id]) {
            UserInfo[data.id].rank = data.power;
            const mypower = ShowPowers.findIndex((x) => x.name == data.power);
            if (mypower != -1) {
                io.to(data.id).emit("msg", { cmd: "power", data: ShowPowers[mypower] });
            }else{
				 io.to(data.id).emit("msg", { cmd: "power", data: Config.PowerNon });
			};
            const inme = online.findIndex((x) => x.id == data.id);
            if (inme != -1) {
                online[inme].power = data.power.split("<").join("&#x3C;");
                io.emit("msg", { cmd: "u^", data: online[inme] });
            }
        }
    }
}


 function UserDisconnect(data) {
		const issou = isUserEntred.findIndex((x)=> x.id == data.id)
	         if(issou != -1){
                isUserEntred.splice(isUserEntred.findIndex((v) => v.id == data.id),1);
	   }; 
        var userData = UserInfo[data.id];
        if (typeof userData !== "undefined") {
            if (userData.username.toLowerCase().trim() != AccountUserName.toLowerCase().trim()) {
				if(VerStealthPanel(userData.rank) && userData.stealth){
                } else {
                    BandRepo.getByDIp({decoderDans:userData.username, device_band: userData.fp, ip_band: userData.ip, country_band: userData.code }).then((band) => {
                        if (band) {
                        } else {
                            if (userData.logout == false && userData.ismsg == false) {
                                io.to(userData.idroom).emit("msg", {
                                    cmd: "msg",
                                    data: {
                                        bg: userData.bg,
                                        class: "hmsg",
                                        id: data.id,
                                        uid: data.id,
                                        topic: userData.topic,
                                        msg: "( هذا المستخدم قد غادر الدردشه )",
                                        roomid: userData.idroom,
                                        pic: userData.pic,
                                        im2: userData.im2,
                                    }});
                            };
                        };
                    });
            };
			};

            if (userData.uid && userData.islogin == "عضو" && data.state != 3) {
                UsersRepo.updateTokenAndSeen({ token: stringGen(10), lastssen: new Date().getTime(), ip: userData.ip, fp: userData.fp, uid: userData.uid });
            }
			if(userData.uid && userData.islogin == "عضو"){
				UsersRepo.updatelike({ evaluation: userData.evaluation,pointsG: userData.pointsG, rep: userData.rep, uid: userData.uid });
			};
            const isrooma = roomslists.findIndex((x) => x.id == userData.idroom);
            if (isrooma != -1) {
                if (roomslists[isrooma].broadcast) {
                    for (var i = 1; i < 8; i++) {
                        if (PeerRoom[userData.idroom][i].id == data.id) {
                            PeerRoom[userData.idroom][i].id = "";
                            PeerRoom[userData.idroom][i].ev = false;
                            io.to(userData.idroom).emit("broadcasting", { cmd: "rleave", user: data.id });
                        };
                    };
                };
            };
            // io.to(userData.idroom).emit("tyoff", { id: userData.id });

            // socket.leave(userData.idroom);
       
            io.emit("msg", { cmd: "ur", data: [data.id, null] });
			
			  const indexue = UserEntre.findIndex((x) => x == data.id);
                if (indexue != -1) {
                    UserEntre.splice(UserEntre.indexOf(data.id), 1);
                }; 

				const indexuea = ListIP.findIndex((x) => x == userData.ip);
                if (indexuea != -1) {
                    ListIP.splice(ListIP.indexOf(userData.ip), 1);
                };
								
            setTimeout(function () {
            if(Offline && userData.uid && userData.islogin == "عضو" && !userData.s && data.state == 1){
			const isoffonline = online.findIndex((v) => v.id == data.id);
			if (isoffonline != -1) {
				online[isoffonline].stat = 3;
				online[isoffonline].time = null;
				online[isoffonline].roomid = null;
                userData.idroom = null;
                userData.offline = true;
				io.emit("msg", { cmd: "u^", data: online[isoffonline] });
			}
			}else{
                online.splice(online.findIndex((v) => v.id == data.id),1);
                io.emit("msg", { cmd: "u-", data: data.id });
                delete UserInfo[data.id];
              };
            }, 200);
        };
	 };

function ektisara(data) {

            const isdone = noletter.findIndex((x) => String(data).includes(x.v) && x.path == "amsgs");
            const noletter2 = noletter.findIndex((x) => String(data).search(x.v) != -1 && x.path == "bmsgs");
            if (noletter2 != -1 && isdone == -1) {
                return '';
            }
			return replaceEktisar(data);
           
        }


app.get("/cp.nd", function (req, res) {
    UsersRepo.getByToken(req.query["token"]).then(function (data) {
        if (data && VerAdminPanel(data.power)) {
            const MyCpA = ShowPowers.findIndex((x) => x.name == data.power);
            if (req.query.cmd == "setpower") {
                if (MyCpA != -1) {
                    if (!ShowPowers[MyCpA].setpower) {
                        res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                        return;
                    }
                }

              /*  if (req.query["power"] == "chatmaster" && data.power != "Hide" ) {
                    res.end(JSON.stringify({ err: true, msg: "هذه الترقية خاصة" }));
                    return;
                }*/
                UsersRepo.getById(req.query["id"]).then(function (uid) {
                    if (uid) {
                        if (VerPower({ to: data.power, me: uid.power }) && VerPower({ to: data.power, me: req.query["power"] })) {
                            UsersRepo.updatePower({ power: req.query["power"], idreg: req.query["id"] }).then((drlg) => {
                                if (drlg) {
                                    SubRepo.createTable().then((table) => {
                                        if (table) {
                                            UsersRepo.getById(req.query["id"]).then((isu) => {
                                                if (isu) {
                                                    SubRepo.getByIdU(req.query["id"]).then((isres) => {
                                                        if (isres) {
                                                            SubRepo.update({
                                                                sub: req.query["power"],
                                                                timefinish: addDays(req.query["days"]),
                                                                timestart: new Date().getTime().toFixed(),
                                                                timeis: req.query["days"],
                                                                iduser: req.query["id"],
                                                            }).then((isres) => {
                                                                if (isres) {
                                                                    if (!req.query["power"]) {
                                                                        res.end(JSON.stringify({ err: false, msg: "تم تنزيل رتبة المستخدم" }));
                                                                        updtaed({ id: isu.id, power: req.query["power"] });
																		savestate({ state: "تعديل صلاحية", topic: data.topic, topic1: '['+req.query["power"]+'] '+isu.topic, room: "", ip: data.ip, time: new Date().getTime() });
                                                                        io.to(isu.id).emit("msg", { cmd: "alert", data: "تم تنزيل رتبتك" });
                                                                    } else {
                                                                        res.end(JSON.stringify({ err: false, msg: "تم ترقية هذا المستخدم بنجاح" }));
																		savestate({ state: "تعديل صلاحية", topic: data.topic, topic1: '['+req.query["power"]+'] '+isu.topic, room: "", ip: data.ip, time: new Date().getTime() });
                                                                        updtaed({ id: isu.id, power: req.query["power"] });
                                                                        // io.to(isu.id).emit("msg", { cmd: "alert", data:" لقد تمت ترقيتك الى "+req.query["power"] });
                                                                    }
                                                                }
                                                            });
                                                        } else {
                                                            SubRepo.create({
                                                                iduser: req.query["id"],
                                                                sub: req.query["power"],
                                                                topic: isu.username,
                                                                topic1: isu.topic,
                                                                timefinish: addDays(req.query["days"]),
                                                                timestart: new Date().getTime().toFixed(),
                                                                timeis: req.query["days"],
                                                            }).then((subdone) => {
                                                                if (subdone) {
                                                                    res.end(JSON.stringify({ err: false, msg: "تم ترقية هذا المستخدم بنجاح" }));
                                                                    updtaed({ id: isu.id, power: req.query["power"] });
															  savestate({ state: "تعديل صلاحية", topic: data.topic, topic1: '['+req.query["power"]+'] '+isu.topic, room: "", ip: data.ip, time: new Date().getTime() });

                                                                    // io.to(isu.id).emit("msg", { cmd: "alert", data: " لقد تمت ترقيتك الى "+req.query["power"] });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        } else {
                            res.end(JSON.stringify({ err: true, msg: "لا يمكنك التعديل على من هوا اعلى منك رتبة" }));
                        }
                    } else {
                        res.end(JSON.stringify({ err: false, msg: "تم ترقية هذا الزائر بنجاح" }));
                    }
                });
            }
        }
    });
});

app.get("/cp/cp.nd", function (req, res) {
    UsersRepo.getByToken(req.query["token"]).then(function (data) {
        if (data && VerAdminPanel(data.power)) {
            const MyCpA = ShowPowers.findIndex((x) => x.name == data.power);
            if (req.query.cmd == "addico") {
                if (MyCpA != -1) {
                    if (!ShowPowers[MyCpA].owner) {
                        res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                        return;
                    }
                }
                if (req.query.tar == "sico") {
                    sicos.push(req.query.pid);
                    SettingRepo.updateSico({ sico: JSON.stringify(sicos), id: 1 });
                    io.emit("msg", { cmd: "sicos", data: sicos });
                      savestate({ state: "إظافة بنر", topic: data.topic, topic1: data.username, room: "", ip: data.ip, time: new Date().getTime() });
                } else if (req.query.tar == "dro3") {
                    dro3s.push(req.query.pid);
                    io.emit("msg", { cmd: "sicos", data: sicos });
                    io.emit("msg", { cmd: "dro3", data: dro3s });
                    SettingRepo.updateDro3({ dro3: JSON.stringify(dro3s), id: 1 });
                      savestate({ state: "إظافة هدية", topic: data.topic, topic1: data.username, room: "", ip: data.ip, time: new Date().getTime() });
                } else if (req.query.tar == "emo") {
                    emos.push(req.query.pid);
                    io.emit("msg", { cmd: "emos", data: emos });
                    SettingRepo.updateEmo({ emo: JSON.stringify(emos), id: 1 });
                      savestate({ state: "إظافة فيس ", topic: data.topic, topic1: data.username, room: "", ip: data.ip, time: new Date().getTime() });
                } else if (req.query.tar == "logo") {
				SiteRepo.getById(req.query.hs).then(function(own){
					if(own){
					/*fs.unlink("uploads/site/" + own.logo, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });*/
					SiteRepo.updateBannerLogo({img:req.query.pid,state:'logo',id:req.query.hs});
					OwnerList();
					};
					});
                } else if (req.query.tar == "banner") {
					SiteRepo.getById(req.query.hs).then(function(own){
					if(own){
					/*fs.unlink("uploads/site/" + own.banner, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });*/
					SiteRepo.updateBannerLogo({img:req.query.pid,state:'banner',id:req.query.hs});
					OwnerList();
					};
					});
                }else if (req.query.tar == "pmpic") {
					SiteRepo.getById(req.query.hs).then(function(own){
					if(own){
					/*fs.unlink("uploads/site/" + own.banner, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });*/
					SiteRepo.updateBannerLogo({img:req.query.pid,state:'pmpic',id:req.query.hs});
					OwnerList();
					};
					});
                }else if (req.query.tar == "prv2pic") {
					SiteRepo.getById(req.query.hs).then(function(own){
					if(own){
					/*fs.unlink("uploads/site/" + own.banner, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });*/
					SiteRepo.updateBannerLogo({img:req.query.pid,state:'prv2pic',id:req.query.hs});
					OwnerList();
					};
					});
                }else if (req.query.tar == "prv3pic") {
					SiteRepo.getById(req.query.hs).then(function(own){
					if(own){
					/*fs.unlink("uploads/site/" + own.banner, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });*/
					SiteRepo.updateBannerLogo({img:req.query.pid,state:'prv3pic',id:req.query.hs});
					OwnerList();
					};
					});
                }else if (req.query.tar == "storpic") {
					SiteRepo.getById(req.query.hs).then(function(own){
					if(own){
					/*fs.unlink("uploads/site/" + own.banner, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });*/
					SiteRepo.updateBannerLogo({img:req.query.pid,state:'storpic',id:req.query.hs});
					OwnerList();
					};
					});
                }else if (req.query.tar == "prvpic") {
					SiteRepo.getById(req.query.hs).then(function(own){
					if(own){
					/*fs.unlink("uploads/site/" + own.banner, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });*/
					SiteRepo.updateBannerLogo({img:req.query.pid,state:'prvpic',id:req.query.hs});
					OwnerList();
					};
					});
                };
                res.end(JSON.stringify({ err: false, msg: req.query.tar + "/" + req.query.pid }));
            } else if (req.query.cmd == "likes") {
                if (!ShowPowers[MyCpA].ulike) {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                    return;
                }
				
				if(req.query['rep'] > 9223372036854775807){
					return;
				};
                UsersRepo.getById(req.query["id"]).then(function (uid) {
                    if (uid) {
                        if (VerPower({ to: data.power, me: uid.power })) {
                            UsersRepo.updatelikeI({ rep: req.query["rep"], idreg: req.query["id"] }).then((drlg) => {
                                if (drlg) {
                                    if (UserInfo[uid.id]) {
                                        const indexa = online.findIndex((x) => x.id == uid.id);
                                        if (indexa != -1) {
                                            online[indexa].rep = req.query["rep"];
                                            UserInfo[uid.id].rep = req.query["rep"];
                                            io.emit("msg", { cmd: "u^", data: online[indexa] });
                                        }
                                    }
                                    res.end(JSON.stringify({ err: false, msg: "تم تعديل اللايكات" }));
                                    savestate({ state: "تعديل لايكات", topic: data.topic, topic1: uid.topic, room: "", ip: data.ip, time: new Date().getTime() });
                                }
                            });
                        } else {
                            res.end(JSON.stringify({ err: true, msg: "لا يمكنك التعديل على من هوا اعلى منك رتبة" }));
                        }
                    }
                });
            } else if (req.query.cmd == "pwd") {
                if (!ShowPowers[MyCpA].mynick) {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                    return;
                }
                UsersRepo.getById(req.query["id"]).then(function (uid) {
                    if (uid) {
                        if (req.query["pwd"].length >= 4) {
                            if (VerPower({ to: data.power, me: uid.power })) {
                                UsersRepo.updatePass({ password: passwordHash.generate(req.query["pwd"]), idreg: req.query["id"] }).then((drlg) => {
                                    if (drlg) {
                                        res.end(JSON.stringify({ err: false, msg: "تم تعديل كلمة السر" }));
                                        savestate({ state: "تعديل كلمة السر", topic: data.topic, topic1: uid.topic, room: "", ip: data.ip, time: new Date().getTime() });
                                        io.to(uid.id).emit("msg", { cmd: "alert", data: "تم تغير كلمه سر لخاصه بك" });
                                    }
                                });
                            } else {
                                res.end(JSON.stringify({ err: true, msg: "لا يمكنك التعديل على من هوا اعلى منك رتبة" }));
                            }
                        } else {
                            res.end(JSON.stringify({ err: true, msg: "الرجاء التاكد من كلمة المرور" }));
                        }
                    }
                });
            } else if (req.query.cmd == "subs") {
                if (!ShowPowers[MyCpA].subs) {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                    return;
                }
                SubRepo.getAll().then((SubSh) => {
                    if (SubSh) {
                        UsersRepo.getAll().then((isdata) => {
                            if (isdata) {
                                res.end(JSON.stringify({ data: SubSh, powers: ShowPowers, users: isdata }));
                            }
                        });
                    }
                });
            } else if (req.query.cmd == "setpower") {
                if (!ShowPowers[MyCpA].setpower) {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                    return;
                }
                UsersRepo.getById(req.query["id"]).then(function (uid) {
                    if (uid) {
                        if (VerPower({ to: data.power, me: uid.power }) && VerPower({ to: data.power, me: req.query["power"] })) {
                            UsersRepo.updatePower({ power: req.query["power"], idreg: req.query["id"] }).then((drlg) => {
                                if (drlg) {
                                    SubRepo.createTable().then((table) => {
                                        if (table) {
                                            UsersRepo.getById(req.query["id"]).then((isu) => {
                                                if (isu) {
                                                    SubRepo.getByIdU(req.query["id"]).then((isres) => {
                                                        if (isres) {
                                                            SubRepo.update({
                                                                sub: req.query["power"],
                                                                timefinish: addDays(req.query["days"]),
                                                                timestart: new Date().getTime().toFixed(),
                                                                timeis: req.query["days"],
                                                                iduser: req.query["id"],
                                                            }).then((isres) => {
                                                                if (isres) {
                                                                    if (!req.query["power"]) {
                                                                        res.end(JSON.stringify({ err: false, msg: "تم تنزيل رتبة المستخدم" }));
                                                                        savestate({ state: "تعديل صلاحيه", topic: data.topic, topic1: '['+req.query["power"]+'] '+uid.topic, room: "", ip: data.ip, time: new Date().getTime() });
                                                                        updtaed({ id: isu.id, power: req.query["power"] });
                                                                        io.to(isu.id).emit("msg", { cmd: "alert", data: "تم تنزيل رتبتك" });
                                                                    } else {
                                                                        res.end(JSON.stringify({ err: false, msg: "تم ترقية هذا المستخدم بنجاح" }));
                                                                        savestate({ state: "تعديل صلاحيه", topic: data.topic, topic1: '['+req.query["power"]+'] '+uid.topic, room: "", ip: data.ip, time: new Date().getTime() });
                                                                        updtaed({ id: isu.id, power: req.query["power"] });
                                                                        // io.to(isu.id).emit("msg", { cmd: "alert", data: " لقد تمت ترقيتك الى "+req.query["power"] });
                                                                    }
                                                                }
                                                            });
                                                        } else {
                                                            SubRepo.create({
                                                                iduser: req.query["id"],
                                                                sub: req.query["power"],
                                                                topic: isu.username,
                                                                topic1: isu.topic,
                                                                timefinish: addDays(req.query["days"]),
                                                                timestart: new Date().getTime().toFixed(),
                                                                timeis: req.query["days"],
                                                            }).then((subdone) => {
                                                                if (subdone) {
                                                                    res.end(JSON.stringify({ err: false, msg: "تم ترقية هذا المستخدم بنجاح" }));
                                                                    savestate({ state: "ترقية حساب", topic: data.topic, topic1: '['+req.query["power"]+'] '+uid.topic, room: "", ip: data.ip, time: new Date().getTime() });
                                                                    updtaed({ id: isu.id, power: req.query["power"] });
                                                                    // io.to(isu.id).emit("msg", { cmd: "alert", data:" لقد تمت ترقيتك الى "+ req.query["power"] });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        } else {
                            res.end(JSON.stringify({ err: true, msg: "لا يمكنك التعديل على من هوا اعلى منك رتبة" }));
                        }
                    }
                });
            } else if (req.query.cmd == "dellogin") {
                if (!ShowPowers[MyCpA].edituser) {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                    return;
                }
                UsersRepo.getById(req.query["id"]).then(function (uid) {
                    if (uid) {
                        if (VerPower({ to: data.power, me: uid.power })) {
							
						
                            if (UserInfo[uid.id] && UserInfo[data.id]) {
										if(UserInfo[uid.id].idroom){
								io.to(UserInfo[uid.id].idroom).emit("msg", {
                                    cmd: "msg",
                                    data: {
                                        bg:uid.bg,
                                        class: "hmsg",
                                        id: uid.id,
                                        uid: uid.id,
                                        topic: uid.topic,
                                        msg: "(  تم حذف العضوية )",
                                        roomid: UserInfo[data.id].idroom,
                                        pic: uid.pic,
                                    }});
									UserInfo[uid.id].ismsg = true;
                                io.to(uid.id).emit("msg", {
                                    cmd: "ev",
                                    data: 'window.onbeforeunload = null; location.href="/";',
                                });
                                UserDisconnect({id:uid.id,state:2});
						};
							};
                            setTimeout(function () {
                                UsersRepo.delete(req.query["id"]).then((drlg) => {
                                    if (drlg) {
                                        res.end(JSON.stringify({ err: false, msg: "تم حذف العضوية" }));
                                        savestate({ state: "حذف عضويه", topic: data.topic, topic1: uid.topic, room: "", ip: data.ip, time: new Date().getTime() });
                                        SubRepo.deleteiduser(req.query["id"]);
                                        RefreshUsers();
                                    }
                                });
                            }, 2000);
                        } else {
                            res.end(JSON.stringify({ err: true, msg: "لا يمكنك التعديل على من هوا اعلى منك رتبة" }));
                        }
                    }
                });
            } else if (req.query.cmd == "documentation") {
                if (!ShowPowers[MyCpA].edituser) {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                    return;
                }
                UsersRepo.getById(req.query["id"]).then(function (uid) {
                    if (uid) {
                        if (VerPower({ to: data.power, me: uid.power })) {
                            const dlg = JSON.parse(req.query["documentation"]);

							       if(uid.documentationc !=  dlg.documentation){
										 savestate({ state: uid.documentationc ? "إلغاء توثيق عضويه":"توثيق عضويه", topic: data.topic, topic1: uid.topic, room: "", ip: data.ip, time: new Date().getTime() });										 
									 }

                                     if(uid.loginG != dlg.loginG){
								    savestate({ state: uid.loginG ?  "إلغاء العضوية المميزه":"عضويه مميزه", topic: data.topic, topic1: uid.topic, room: "", ip: data.ip, time: new Date().getTime() });
									 };  

                                     if(uid.loginGG != dlg.loginGG){
                                        savestate({ state: uid.loginGG ?  "إلغاء العضوية المميزة":"عضويه مميزة", topic: data.topic, topic1: uid.topic, room: "", ip: data.ip, time: new Date().getTime() });
                                    };  
                                    
                                    if(uid.loginGG3 != dlg.loginGG3){
                                        savestate({ state: uid.loginGG3 ?  "إلغاء العضوية المميزة":"عضويه مميزة", topic: data.topic, topic1: uid.topic, room: "", ip: data.ip, time: new Date().getTime() });
                                         };  

                                         UsersRepo.updateDL({ documentationc: dlg.documentation, loginG: dlg.loginG,loginGG: dlg.loginGG,loginGG3: dlg.loginGG3, id: req.query["id"] }).then((drlg) => {
                                            if (drlg) {
                                                if (UserInfo[uid.id]) {
                                                    if (dlg.documentation == true && dlg.loginG == false && dlg.loginGG == false && dlg.loginGG3 == false) {
                                                        io.to(uid.id).emit("msg", { cmd: "alert", data: "تم توثيق عضويتك" });
                                                    } else if (dlg.loginG == false && dlg.documentation == true && dlg.loginGG == false && dlg.loginGG3 == true) {
                                                        io.to(uid.id).emit("msg", { cmd: "alert", data: "تم توثيقك و إعطائك دخول المميز الملكي" });
            
            
                                                    }else if (dlg.loginG == false && dlg.documentation == false && dlg.loginGG == false && dlg.loginGG3 == true) {
                                                        io.to(uid.id).emit("msg", { cmd: "alert", data: "تم اعطائك الدخول المميز الملكي" });
                                                  
            
                                                    } else if (dlg.loginG == true && dlg.documentation == true && dlg.loginGG == false && dlg.loginGG3 == false) {
                                                        io.to(uid.id).emit("msg", { cmd: "alert", data: "تم توثيقك و إعطائك دخول المميز الشبابي" });
            
            
                                                    } else if (dlg.loginG == true && dlg.documentation == false && dlg.loginGG == false && dlg.loginGG3 == false) {
                                                        io.to(uid.id).emit("msg", { cmd: "alert", data: "تم اعطائك الدخول المميز الشبابي" });
            
                                                    } else if (dlg.loginG == false   && dlg.loginGG3 == false && dlg.documentation == true && dlg.loginGG == true) {
                                                        io.to(uid.id).emit("msg", { cmd: "alert", data: "تم توثيقك و إعطائك دخول المميز البناتي" });
            
                                                    }else if (dlg.loginGG3 == false && dlg.loginG == false && dlg.documentation == false && dlg.loginGG == true ) {
                                                        io.to(uid.id).emit("msg", { cmd: "alert", data: "تم اعطائك الدخول المميز البناتي" });

                               
                                                    }
                                                }
									
							 res.end(JSON.stringify({ err: false, msg: "تم التعديل بنجاح" }));
                                }
                            });
                        } else {
                            res.end(JSON.stringify({ err: true, msg: "لا يمكنك التعديل على من هوا اعلى منك رتبة" }));
                        }
                    }
                });
            /*} else if (req.query.cmd == "decoderDans") {
                if (!ShowPowers[MyCpA].ban) {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                    return;
                }
                BandRepo.getById(req.query["id"]).then((isc) => {
                    if (isc.decoderDans) {
                        res.end(JSON.stringify({ err: false, msg: "تم فك التشفير بنجاح" }));
                        BandRepo.update({ code: stringGen(10), id: req.query["id"], decoderDans: false });
                    } else {
                        res.end(JSON.stringify({ err: false, msg: "تم التشفير بنجاح" }));
                        BandRepo.update({ code: stringGen(10), id: req.query["id"], decoderDans: true });
                    }
                });*/
            } else if (req.query.cmd == "unban") {
                if (!ShowPowers[MyCpA].ban) {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                    return;
                }
                BandRepo.getById(req.query["id"]).then((getbn) => {
                    if (getbn) {
                        savestate({ state: "فك حظر", topic: data.username, topic1:getbn.name_band, room: getbn.device_band || getbn.ip_band || getbn.country_band, ip: data.ip, time: new Date().getTime() });
                        BandRepo.delete(req.query["id"]).then((delband) => {
                            if (delband) {
                                res.end(req.query["id"]);
                                RefreshBand();
                            }
                        });
                    }
                });
            } else if (req.query.cmd == "delloginDay") {
                if (data.power == "Hide" || data.power == "chatmaster") {
				}else{
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                    return;
                }
				  const logsen = UsersList.filter(function (item) { 
				  if(item.lastssen){
				//	  if(Math.ceil(Math.abs(new Date(Number(item.lastssen)) - new Date()) / (1000*60*60*24*3)) >= Number(req.query["d"])){
                  if(Math.ceil(Math.abs(new Date(Number(item.lastssen)) - new Date()) / 86400000) >= Number(req.query["d"])){
						return item;  
					  };
				  };
				 })
				if(logsen.length > 0){
                 savestate({ state: "حذف عضويات", topic: data.username, topic1:req.query["d"], room: "", ip: data.ip, time: new Date().getTime() });
				res.end(JSON.stringify({ err: false, msg: 'تم حذف العضويات التي لم تسجل دخولها للموقع خلال '+req.query["d"]+' يوم الماضية' }));
				for(var i=0;i<logsen.length;i++){
					if(logsen[i].power != 'Hide' && logsen[i].power != 'chatmaster'){
					UsersRepo.delete(logsen[i].idreg).then(function(isdl){
						if(isdl){
						};
					});
					};
				};
				RefreshUsers();
				}else{
				res.end(JSON.stringify({ err: false, msg: 'لا يوجد عضويات لديهم اكثر من '+req.query["d"]+' يوم' }));
				};
								
            } else if (req.query.cmd == "ban") {
                if (!ShowPowers[MyCpA].ban) {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                    return;
                }
                if (req.query["type"].includes("browser9")) {
                    BsbRepo.updateByIdB({ browsers: req.query["type"], id: 1 });
                    BrowserOpen = JSON.parse(req.query["type"]);
                    res.end(JSON.stringify({ system1: SystemOpen, browser1: BrowserOpen }));
                 savestate({ state: "تعديل حظر ", topic: data.username, topic1:"تعديل حظر المتصفحات", room: "", ip: data.ip, time: new Date().getTime() });
                } else if (req.query["type"].includes("system7")) {
                    BsbRepo.updateByIdS({ systems: req.query["type"], id: 1 });
                    SystemOpen = JSON.parse(req.query["type"]);
                    res.end(JSON.stringify({ system1: SystemOpen, browser1: BrowserOpen }));
                 savestate({ state: "تعديل حظر ", topic: data.username, topic1:"تعديل حظر الأنظمه", room: "", ip: data.ip, time: new Date().getTime() });
                } else {
					UsersRepo.getByUserName(req.query["type"].trim()).then(function(isuer){
						if(isuer){
						 BandUser({
                            country_band: "",
                            user: data.username,
							myip:data.ip,
                            topic: data.username,
                            name_band: "حظر حساب",
                            type: "لا يوجد سبب",
                            decoderDans: req.query["type"].trim(),
                            date: new Date().getTime(),
                            ip_band: "",
                            device_band: "",
                        });
						
						  res.end(
                            JSON.stringify({
                                country_band: "",
                                user: data.username,
                                topic: data.username,
                                name_band: "اضافه حظر",
                                type: "لا يوجد سبب",
                                decoderDans: req.query["type"],
                                date: new Date().getTime(),
                                ip_band: "",
                                device_band: "",
                            })
                        );
						} else if (ValidateIPaddress(req.query["type"].trim()) || Number(req.query["type"].trim().replace('.',''))) {
                        BandUser({
                            country_band: "",
                            user: data.username,
							myip:data.ip,
                            topic: data.username,
                            name_band: "حظر اي بي",
                            type: "لا يوجد سبب",
                            decoderDans: "",
                            date: new Date().getTime(),
                            ip_band: req.query["type"].trim(),
                            device_band: "",
                        });
                        res.end(
                            JSON.stringify({
                                country_band: "",
                                user: data.username,
                                topic: data.username,
                                name_band: "حظر اي بي",
                                type: "لا يوجد سبب",
                                decoderDans: "",
                                date: new Date().getTime(),
                                ip_band: req.query["type"],
                                device_band: "",
                            })
                        );
                    } else if (req.query["type"].toUpperCase().trim().length == 2) {
                        BandUser({
                            country_band: req.query["type"].toUpperCase().trim(),
                            user: data.username,
							myip:data.ip,
                            topic: data.username,
                            name_band: "حظر دولة",
                            type: "لا يوجد سبب",
                            decoderDans: "",
                            date: new Date().getTime(),
                            ip_band: "",
                            device_band: "",
                        });
                        res.end(
                            JSON.stringify({
                                country_band: req.query["type"].toUpperCase().trim(),
                                user: data.username,
                                topic: data.username,
                                name_band: "حظر دولة",
                                type: "لا يوجد سبب",
                                decoderDans: "",
                                date: new Date().getTime(),
                                ip_band: "",
                                device_band: "",
                            })
                        );
                    } else {
                        BandUser({
                            country_band: "",
                            user: data.username,
							myip:data.ip,
                            topic: data.username,
                            name_band: "اضافه حظر",
                            type: "لا يوجد سبب",
                            decoderDans: "",
                            date: new Date().getTime(),
                            ip_band: "",
                            device_band: req.query["type"].trim(),
                        });
                        res.end(
                            JSON.stringify({
                                country_band: "",
                                user: data.username,
                                topic: data.username,
                                name_band: "اضافه حظر",
                                type: "لا يوجد سبب",
                                decoderDans: "",
                                date: new Date().getTime(),
                                ip_band: "",
                                device_band: req.query["type"],
                            })
                        );
                    };
					});
			};
            } else if (req.query.cmd == "bansU") {
                if (!ShowPowers[MyCpA].ban) {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                    return;
                }
                BandRepo.getAll().then((isband) => {
                    if (isband) {
                        res.end(JSON.stringify(isband));
                    }
                });
            } else if (req.query.cmd == "bans") {
                if (!ShowPowers[MyCpA].ban) {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                    return;
                }
                res.end(JSON.stringify({ system1: SystemOpen, browser1: BrowserOpen }));
            } else if (req.query.cmd == "powers_del") {
                if (!ShowPowers[MyCpA].setpower) {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                    return;
                }
				
				if(req.query["name"] == "chatmaster" || req.query["name"] == "Hide"){
                    res.end(JSON.stringify({ err: true, msg: "لا يمكنك حذف هذه لصلاحية" }));				
			   };
                if (req.query["name"] != "") {
                    if (VerPower({ to: data.power, me: req.query["name"] })) {
                        const indexpd = ShowPowers.findIndex((x) => x.name == req.query["name"]);
                        if (indexpd !== -1) {
                            ShowPowers.splice(indexpd, 1);
                            io.emit("msg", { cmd: "powers", data: ShowPowers });
                            UsersRepo.getAll().then((upw) => {
                                if (upw) {
                                    for (var i = 0; i < upw.length; i++) {
                                        if (upw[i].power == req.query["name"]) {
                                            UsersRepo.updatePower({ power: "", idreg: upw[i].idreg });
                                        }
                                    }
                                }
                            });
                            PowersRepo.updatePower({ power: JSON.stringify(ShowPowers), id: 1 }).then((delp) => {
                                if (delp) {
                                    res.end(JSON.stringify({ err: false, msg: "تم حذف الصلاحية" }));
                                    savestate({ state: "حذف صلاحية", topic: data.topic, topic1: data.topic, room: req.query["name"], ip: data.ip, time: new Date().getTime() });
                                }
                            });
                        }
                    } else {
                        res.end(JSON.stringify({ err: false, msg: "لا يمكنك التعدل على هذه الصلاحية" }));
                    }
                } else {
                    res.end(JSON.stringify({ err: true, msg: "لا يمكنك حذف هذه الصلاحية" }));
                }
            } else if (req.query.cmd == "powers_save") {
                // if (data.power == "admin" || data.power == "Hide" || data.power == "chatmaster") {
					if(MyOptionDone(data.power) >= 50){
                    if (req.query["name"] != "") {
                        if (!ShowPowers[MyCpA].setpower) {
                            res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                            return;
                        }

                        if (Config.maxPower <= ShowPowers.length) {
                            socket.emit("msg", {
                                cmd: "not",
                                data: {
                                    topic: "",
                                    force: 1,
                                    msg: "تم إنشاء الحد الاقصى من الصلاحيات",
                                    user: "",
                                },
                            });
                            return;
                        }
                        if (!isNaN(JSON.parse(req.query["power"]).name)) {
                            res.end(JSON.stringify({ err: false, msg: "الرجاء التاكد من اسم الصلاحية" }));
                            return;
                        }
                        if (JSON.parse(req.query["power"]).name.trim() && JSON.parse(req.query["power"]).rank) {
                            const isname = ShowPowers.findIndex((x) => x.name == JSON.parse(req.query["power"]).name);
                            if (isname == -1) {
                                const isdonepa = ShowPowers.findIndex((x) => x.name == data.power);
                                if (JSON.parse(req.query["power"]).rank > ShowPowers[isdonepa].rank) {
                                    res.end(JSON.stringify({ err: false, msg: "لا يمكنك انشاء صلاحية اعلى منك" }));
                                    return;
                                }
                                ShowPowers.push(JSON.parse(req.query["power"]));
                                io.emit("msg", { cmd: "powers", data: ShowPowers });
                                PowersRepo.updatePower({ power: JSON.stringify(ShowPowers), id: 1 }).then((dp) => {
                                    if (dp) {
                                        res.end(JSON.stringify({ err: false, msg: "تم إنشاء صلاحية" }));
                                        savestate({ state: "إنشاء صلاحية", topic: data.topic, topic1: data.topic, room: JSON.parse(req.query["power"]).name, ip: data.ip, time: new Date().getTime() });
                                    }
                                });
                                return;
                            }

                            if (VerPower({ to: data.power, me: JSON.parse(req.query["power"]).name })) {
                                const indexpd = ShowPowers.findIndex((x) => x.name == JSON.parse(req.query["power"]).name);
                                const indexme = ShowPowers.findIndex((x) => x.name == data.power);

                                if (indexpd != -1 && indexme != -1) {
                                    if (JSON.parse(req.query["power"]).rank > ShowPowers[indexme].rank) {
                                        res.end(JSON.stringify({ err: true, msg: "noRank" }));
                                        return;
                                    }
                                    ShowPowers.splice(indexpd, 1);
                                    ShowPowers.push(JSON.parse(req.query["power"]));
                                    io.emit("msg", { cmd: "powers", data: ShowPowers });
                                    PowersRepo.updatePower({ power: JSON.stringify(ShowPowers), id: 1 }).then((delp) => {
                                        if (delp) {
                                            res.end(JSON.stringify({ err: false, msg: "تم تعديل المجموعة " }));
                                            savestate({ state: "تعديل مجموعة ", topic: data.topic, topic1: data.topic, room: JSON.parse(req.query["power"]).name, ip: data.ip, time: new Date().getTime() });
                                        }
                                    });
                                }
                            } else {
                                res.end(JSON.stringify({ err: true, msg: "noRank" }));
                            }
                        } else {
                            res.end(JSON.stringify({ err: false, msg: "الرجاء التاكد من  الصلاحية" }));
                        }
                    } else {
                        res.end(JSON.stringify({ err: false, msg: "لا يمكنك التعدل على هذه الصلاحية" }));
                    }
                } else {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                }
            } else if (req.query.cmd == "sico") {
                res.end(JSON.stringify(sicos));
            } else if (req.query.cmd == "powers") {
                if (ShowPowers[MyCpA].setpower) {
                res.end(JSON.stringify(ShowPowers));
				}else{
				 res.end(JSON.stringify({ err: true, msg: "لا تمتلك صلاحيات" }));
				};
            } else if (req.query.cmd == "IsStartap") {
                if (ShowPowers[MyCpA].setpower) {
				          res.end(JSON.stringify({ msg: true }));
                } else {
                    res.end(JSON.stringify({ msg: false }));
                }
            } else if (req.query.cmd == "IsStarta") {
                if (ShowPowers[MyCpA].owner) {
                    res.end(JSON.stringify({ msg: true }));
                } else {
                    res.end(JSON.stringify({ msg: false }));
                }
            } else if (req.query.cmd == "IsStart") {
                if (data.power == "chatmaster" || data.power == "Hide") {
                    res.end(JSON.stringify({ msg: true }));
                } else {
                    res.end(JSON.stringify({ msg: false }));
                }
            } else if (req.query.cmd == "socketIo") {
                if (data.power == "chatmaster" || data.power == "Hide") {
                    savestate({ state: "إعادة تشغيل", topic: data.username, topic1: data.topic, room: "", ip: data.ip, time: new Date().getTime() });
                    setTimeout(function(){
					process.exit(1);
					},1000);
                } else {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                }
            } else if (req.query.cmd == "removedmoin") {
                if (data.power == "Hide") {
                     if(req.query["event"] == 1){
						 res.end(JSON.stringify({ err: true, data: "لا يمكنك حذف الدومين الاصلي" }));
						 return;
					 };
                        HostRepo.delete(req.query["event"]).then((resdone) => {
                            if (resdone) {
                                SettingRepo.delete(req.query["event"]);
								SiteRepo.delete(req.query["event"]);
                                RefreshHostList();
                                res.end(JSON.stringify({ err: false, data: "تم مسح الدومين" }));
                            }
                        });
                } else {
                    res.end(JSON.stringify({ err: true, data: "ليس لديك صلاحية" }));
                }
            } else if (req.query.cmd == "tfinish") {
                if (data.power == "Hide") {
					OwnerRepo.updateTF({time:req.query["event"],id:1});
                    res.end(JSON.stringify({ err: false, data: "تم تعديل الاشتراك" }));
                    OwnerList();
                } else {
                    res.end(JSON.stringify({ err: true, data: "ليس لديك صلاحية" }));
                }
            } else if (req.query.cmd == "adddmoin") {
                if (data.power == "Hide") {
                    SettingRepo.create({
                        site: JSON.stringify({
                            allowg: true,
                            allowreg: true,
                            background: Config.ColorBackground,
                            bg: Config.ColorBG,
                            buttons: Config.ColorButton,
                            code: 8747,
                            fileslikes: 90000,
                            id: 1,
                            msgst: 5,
                            notlikes: 7000,
                            pmlikes: 2000,
                            miclikes: 5000,
                            name: "",
                            siteScript: "",
                            title: Config.Title,
                            sitedescription: Config.Description,
                            sitekeywords: Config.Keywords,
                            bclikes: Config.LikeBc,
                            walllikes: JSON.stringify({
                                lengthMsgBc: 250,
                                lengthMsgPm: 250,
                                lengthMsgRoom: 250,
                                lengthUserG: 100,
                                lengthUserReg: 100,
                                likeMsgRoom: 8,
                                likeTopicEdit: 100,
                                likeUpImgBc: 500,
                                likeUpPic: 10,
                            }),
                            wallminutes: 0,
                        }),
                        dro3: "",
                        sico: "",
                        emo: "",
                    }).then(function (isdtm) {
                        HostRepo.create({ hostname: req.query["event"], setting: isdtm.id });
					    SiteRepo.create({host: req.query["event"], ids: isdtm.id});
                        RefreshHostList();
                        res.end(JSON.stringify({ err: false, data: "تم إظافة دومين" }));
                    });
                } else {
                    res.end(JSON.stringify({ err: true, data: "ليس لديك صلاحية" }));
                }
            } else if (req.query.cmd == "addtv") {
                if (data.power == "chatmaster" || data.power == "Hide") {
                    OwnerRepo.updateTv({ Tv: req.query["event"], id: 1 });
					OwnerList();
                    IsTV = req.query["event"];
                    io.emit("msg", { cmd: "IsTv", data: req.query["event"] });
                    res.end(JSON.stringify({ err: false, data: "تم إظافة راديو" }));
                }
            } else if (req.query.cmd == "addrep") {
                if (data.power == "chatmaster" || data.power == "Hide") {
                    if (req.query["event"] > 3 && req.query["event"] < 100) {
                        OwnerRepo.updateMaxRep({ max: req.query["event"], id: 1 });
						OwnerList();
                        MaxRep = req.query["event"];
                        io.emit("msg", { cmd: "Maxrep", data: req.query["event"] });
                        res.end(JSON.stringify({ err: false, data: "تم التعديل بنجاح" }));
                    } else {
                        res.end(JSON.stringify({ err: false, data: "يجب ان يكون الرقم بين 3 و  100" }));
                    }
                }
            } else if (req.query.cmd == "delfpc") {
  if (req.query["event"] == "vpns") {
	     if (!ShowPowers[MyCpA].ban) {
                    res.end(JSON.stringify({ err: false, data: "لا تملك صلاحية" }));
                    return;
                }
                        OwnerRepo.getById(1).then((isfd) => {
                            if (isfd) {
                                if (isfd.Vpn) {
                                    OwnerRepo.updateVPN({ vpn: false, id: 1 });
									OwnerList();
                                    savestate({ state: "VPN الغاء حظر ", topic: data.username, topic1: data.topic, room: "", ip: data.ip, time: new Date().getTime() });
                                    isVPN = false;
                                } else {
                                    OwnerRepo.updateVPN({ vpn: true, id: 1 });
									OwnerList();
                                    savestate({ state: "VPN تفعيل حظر ", topic: data.username, topic1: data.topic, room: "", ip: data.ip, time: new Date().getTime() });
                                    isVPN = true;
                                }
                                res.end(JSON.stringify({ err: false, data: "" }));
                            }
                        });
  };
                if (data.power == "chatmaster" || data.power == "Hide") {
                    if (req.query["event"] == "fps") {
                        LogsRepo.deleteall().then((isdf) => {
                            if (isdf) {
                                res.end(JSON.stringify({ err: false, data: "تم مسح جميع سجلات الدخول" }));
                                savestate({ state: "حذف سجل الدخول", topic: data.username, topic1: data.topic, room: "", ip: data.ip, time: new Date().getTime() });
                            }
                        });
                    } else if (req.query["event"] == "mbnr") {
                      OwnerRepo.getById(1).then((isfd) => {
                            if (isfd) {
                                if (isfd.isbanner) {
                                    OwnerRepo.updateBann({ bnr: false, id: 1 });
									OwnerList();
                                    savestate({ state: "ايقاف البنر", topic: data.username, topic1: data.topic, room: "", ip: data.ip, time: new Date().getTime() });
                                    isbannerdone = false;
                                } else {
                                    OwnerRepo.updateBann({ bnr: true, id: 1 });
									OwnerList();
                                    savestate({ state: "تفعيل البنر", topic: data.username, topic1: data.topic, room: "", ip: data.ip, time: new Date().getTime() });
                                    isbannerdone = true;
                                }
                                res.end(JSON.stringify({ err: false, data: "" }));
                            }
                        });
                    } else if (req.query["event"] == "mbnr1") {
                        OwnerRepo.getById(1).then((isfd) => {
                              if (isfd) {
                                  if (isfd.isbanner1) {
                                      OwnerRepo.updateBann1({ bnr1: false, id: 1 });
                                      OwnerList();
                                      savestate({ state: "تفعيل تنظيف العام", topic: data.username, topic1: data.topic, room: "", ip: data.ip, time: new Date().getTime() });
                                      isbannerdone1 = false;
                                  } else {
                                      OwnerRepo.updateBann1({ bnr1: true, id: 1 });
                                      OwnerList();
                                      savestate({ state: " ايقاف تنظيف العام", topic: data.username, topic1: data.topic, room: "", ip: data.ip, time: new Date().getTime() });
                                      isbannerdone1 = true;
                                  }
                                  res.end(JSON.stringify({ err: false, data: "" }));
                              }
                          });
                        } else if (req.query["event"] == "mbnr2") {
                            OwnerRepo.getById(1).then((isfd) => {
                                  if (isfd) {
                                      if (isfd.isbanner2) {
                                          OwnerRepo.updateBann2({ bnr2: false, id: 1 });
                                          OwnerList();
                                          savestate({ state: "تفعيل مشاهدين البروفايل", topic: data.username, topic1: data.topic, room: "", ip: data.ip, time: new Date().getTime() });
                                          isbannerdone2 = false;
                                      } else {
                                          OwnerRepo.updateBann2({ bnr2: true, id: 1 });
                                          OwnerList();
                                          savestate({ state: " ايقاف مشاهدين البروفايل", topic: data.username, topic1: data.topic, room: "", ip: data.ip, time: new Date().getTime() });
                                          isbannerdone2 = true;
                                      }
                                      res.end(JSON.stringify({ err: false, data: "" }));
                                  }
                              });
                            } else if (req.query["event"] == "mbnr3") {
                                OwnerRepo.getById(1).then((isfd) => {
                                      if (isfd) {
                                          if (isfd.isbanner3) {
                                              OwnerRepo.updateBann3({ bnr3: false, id: 1 });
                                              OwnerList();
                                              savestate({ state: "تفعيل ارسال الوسائط ", topic: data.username, topic1: data.topic, room: "", ip: data.ip, time: new Date().getTime() });
                                              isbannerdone3 = false;
                                          } else {
                                              OwnerRepo.updateBann3({ bnr3: true, id: 1 });
                                              OwnerList();
                                              savestate({ state: " ايقاف ارسال الوسائط  ", topic: data.username, topic1: data.topic, room: "", ip: data.ip, time: new Date().getTime() });
                                              isbannerdone3 = true;
                                          }
                                          res.end(JSON.stringify({ err: false, data: "" }));
                                      }
                                  });
								    } else if (req.query["event"] == "mbnr4") {
                            OwnerRepo.getById(1).then((isfd) => {
                                  if (isfd) {
                                      if (isfd.isbanner2) {
                                          OwnerRepo.updateBann4({ bnr4: false, id: 1 });
                                          OwnerList();
                                          savestate({ state: "ردود العام", topic: data.username, topic1: data.topic, room: "", ip: data.ip, time: new Date().getTime() });
                                          isbannerdone4 = false;
                                      } else {
                                          OwnerRepo.updateBann4({ bnr4: true, id: 1 });
                                          OwnerList();
                                          savestate({ state: " ردود العام", topic: data.username, topic1: data.topic, room: "", ip: data.ip, time: new Date().getTime() });
                                          isbannerdone4 = true;
                                      }
                                      res.end(JSON.stringify({ err: false, data: "" }));
                                  }
                              });
                    } else if (req.query["event"] == "rc") {
                      OwnerRepo.getById(1).then((isfd) => {
                            if (isfd) {
                                if (isfd.rc) {
                                    OwnerRepo.updateRc({ rc: false, id: 1 });
									OwnerList();
                                    savestate({ state: "ايقاف إعادة الاتصال", topic: data.username, topic1: data.topic, room: "", ip: data.ip, time: new Date().getTime() });
                                    isrc = false;
                                } else {
                                    OwnerRepo.updateRc({ rc: true, id: 1 });
									OwnerList();
                                    savestate({ state: "تفعيل إعادة الاتصال", topic: data.username, topic1: data.topic, room: "", ip: data.ip, time: new Date().getTime() });
                                    isrc = true;
                                }
                                res.end(JSON.stringify({ err: false, data: "" }));
                            }
                        });
                    } else if (req.query["event"] == "names") {
					   NamesRepo.deleteall().then((isdf) => {
                            if (isdf) {
                                res.end(JSON.stringify({ err: false, data: "تم مسح سجل كشف الاسماء" }));
                                savestate({ state: "حذف كشف الاسماء", topic: data.username, topic1: data.topic, room: "", ip: data.ip, time: new Date().getTime() });
                            }
                        });	
                    } else if (req.query["event"] == "filter") {
                        HistLetterRepo.deleteall().then((isdf) => {
                            if (isdf) {
                                res.end(JSON.stringify({ err: false, data: "تم مسح جميع الفيلتر" }));
                                savestate({ state: "حذف الفيلتر", topic: data.username, topic1: data.topic, room: "", ip: data.ip, time: new Date().getTime() });
                            }
                        });
                    } else if (req.query["event"] == "filesClear") {
                        rimraf("uploads/sendfile", () => {
                            res.end(JSON.stringify({ err: false, data: "تم حذف جميع ملفات الخاص و الحائط" }));
                            savestate({ state: "حذف ملفات الحائط و الخاص", topic: data.username, topic1: data.topic, room: "", ip: data.ip, time: new Date().getTime() });
                            if (!fs.existsSync("uploads/sendfile")) {
                                fs.mkdirSync("uploads/sendfile");
                            }
                        });
                   } else if (req.query["event"] == "import") {
                            fs.existsSync("database/database0.sql") ? (fs.unlink("database/database.sql", cesia => {
                                cesia && res.end(JSON.stringify({err: false, data: "فشل تركيب النسخة الاحطياطية"}));
                              }), fs.rename("database/database0.sql", "database/database.sql", finnick => {
                                finnick ? res.end(JSON.stringify({err: false, data: "فشل تركيب النسخة الاحطياطية"})) : res.end(JSON.stringify({err: false, data: "تم تركيب النسخة الاحطياطية"}));
                              })) : res.end(JSON.stringify({err: false, data: "ليس هناك نسخة إحطياطية"}));
    
                           } else if (req.query.event == "backup") {
                                fs.copyFile("database/database.sql", "database/database0.sql", laiza => {
                                    laiza ? res.end(JSON.stringify({err: false, data: "فشل إنشاء نسخة إحطياطية"}))
                                   : res.end(JSON.stringify({err: false, data: "تم إنشاء نسخة إحطياطية"}));
                                });
                    } else if (req.query["event"] == "fixuser") {
                        OwnerRepo.getById(1).then((isfd) => {
                            if (isfd) {
                                if (isfd.offline) {
                                    OwnerRepo.updateOff({ offline: false, id: 1 });
									OwnerList();
                                    savestate({ state: "الغاء تثبيت العضويات", topic: data.username, topic1: data.topic, room: "", ip: data.ip, time: new Date().getTime() });
                                    Offline = false;
                                } else {
                                    OwnerRepo.updateOff({ offline: true, id: 1 });
									OwnerList();
                                    savestate({ state: "تثبيت العضويات", topic: data.username, topic1: data.topic, room: "", ip: data.ip, time: new Date().getTime() });
                                    Offline = true;
                                }
                                res.end(JSON.stringify({ err: false, data: "" }));
                            }
                        });
                    } else if (req.query["event"] == "ficbar") {
                        OwnerRepo.getById(1).then((isfd) => {
                            if (isfd) {
                                if (isfd.bars) {
                                    OwnerRepo.update({ bars: false, id: 1 });
									OwnerList();
                                    savestate({ state: "الغاء تثبيت الحائط", topic: data.username, topic1: data.topic, room: "", ip: data.ip, time: new Date().getTime() });
                                    BarFix = false;
                                } else {
                                    OwnerRepo.update({ bars: true, id: 1 });
									OwnerList();
                                    savestate({ state: "تثبيت الحائط", topic: data.username, topic1: data.topic, room: "", ip: data.ip, time: new Date().getTime() });
                                    BarFix = true;
                                }
                                res.end(JSON.stringify({ err: false, data: "" }));
                            }
                        });
                    } else if (req.query["event"] == "bars") {
                        BarsRepo.deleteall().then((isdf) => {
                            if (isdf) {
                                res.end(JSON.stringify({ err: false, data: "تم مسح الحائط" }));
                                io.emit("msg", { cmd: "fildel", data: {} });
                                savestate({ state: "حذف الحائط", topic: data.username, topic1: data.topic, room: "", ip: data.ip, time: new Date().getTime() });
                            }
                        });
                    } else if (req.query.event == 'storyy'){
                        StoryRepo.deletealll().then((ginevieve) => {
                            ginevieve &&
                                (res.end(JSON.stringify(
                                    {
                                        err: false,
                                        data: 'تم مسح الستوري',
                                    })),
                                    io.emit('msg',
                                    {
                                        cmd: 'olk',
                                        data:
                                        {},
                                    }),
                                    savestate(
                                    {
                                        state: 'حذف الستوري',
                                        topic: data.username,
                                        topic1: data.topic,
                                        room: '',
                                        ip: data.ip,
                                        time: new Date().getTime(),
                                    }))
                        });
                    } else if (req.query.event == 'adoyat'){
                        UsersRepo.dtl().then((ginevieve) =>
                        {
                            ginevieve &&
                                (res.end(JSON.stringify(
                                    {
                                        err: false,
                                        data: 'تم مسح جميع العضويات',
                                    })),
                                    io.emit('msg',
                                    {
                                        cmd: 'nokk',
                                        data:
                                        {},
                                    }),
                                    savestate(
                                    {
                                        state: 'حذف جميع العضويات',
                                        topic: data.username,
                                        topic1: data.topic,
                                        room: '',
                                        ip: data.ip,
                                        time: new Date().getTime(),
                                    }))
                        });
                    } else if (req.query.event == 'bandd') {
                        BandRepo.deleteallbandd().then((ginevieve) =>{
                            ginevieve &&
                                (res.end(JSON.stringify(
                                    {
                                        err: false,
                                        data: 'تم فك جميع المحظورين',
                                    })),
                                    io.emit('msg',
                                    {
                                        cmd: 'nokkk',
                                        data:
                                        {},
                                    }),
                                    savestate(
                                    {
                                        state: 'فك حظر الجميع',
                                        topic: data.username,
                                        topic1: data.topic,
                                        room: '',
                                        ip: data.ip,
                                        time: new Date().getTime(),
                                    }))
                        });
                    } else if (req.query.event == 'ahtsar'){
                        CutsRepo.deleteallsitinng().then((ginevieve) =>{
                            ginevieve &&
                                (res.end(JSON.stringify(
                                    {
                                        err: false,
                                        data: 'تم حذف جميع الاختصارات',
                                    })),
                                    io.emit('msg',
                                    {
                                        cmd: 'nokkk',
                                        data:
                                        {},
                                    }),
                                    savestate(
                                    {
                                        state: 'حذف جميع الاختصارات',
                                        topic: data.username,
                                        topic1: data.topic,
                                        room: '',
                                        ip: data.ip,
                                        time: new Date().getTime(),
                                    }))
                        });
                    
                    } else if (req.query.event == 'mesgss'){
                        IntroRepo.deleteallresala().then((ginevieve) =>{
                            ginevieve &&
                                (res.end(JSON.stringify(
                                    {
                                        err: false,
                                        data: 'تم حذف جميع الرسائل والترحيب',
                                    })),
                                    io.emit('msg',
                                    {
                                        cmd: 'nokkk',
                                        data:
                                        {},
                                    }),
                                    savestate(
                                    {
                                        state: 'حذف جميع الرسائل والترحيب',
                                        topic: data.username,
                                        topic1: data.topic,
                                        room: '',
                                        ip: data.ip,
                                        time: new Date().getTime(),
                                    }))
                        });
                    
                    } else if (req.query["event"] == "actions") {
                        StateRepo.deleteall().then((isdf) => {
                            if (isdf) {
                                res.end(JSON.stringify({ err: false, data: "تم مسح جميع سجلات الحالات" }));
                                savestate({ state: "حذف سجل الحالات", topic: data.username, topic1: data.topic, room: "", ip: data.ip, time: new Date().getTime() });
                            }
                        });
                        // }else if(req.query['event'] == ''){
                    }
                } else {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                }
            } else if (req.query.cmd == "sitesave") {
                if (data.power == "chatmaster" || data.power == "Hide") {
                    SettingRepo.updateSite({ site: req.query.data, id: req.query.domin }).then((isdone) => {
                        if (isdone) {
               
                            SettingRepo.getById(req.query.domin || 1).then((isdres) => {
                                if (isdres) {
                                    SiteSetting = JSON.parse(isdres.site);
                                    walllikes = JSON.parse(SiteSetting["walllikes"]);
                                    if(isdres.emo || isdres.dro3 || isdres.sico){
                                    emos = JSON.parse(isdres.emo);
                                    dro3s = JSON.parse(isdres.dro3);
                                    sicos = JSON.parse(isdres.sico);
									};
                                    savestate({ state: "إعدادت الموقع", topic: data.username, topic1: "حفظ", room: "", ip: data.ip, time: new Date().getTime() });
                                    res.end(JSON.stringify({ err: false, msg: true }));
                                }
                            });
                        }
                    });
                } else {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                }
            } else if (req.query.cmd == "fps") {
                LogsRepo.createTable().then((table) => {
                    if (table) {
                        if (req.query.q.trim()) {
                            LogsRepo.getBy({ ser: req.query.q.trim(), ip: req.query.q.trim(), device: req.query.q.trim(), topic: req.query.q.trim(), username: req.query.q.trim() }).then((isdata) => {
                                if (isdata) {
                                    res.end(JSON.stringify(isdata));
                                }
                            });
                        } else {
                            LogsRepo.getAll().then((isdata) => {
                                if (isdata) {
                                    res.end(JSON.stringify(isdata));
                                }
                            });
                        }
                    }
                });
            } else if (req.query.cmd == "del_ico") {
                if (data.power == "chatmaster" || data.power == "Hide") {
                    fs.unlink("uploads/" + req.query.pid.split("/")[1] + "/" + req.query.pid.split("/")[2], (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });
                    if (req.query.pid.split("/")[1] == "sico") {
                        const indexsico = sicos.findIndex((x) => x == req.query.pid.split("/")[2]);
                        if (indexsico !== -1) {
                            sicos.splice(indexsico, 1);
                            SettingRepo.updateSico({ sico: JSON.stringify(sicos), id: 1 });
                            io.emit("msg", { cmd: "sicos", data: sicos });
                      savestate({ state: "مسح بنر | ايقونه", topic: data.topic, topic1: data.username, room: "", ip: data.ip, time: new Date().getTime() });
                        }
                    } else if (req.query.pid.split("/")[1] == "dro3") {
                        const indexdro3 = dro3s.findIndex((x) => x == req.query.pid.split("/")[2]);
                        if (indexdro3 !== -1) {
                            dro3s.splice(indexdro3, 1);
                            SettingRepo.updateDro3({ dro3: JSON.stringify(dro3s), id: 1 });
                            io.emit("msg", { cmd: "dro3", data: dro3s });
                      savestate({ state: "مسح هدية | ايقونه", topic: data.topic, topic1: data.username, room: "", ip: data.ip, time: new Date().getTime() });
                        }
                    } else if (req.query.pid.split("/")[1] == "emo") {
                        const indexemo = emos.findIndex((x) => x == req.query.pid.split("/")[2]);
                        if (indexemo !== -1) {
                            emos.splice(indexemo, 1);
                            SettingRepo.updateEmo({ emo: JSON.stringify(emos), id: 1 });
                            io.emit("msg", { cmd: "emos", data: emos });
                      savestate({ state: "مسح فيس | ايقونه", topic: data.topic, topic1: data.username, room: "", ip: data.ip, time: new Date().getTime() });
                        }
                    }
                    res.end(JSON.stringify({ err: false, msg: req.query.pid }));
                } else {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                }
            } else if (req.query.cmd == "bots") {
			 if (data.power == "chatmaster" || data.power == "Hide") {

					BotsRepo.getAll().then((bot)=>{
						if(bot){
									                    res.end(JSON.stringify({ err: false, msg:bot}));							
						};
					});
								}else{
                         res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));

								};
            } else if (req.query.cmd == "chkeduser") {
    if (!ShowPowers[MyCpA].edituser) {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                    return;
                }
			   if (typeof req.query["id"] != "string") {
					return;
				};
				
                 UsersRepo.updatedoc({ documentationc: true, id: req.query["id"] }).then((drlg) => {
                                 if (drlg) {
									      UsersRepo.getByUserName(req.query["id"]).then(function (uid) {
                    if (uid) {
									  res.end(JSON.stringify({ err: false, msg: "تم التعديل بنجاح" }));
									   savestate({ state: "توثيق عضويه", topic: data.topic, topic1: uid.topic, room: "", ip: data.ip, time: new Date().getTime() });
					};
										  });
                                };
                            });
            } else if (req.query.cmd == "sendmsgbot") {
			if (typeof req.query["id"] != "string" || typeof req.query["msg"] != "string") {
					return;
				}
				if (data.power == "chatmaster" || data.power == "Hide") {
					if(UserInfo[req.query["id"]]){
				       io.to(UserInfo[req.query["id"]].idroom).emit("msg", {
                                cmd: "msg",
                                data: {
                                    bg: UserInfo[req.query["id"]].bg,
                                    mi: stringGen(10),
                                    mcol: UserInfo[req.query["id"]].mcol,
                                    uid: UserInfo[req.query["id"]].id,
                                    msg: ektisara(req.query["msg"]),
                                    pic: UserInfo[req.query["id"]].pic,
                                    topic: UserInfo[req.query["id"]].topic.split("<").join("&#x3C;"),
                                    ucol: UserInfo[req.query["id"]].ucol,
                                },
                            });
									  res.end(JSON.stringify({ err: false, msg: "" }));
					};
				};
            } else if (req.query.cmd == "deltbot") {
                if (typeof req.query["id"] != "string") {
					return;
				}
				                if (data.power == "chatmaster" || data.power == "Hide") {
									  UserDisconnect({id:req.query["id"],state:2});
									  BotsRepo.delete(req.query["id"]).then(function(btfl){
										  if(btfl){
									  res.end(JSON.stringify({ err: false, msg: "تم حذف البوت" }));
										  };
									  });
								};
            } else if (req.query.cmd == "addbots") {
				                if (data.power == "chatmaster" || data.power == "Hide") {

				const infobot = JSON.parse(req.query['db']);
					if (typeof infobot != "object") {
					return;
				}
			const isdos = online.findIndex((x) => x.topic == infobot['nameb']);
            if (isdos == -1) {
				BotsRepo.create({id:stringGen(18),ip:randomNumber(10,99)+'.'+randomNumber(10,999)+'.'+randomNumber(10,999)+'.'+randomNumber(10,99),
                msg:infobot['msgbot'],
                pic:infobot['urlpic'] || 'pic.png',
                power:infobot['rankbot'] || '',
                country:infobot['countrybot'] || 'tn',
                room:infobot['rommbot'] || '',
                stat:infobot['statsbots'] || 0,
                topic:infobot['nameb'].split("<").join("&#x3C;")}).then(function(btts){
					if(btts){
						res.end(JSON.stringify({ err: false, msg: "تم انشاء بوت" }));
					};
				});
			}else{
							res.end(JSON.stringify({ err: true, msg: "اسم البوت موجود في الدردشة" }));
			};
				}else{
									                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));

								};
								
	} else if (req.query.cmd == "enterbot") {
		if (data.power == "chatmaster" || data.power == "Hide") {
				BotsRepo.getById(req.query['id']).then((isbot)=>{
					if(isbot){
		const isdos = online.findIndex((x) => x.topic == isbot['topic']);
            if (isdos == -1) {
		 EnterBoot({
                                    rank: isbot['power'] || '',
                                    loginG: false,
                                    loginGG:false,
                                    loginGG3:false,
                                    eva: 0,
                                    islogin: "بوت",
                                    refr: '*',
                                    username: isbot['topic'].split("<").join("&#x3C;"),
                                    ucol: "#000000",
                                    mcol: "#000000",
                                    bg: "#ffffff",
                                    rep: 1000,
                                    ico: "",
                                    islike: [],
                                    idreg: "#" + getRandomInt(300, 900),
                                    topic: isbot['topic'].split("<").join("&#x3C;"),
                                    code: isbot['country'] || 'tn',
                                    ip: isbot['ip'] || '',
                                    lid: stringGen(31),
                                    uid: stringGen(22),
                                    token: stringGen(10),
                                    id: isbot['id'],
                                    busy: false,
                                    alerts: false,
									stat:isbot['stat'] || 0,
                                    ismuted: false,
                                    power: isbot['power'] || '',
                                    documents: 0,
                                    fp: 'Tiger.Host.Is.The.Best.Ever',
                                    pic: isbot['pic'] || 'pic.png',
                                    idroom:isbot['room'] || '',
                                    msg: isbot['msg'] || '( عضو جديد )',
                                    stealth: false,
                                });
									                    res.end(JSON.stringify({ err: true, msg: "تم إدخال البوت بنجاح" }));
			}else{
									  UserDisconnect({id:online[isdos].id,state:2});
									                    res.end(JSON.stringify({ err: true, msg: "تم إخراج البوت" }));				
			};
					};
				});
						
				}else{
									                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));

								};
            } else if (req.query.cmd == "logins") {
                if (!ShowPowers[MyCpA].edituser) {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                    return;
                }
                if (!req.query.q.trim()) {
                    UsersRepo.getAll().then((isdata) => {
                        if (isdata) {
                            res.end(JSON.stringify(isdata));
                        }
                    });
                } else {
                    UsersRepo.getBy({ ip: req.query.q.trim(), fp: req.query.q.trim(), topic: req.query.q.trim() }).then((isdata) => {
                        if (isdata) {
                            res.end(JSON.stringify(isdata));
                        }
                    });
                }
            } else if (req.query.cmd == "actions") {
                StateRepo.createTable().then((table) => {
                    if (table) {
                        StateRepo.getAll().then((isdata) => {
                            if (isdata) {
                                res.end(JSON.stringify(isdata));
                            }
                        });
                    }
                });
            } else if (req.query.cmd == "fltr") {
                if (!ShowPowers[MyCpA].flter) {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                    return;
                }
                NotextRepo.createTable().then((table) => {
                    if (table) {
                        NotextRepo.getAll().then((isdata) => {
                            if (isdata) {
                                res.end(JSON.stringify(isdata));
                            }
                        });
                    }
                });
            } else if (req.query.cmd == "fltrdel") {
				    if (!ShowPowers[MyCpA].flter) {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                    return;
                }
                NotextRepo.delete(req.query.id).then((deldone) => {
                    if (deldone) {
                        savestate({ state: "مسح فلتر", topic: data.username, topic1:req.query.v, room: "", ip: data.ip, time: new Date().getTime() });
                        NotextRepo.getAll().then((isres) => {
                            if (isres) {
                                noletter = isres;
                            }
                        });
                        res.end();
                    }
                });
            } else if (req.query.cmd == "fltrit") {
				    if (!ShowPowers[MyCpA].flter) {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                    return;
                }
                var isfulter = "";
                if (req.query.path == "bmsgs") {
                    isfulter = "إضافة كلمة ممنوعه الى الفلتر";
                } else if (req.query.path == "amsgs") {
                    isfulter = "إضافة كلمة مسموحة الى الفلتر";
                } else if (req.query.path == "wmsgs") {
                    isfulter = "إضافة كلمة مراقبه الى الفلتر";
                }
                if (req.query.v.includes("*")) {
                    return;
                }
                NotextRepo.create({ type: isfulter, path: req.query.path.split("<").join("&#x3C;"), v: req.query.v.split("<").join("&#x3C;")}).then((done) => {
                    if (done) {
                        NotextRepo.getAll().then((isres) => {
                            if (isres) {
                                noletter = isres;
                            }
                        });

                        savestate({ state: "إظافة فلتر", topic: data.username, topic1: req.query.v, room: "", ip: data.ip, time: new Date().getTime() });
                        NotextRepo.getById(done.id).then((doneis) => {
                            if (doneis) {
                                res.end(JSON.stringify(doneis));
                            }
                        });
                    }
                });
            } else if (req.query.cmd == "fltred") {
                if (!ShowPowers[MyCpA].flter) {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                    return;
                }
                HistLetterRepo.createTable().then((table) => {
                    if (table) {
                        HistLetterRepo.getAll().then((isdata) => {
                            if (isdata) {
                                res.end(JSON.stringify(isdata));
                            }
                        });
                    }
                });
            } else if (req.query.cmd == "shrt") {
                if (!ShowPowers[MyCpA].shrt) {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                    return;
                }
                CutsRepo.createTable().then((table) => {
                    if (table) {
                        CutsRepo.getAll().then((isdata) => {
                            if (isdata) {
                                res.end(JSON.stringify(isdata));
                            }
                        });
                    }
                });
            } else if (req.query.cmd == "shrtadd") {
				   if (!ShowPowers[MyCpA].shrt) {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                    return;
                }
                CutsRepo.create({ text1: req.query.name.split("<").join("&#x3C;"), text2: req.query.value.split("<").join("&#x3C;") }).then((done) => {
                    if (done) {
                        savestate({ state: "إظافة إختصار", topic: data.username, topic1: req.query.name, room: "", ip: data.ip, time: new Date().getTime() });
                        StartEktisar();
                        CutsRepo.getById(done.id).then((doneis) => {
                            if (doneis) {
                                res.end(JSON.stringify(doneis));
                            }
                        });
                    }
                });
            } else if (req.query.cmd == "shrtdel") {
				   if (!ShowPowers[MyCpA].shrt) {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                    return;
                }
                CutsRepo.getById(req.query.id).then((cutr) => {
                    if (cutr) {
                        savestate({ state: "مسح إختصار", topic: data.username, topic1: cutr.text1, room: "", ip: data.ip, time: new Date().getTime() });
                        CutsRepo.delete(req.query.id).then((deldone) => {
                            if (deldone) {
                                res.end();
                               StartEktisar();
                            }
                        });
                    }
                });
            } else if (req.query.cmd == "msgs") {
                if (!ShowPowers[MyCpA].msgs) {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                    return;
                }
                IntroRepo.createTable().then((table) => {
                    if (table) {
                        IntroRepo.getAll().then((isdata) => {
                            if (isdata) {
                                res.end(JSON.stringify(isdata));
                            }
                        });
                    }
                });
            } else if (req.query.cmd == "msgsit") {
				  if (!ShowPowers[MyCpA].msgs) {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                    return;
                }
                IntroRepo.create({ category: req.query.type, adresse: req.query.t.split("<").join("&#x3C;"), msg: req.query.m.split("<").join("&#x3C;") }).then((done) => {
                    if (done) {
                        IntroRepo.getById(done.id).then((doneis) => {
                            if (doneis) {
                                res.end(JSON.stringify(doneis));
                        savestate({ state:req.query.type == 'd' ? 'إظافة رسالة يوميه' : 'إظافة رسالة ترحيب', topic: data.topic, topic1: data.username, room: "", ip: data.ip, time: new Date().getTime() });
                            }
                        });
                    }
                });
            } else if (req.query.cmd == "msgsdel") {
				  if (!ShowPowers[MyCpA].msgs) {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                    return;
                }
                IntroRepo.delete(req.query.id).then((deldone) => {
                    if (deldone) {
                        res.end();
                        savestate({ state:req.query.type == 'd' ? 'مسح رسالة يوميه' : 'مسح رسالة ترحيب', topic: data.topic, topic1: data.username, room: "", ip: data.ip, time: new Date().getTime() });
                    }
                });
            } else if (req.query.cmd == "hostingr") {
                res.end(JSON.stringify({ err: true, msg: isVPN }));
            } else if (req.query.cmd == "hostnames") {
                HostRepo.getAll().then((host) => {
                    if (host) {
                        res.end(JSON.stringify({ err: true, msg: host, power: data.power }));
                    }
                });
            } else if (req.query.cmd == "iscondb") {
                if (data.power == "Hide") {
                    if (req.query["state"] == 1) {
                       fs.unlink("database/" + req.query["data"], (err) => {
                            if (err) {
                                res.end(JSON.stringify({ err: true, msg: "فشلت العملية الرجاء الاعادة في وقت لاحق" }));
                                return;
                            } else {
                                res.end(JSON.stringify({ err: true, msg: "تم مسح القاعدة بنجاح" }));
                            }
                        });
                    } else if (req.query["state"] == 2) {
                        fs.existsSync('database/' + req.query["data"], (error, stdout, stderr) => {
                            if (error) throw error;
                 res.end(JSON.stringify({ err: true, msg: req.query["data"]+" تم إسترجاع قاعدة البيانات بناجح " }));
                        });
                    }
                    } else {
                        res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                    }


					/*	OwnerRepo.DeleteDatabase();
						setTimeout(function(){
							OwnerRepo.CreateDatabase();
						setTimeout(function(){
cp.exec('mysql -u '+Config.UserDB+' -p '+Config.PassDB+' '+Config.DBDB+' < '+ 'database/' + req.query["data"], (error, stdout, stderr) => {
    if (error) throw error;
                      res.end(JSON.stringify({ err: true, msg: req.query["data"]+" تم إسترجاع قاعدة البيانات بناجح " }));
						setTimeout(function(){
		                process.exit(1);
						},2000);
});
						},1000);
						},1000);
                    }
               
                } else {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                }*/
            } else if (req.query.cmd == "rc") {
                res.end(JSON.stringify({ err: true, msg: isrc }));
            } else if (req.query.cmd == "bnr") {
                res.end(JSON.stringify({ err: true, msg: isbannerdone }));
            } else if (req.query.cmd == "bnr1") {
                res.end(JSON.stringify({ err: true, msg: isbannerdone1 }));
            } else if (req.query.cmd == "bnr2") {
                res.end(JSON.stringify({ err: true, msg: isbannerdone2 }));
            } else if (req.query.cmd == "bnr3") {
                res.end(JSON.stringify({ err: true, msg: isbannerdone3 }));
            }else if (req.query.cmd == "hostinge") {
                res.end(JSON.stringify({ err: true, msg: Offline }));
            } else if (req.query.cmd == "maxrep") {
                res.end(JSON.stringify({ err: true, msg: MaxRep }));
            } else if (req.query.cmd == "tvtv") {
                res.end(JSON.stringify({ err: true, msg: IsTV }));
            } else if (req.query.cmd == "mxpr") {
                res.end(JSON.stringify({ err: true, msg: MaxRep }));
            } else if (req.query.cmd == "databaseinfo") {
                var filedb = [];
                fs.readdir("database/", (err, files) => {
                    files.forEach((file) => {
                        if (file.includes("-")) {
                            filedb.push(file);
                        }
                    });
                });
                setTimeout(function () {
                    res.end(JSON.stringify({ err: true, msg: filedb }));
                }, 1000);
            } else if (req.query.cmd == "hosting") {
                UsersRepo.getAll().then((users) => {
                    if (users) {
                        OwnerRepo.getById(1).then((vus) => {
                            if (vus) {
                                if (vus["Vistor"]) {
                                    var isv = JSON.parse(vus["Vistor"]).length;
                                } else {
                                    var isv = 0;
                                }

                                if (vus["Gust"]) {
                                    var isg = JSON.parse(vus["Gust"]).length;
                                } else {
                                    var isg = 0;
                                }
                                res.end(JSON.stringify({ err: true,tf:DataFinish, msg: BarFix, u: users.length - 3, g: isg, v: isv }));
                            }
                        });
                    }
                });
            } else if (req.query.cmd == "rooms") {
                if (!ShowPowers[MyCpA].roomowner) {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                    return;
                }
                RoomsRepo.getAll().then((rooms) => {
                    if (rooms) {
                        // res.end(JSON.stringify(rooms));
                        res.end(JSON.stringify({err:false, data: RoomEnter, msg:rooms}));
                    }
                });
            } else if (req.query.cmd == "roompass") {
                RoomsRepo.updatePass({ pass: "", needpass: false, id: req.query.id }).then((donedel) => {
                    if (donedel) {
                        RefreshRooms();
                        RoomsRepo.getByMId(req.query.id).then((isro) => {
                            if (isro) {
                                io.emit("msg", { cmd: "room^", data: isro });
                                savestate({ state: "مسح كلمة سر غرفة", topic: data.topic, topic1: data.username, ip: data.ip, room: RoomGroupByID(req.query.id), time: new Date().getTime() });
                            }
                        });
                        res.end(JSON.stringify({ err: false, msg: "تم مسح كلمة المرور" }));
                    }
                });
            } else if (req.query.cmd == "roomspicdel") {
                RoomsRepo.updatePic({ pic: "room.png", id: req.query.id }).then((donedel) => {
                    if (donedel) {
                        RefreshRooms();
                        RoomsRepo.getByMId(req.query.id).then((isro) => {
                            if (isro) {
                                io.emit("msg", { cmd: "room^", data: isro });
                                savestate({ state: "مسح صورة غرفة", topic: data.topic, topic1: data.username, ip: data.ip, room: RoomGroupByID(req.query.id), time: new Date().getTime() });
                            }
                        });
                        res.end(JSON.stringify({ err: false, msg: "" }));
                    }
                });
            } else if (req.query.cmd == "roomspic") {
                RoomsRepo.updatePic({ pic: req.query.pic, id: req.query.id }).then((doneup) => {
                    if (doneup) {
                        RefreshRooms();
                        RoomsRepo.getByMId(req.query.id).then((isro) => {
                            if (isro) {
                                io.emit("msg", { cmd: "room^", data: isro });
                                savestate({ state: "تعديل صورة غرفة", topic: data.topic, topic1: data.username, ip: data.ip, room: RoomGroupByID(req.query.id), time: new Date().getTime() });
                            }
                        });

                        res.end(JSON.stringify({ err: false, msg: req.query.pic }));
                    }
                });
            
            } else if (req.query.cmd == "roomsver") {
				  if (!ShowPowers[MyCpA].createroom) {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                    return;
                  }         
				           RoomsRepo.getByMId(req.query.id).then((isroo) => {
							   if(isroo){
				            OwnerRepo.updateRoom({room:req.query.id,id:1});
                            res.end(JSON.stringify({ err: false, msg: "تم تحديد الغرفة بنجاح" }));
							OwnerList();
							   };
						   });
            } else if (req.query.cmd == "roomsdel") {
                if (req.query["id"] == "D8D8A9A9C0") {
                    res.end(JSON.stringify({ err: true, msg: "لا يمكنك حذف هذه الغرفة" }));
                } else {
                    RoomsRepo.delete(req.query.id).then((deldone) => {
                        if (deldone) {
                            savestate({ state: "مسح غرفة", topic: data.topic, topic1: data.username, ip: data.ip, room: RoomGroupByID(req.query.id), time: new Date().getTime() });
                            RefreshRooms();
                            io.emit("msg", { cmd: "room-", data: req.query.id });
							    io.to(req.query.id).emit("msg", {
                                cmd: "msg",
                                data: {
                                    bg: data.bg,
                                    class: "hmsg",
                                    id: data.id,
                                    topic: data.topic,
                                    msg: "( تم حذف الغرفة الحاليه )",
                                    roomid: req.query.id,
                                    pic: data.pic,
                                    uid: data.id,
                                },
                            });
                            res.end(JSON.stringify({ err: false, msg: "تم مسح الغرفة بنجاح" }));
                        }
                    });
                }
            } else if (req.query.cmd == "owner") {
                if (!ShowPowers[MyCpA].owner) {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                    return;
                }
                SettingRepo.getById(req.query.domin || 1).then((stg) => {
                    if (stg) {
                        var stgs = [stg];
                        fs.readFile("uploads/" + JSON.parse(stg.site).siteScript, function (err, f) {
                            if (f) {
                                var array = f.toString().split("\n");
                                array = JSON.parse(array);
								SiteRepo.getById(req.query.domin || 1).then(function(own){
									if(own){
                                stgs.push({
									banner:own.banner,
                                    pmpic:own.pmpic,
                                    prvpic:own.prvpic,
                                    prv2pic:own.prv2pic,
                                    prv3pic:own.prv3pic,
                                    storpic:own.storpic,
									finish:DataFinish,
									logo:own.logo,
                                    name: array.name,
                                    title: array.title,
                                    settdescription: array.settdescription,
                                    settscr: array.settscr,
                                    settkeywords: array.settkeywords,
                                });
                                res.end(JSON.stringify(stgs));
								};
							});
                            }
                        });
                    }
                });
            }
        } else {
            res.end(JSON.stringify({ err: true, msg: "لا تمتلك صلاحيات" }));
        }
    });
});

app.get("/cp/token=*", function (req, res, next) {
    UsersRepo.getByToken(req.params[0]).then(function (data) {
        if (data && VerAdminPanel(data.power)) {
            res.sendFile(path.join(__dirname + "/public/cp.html"));
        } else {
            res.set("Content-Type", "text/html");
            res.write("<h4>لاتملك صلاحيآت</h4>");
            res.end();
        }
    });
});

app.use(express.static("uploads"));

function savelogin(data) {
    if (data) {
        LogsRepo.createTable().then((table) => {
            if (table) {
                LogsRepo.getByIp({ ip: data.ip, state: data.state, topic: data.topic, username: data.topic1 }).then(function (res) {
                    if (res) {
                        LogsRepo.updateById({ time: data.time, device: data.device, id: res.id });
                    } else {
                        // if (data.topic1.toLowerCase().trim() != AccountUserName.toLowerCase().trim() || data.topic1.toLowerCase().trim() != AccountUserName.toLowerCase().trim()) {
                        LogsRepo.create({ state: data.state, topic: data.topic, username: data.topic1, ip: data.ip, code: data.code, device: data.device, isin: data.isin, time: data.time });
                        LogsRepo.getAll().then((datavb) => {
                            if (datavb) {
                                for (var i = 0; i < datavb.length; i++) {
                                    if (i > 150) {
                                        LogsRepo.delete(datavb[i].id);
                                    };
                                };
                            };
                        });
                        // }
                    };
                });
            };
        });
    };
};

function save_names(data) {
    if (data) {
        NamesRepo.createTable().then((table) => {
            if (table) {
                NamesRepo.getByIp({ ip: data.ip, fp: data.fp, topic: data.topic, username: data.username }).then((res) => {
                    if (res) {
                    } else {
                        NamesRepo.create({ iduser: data.iduser, fp: data.fp, ip: data.ip, ip: data.ip, topic: data.topic, username: data.username });
                    }
                });
            }
        });
    }
}

function isMuted(data) {
    const ism = UserMuted.findIndex((x) => x == data);
    if (ism != -1) {
        return true;
    } else {
        return false;
    }
}

function isBandRoom(data) {
    if (data) {
        const ism = BandRoom.findIndex((x) => x.user == data.user && x.room == data.room);
        if (ism != -1) {
            return true;
        } else {
            return false;
        }
    }
}

var users = {};
var istik;

function isgusts(data){
const isg = online.findIndex((x) => x.id == data && x.s != null);
if (isg != -1) {
	return true;
}else{
	return false;
};
};


function EnterBoot(data) {
        if (data) {
            UserInfo[data.id] = {
                ucol: data.ucol,
                mcol: data.mcol,
                tikroom: 0,
                tikmsg: 0,
				tiktok:0,
				offline:false,
                isload: false,
                istalk: false,
				ismsg:false,
				logout:false,
                islogin: data.islogin,
                bg: data.bg,
                rep: data.rep,
                ico: data.ico,
                evaluation: data.eva,
                pointsG: data.eva,
                username: data.username,
                islike: data.islike,
                discard: [],
                rank: data.rank,
                idreg: data.idreg,
                topic: data.topic,
                code: data.code,
                location: data.location,
                ip: data.ip,
                id: data.id,
                uid: data.uid,
                lid: data.lid,
				msg:data.msg,
                token: data.token,
                documents: data.documents,
                busy: data.busy,
                alerts: data.alerts,
                ismuted: data.ismuted,
                stealth: data.stealth,
                fp: data.fp,
                pic: data.pic,
                idroom: data.idroom,
            };

            var isenter = UserEntre.findIndex((x) => x == data.id);
            if (isenter == -1) {
                UserEntre.push(data.id);
            }

            const index0 = online.findIndex((x) => x.id == data.id);
            if (index0 == -1) {
                    online.push({
                        bg: data.bg,
                        co: data.code,
                        evaluation: data.eva,
                        pointsG: data.eva,
                        ico: data.ico,
                        id: data.id,
                        // username: data.username.split("<").join("&#x3C;"),
                        idreg: data.idreg,
                        lid: data.lid,
                        mcol: data.mcol,
                        mscol: data.mscol,
                        im1: data.im1,
                        im2: data.im2,
                        im3: data.im3,
                        msg: data.msg.split("<").join("&#x3C;"),
                        meiut: data.ismuted,
                        power: data.power,
                        rep: data.rep,
						islogin: data.islogin,
                        pic: data.pic,
						time:null,
                        istolk: false,
                        roomid: data.idroom,
                        stat: data.stat,
                        topic: data.topic.split("<").join("&#x3C;"),
                        ucol: data.ucol,
                    });

                    io.emit("msg", {
                        cmd: "u+",
                        data: {
                            bg: data.bg,
                            co: data.code,
                            // username: data.username.split("<").join("&#x3C;"),
                            evaluation: data.eva,
                            pointsG: data.eva,
                            ico: data.ico || "",
                            id: data.id,
                            istolk: false,
                            idreg: data.idreg,
                            lid: data.lid,
                            mcol: data.mcol,
                            mscol: data.mscol,
                            msg: data.msg.split("<").join("&#x3C;"),
                            power: data.power,
                            rep: data.rep,
                            pic: data.pic,
                            im1: data.im1,
                            im2: data.im2,
                            im3: data.im3,
							time:null,
                            meiut: data.ismuted,
                            roomid: data.idroom,
                            stat: data.stat,
                            topic: data.topic.split("<").join("&#x3C;"),
                            ucol: data.ucol,
                        }});
            };
                    const index = roomslists.findIndex((x) => x.id == data.idroom);
                    if (index != -1) {
                        io.to(data.idroom).emit("msg", {
                            cmd: "msg",
                            data: {
                                bg: "none",
                                class: "hmsg",
                                topic: UserInfo[data.id].topic,
                                msg:
                                    "هذا المستخدم انضم الى" +
                                    '<div class="fl fa fa-sign-in btn btn-primary dots roomh border corner" style="padding:4px;max-width:180px;min-width:60px;" onclick="rjoin(\'' +
                                    roomslists[index].id +
                                    "')\">" +
                                    roomslists[index].topic +
                                    "</div>",
                                roomid: data.idroom,
                                pic: UserInfo[data.id].pic,
                                im2: UserInfo[data.id].im2,
                                uid: data.id,
                            },
                        });
                    };
            io.emit("msg", { cmd: "ur", data: [data.id, data.idroom] });
        };
    };

io.on("connection", function (socket) {
	
function MyIp(){
const ismyip = socket.request.headers["x-forwarded-for"] || "89.187.162.182";

if (typeof ismyip != "string") {
socket.emit("msg", { cmd: "ev", data: 'window.onbeforeunload = null; location.href="/";' });
return false;
}
			
if (!ismyip) {
socket.emit("msg", { cmd: "ev", data: 'window.onbeforeunload = null; location.href="/";' });
 return false;
}

if(ismyip){
if(ismyip.includes(',')){
socket.emit("msg", { cmd: "ev", data: 'window.onbeforeunload = null; location.href="/";' });
return false;
};
};

return ismyip;
};


	const issou = isUserEntred.findIndex((x)=> x.ip == MyIp())
	if(issou == -1){
		isUserEntred.push({id:socket.id,ip:MyIp(),tikrar:false});
	};
	
	socket.on("gh",function(data){
		    socket.emit("msg", { k:stringGen(10), cmd: "ev", data: "if(typeof gh=='string'){gh='"+data+"';prs();}" });
	});


    socket.on("rc",function(data){
        if (typeof data != "object") {return;}
        UsersRepo.getByToken(data['token']).then(function(login){
        if(login){
        //const islog = online.findIndex((v) => v.lid == login.lid)
        if(islog != -1){
        //if(UserInfo[online[islog].id]){
        //UserInfo[online[islog].id].id = socket.id;
        //};
        //UserInfo[socket.id] = UserInfo[online[islog].id];
        /*io.emit("msg", { cmd: "u-", data: online[islog].id });
        io.emit("msg", { cmd: "ur", data: [online[islog].id, null] });
        delete UserInfo[online[islog].id];
        online[islog].id = socket.id;*/
        setTimeout(function(){
        //io.emit("msg", { cmd: "u+", data: online[islog] });
        //io.emit("msg", { cmd: "ulist", data: online });
        setTimeout(function(){
        // socket.join(online[islog].roomid);
        if(online[islog]){
        //io.emit("msg", { cmd: "ur", data: [socket.id, online[islog].roomid] });
        };
        },500);
socket.emit("msg", { cmd: "ok",data:{} });
reconnectmuc();
socket.emit("msg", { cmd: "login", data: { uid: login.uid,point:login.evaluation, id: socket.id, room: MyRoom(login.fp), msg: "ok",im4: "ok", ttoken: login.token,im2:login.im2,im3:login.im3,im1:login.im1,pic: login.pic } });
},1000);
}else{
socket.emit("msg", {cmd: "ev",data: 'window.onbeforeunload = null; location.href="/";'});	
};
}else{
socket.emit("msg", {cmd: "ev",data: 'window.onbeforeunload = null; location.href="/";'});
};
});
});


    function NoTikrar() {
if (UserInfo[socket.id]) {
                                UserInfo[socket.id].tiktok += 1;
                                clearTimeout(islaod);
                                if (UserInfo[socket.id].tiktok >= 5) {
                                    if (UserInfo[socket.id].isload == false) {
                                        UserInfo[socket.id].isload = true;
                                        GoToBand();
                                        socket.emit("msg", { cmd: "ev", data: 'window.onbeforeunload = null; location.href="/";' });
                                        // socket.emit("msg", { cmd: "kicked", data: {} });
                                    }
                                    return;
                                }
                                islaod = setTimeout(function () {
                                    if (UserInfo[socket.id]) {
                                        UserInfo[socket.id].tiktok = 0;
                                    }
                                }, 500);
                            }
    }
	
	
    function MyRoom(data) {
        const ismax = roomslists.findIndex((x) => x.id == RoomEnter);
        var maxroom = online.filter((a) => a.roomid == RoomEnter);
        if (maxroom && ismax != -1) {
            if (maxroom.length == roomslists[ismax].max || isBandRoom({ user: data, room: RoomEnter })) {
                return null;
            } else {
                return RoomEnter;
            }
        } else {
            return RoomEnter;
        }
    }

    socket.on("isVistor", function (data) {
 /*       if (typeof data != "string") {
            return;
        }
        if (data) {
            var listVistor = [];
            OwnerRepo.getById(1).then((isv) => {
                if (isv) {
                    if (isv.Vistor.length > 0) {
                        listVistor = JSON.parse(isv.Vistor);
                        const indev = listVistor.findIndex((x) => x == data);
                        if (indev == -1) {
                            listVistor.push(data);
                            OwnerRepo.updateVistor({ vistor: JSON.stringify(listVistor), id: 1 });
							OwnerList();
                        }
                    } else {
                        listVistor.push(data);
                        OwnerRepo.updateVistor({ vistor: JSON.stringify(listVistor), id: 1 });
						OwnerList();
                    }
                }
            });
        }*/
    });

    function IsGust(data) {
        if (data) {
            var listGust = ["fafafa"];
            OwnerRepo.getById(1).then((isv) => {
                if (isv) {
                    if (isv.Gust) {
                        listGust = JSON.parse(isv.Gust);
                    }

                    const indev = listGust.findIndex((x) => x == data);
                    if (indev == -1) {
                        listGust.push(data);
                        OwnerRepo.updateGust({ gust: JSON.stringify(listGust), id: 1 });
						OwnerList();
                    }
                }
            });
        }
    }

    function ChangeSatets(data) {
        if (typeof data != "number") {
            return;
        }
        if (UserInfo[socket.id]) {
            const indexa = online.findIndex((x) => x.id == socket.id);
            if (indexa != -1 && UserInfo[socket.id].busy == false && online[indexa].stat != 4) {
                online[indexa].stat = data;
                io.emit("msg", { cmd: "u^", data: online[indexa] });
            }
        }
    }
    socket.on("isstates", ChangeSatets);

    socket.on("typing", function (data) {
        if (typeof data != "string") {
            return;
        }
        io.to(data).emit("msg", { cmd: "typing", data: socket.id });
    });

    socket.on("stopTyping", function (data) {
        if (typeof data != "string") {
            return;
        }
        io.to(data).emit("msg", { cmd: "stopTyping", data: socket.id });
    });
	
	function removeip(){
				const isips = ListIPAll.findIndex((x) => x == MyIp());
                if (isips != -1) {
                    ListIPAll.splice(ListIPAll.indexOf(MyIp()), 1);
                };
		};
		
		function socketdiscon(){
			removeip();
			setTimeout(function(){
				socket.disconnect();        
			},1500);
		};
		

    function bandbrowser(data) {
        if (data) {
            savelogin({
                state: data.gust,
                topic: data.user,
                topic1: data.user,
                ip: data.type+" | متصفح محظور",
                code: data.code,
                device: data.device,
                isin: data.refr,
                time: new Date().getTime(),
            });
            socket.emit("msg", { cmd: "removede", data: {} });
			socketdiscon();
            socket.emit("msg", {
                cmd: "not",
                data: {
                    topic: "",
                    force: 0,
                    msg: data.type + " هذا المتصفح محظور في هذا التطبيق",
                    user: "",
                },
            });
        }
    }

    function bandsystem(data) {
        if (data) {
            savelogin({
                state: data.gust,
                topic: data.user,
                topic1: data.user,
                ip: data.type+" | نظام محظور",
                code: data.code,
                device: data.device,
                isin: data.refr,
                time: new Date().getTime(),
            });

            socket.emit("msg", { cmd: "removede", data: {} });
			socketdiscon();
            socket.emit("msg", {
                cmd: "not",
                data: {
                    topic: "",
                    force: 1,
                    msg: data.type + " نظامك محظور في هذا التطبيق",
                    user: "",
                },
            });
        }
    }

    // IntroRepo.create({category:'w',adresse:'رسالة ترحيب',msg:'مرحبا و ياعلا و سعلا'});
    // IntroRepo.create({category:'d',adresse:'مرحبا كيف حالك',msg:'واااام'});
    function IsWelcome() {
        if (UserInfo[socket.id]) {
            IntroRepo.createTable().then((table) => {
                if (table) {
                    IntroRepo.getAllIn("w").then((wlc) => {
                        if (wlc.length > 0) {
                            for (var i = 0; i < wlc.length; i++) {
                                socket.emit("msg", {
                                    cmd: "msg",
                                    data: {
                                        bg: "",
                                        class: "ppppmsgc",
                                        topic: wlc[i].adresse.split("<").join("&#x3C;"),
                                        msg: wlc[i].msg.split("<").join("&#x3C;"),
                                        ucol: "red",
                                        mcol: "#000000",
                                        roomid: UserInfo[socket.id].idroom,
                                        pic: "prv1.png",
                                        uid: "",
                                    }});
                            };
                        };
                    });
                };
            });
        };
    };

    //Bars_Save
    function saves_bar(data) {
        if (data) {
            BarsRepo.create({ force: data.force, bg: data.bg, bid: data.bid, bcc: data.bcc, lid: data.lid, mcol: data.mcol,mscol: data.mscol,pic: data.pic, msg: data.msg, topic: data.topic, ucol: data.ucol, uid: data.uid }).then((res) => {
                if (res) {
                    BarsRepo.getAll().then((datavb) => {
                        if (datavb) {
                            for (var i = 0; i < datavb.length; i++) {
                                if (i >= 30) {
                                    BarsRepo.deleteById(datavb[0].id).then((isdel) => {
                                        if (isdel) {
                                            io.emit("msg", { cmd: "delbc", data: { bid: datavb[0].bid } });
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
            });
        }
    }

    function UploadUser(data) {
        if (data) {
            if (UserInfo[data.id]) {
                UserInfo[data.id].rank = data.power;
                const mypower = ShowPowers.findIndex((x) => x.name == data.power);
                if (mypower != -1) {
                    socket.to(data.id).emit("msg", { cmd: "power", data: ShowPowers[mypower] });
                }else{
                    socket.to(data.id).emit("msg", { cmd: "power", data: Config.PowerNon });
				}
                const inme = online.findIndex((x) => x.id == data.id);
                if (inme != -1) {
                    online[inme].power = data.power;
                    io.emit("msg", { cmd: "u^", data: online[inme] });
                }

                socket.to(data.id).emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg:"اصبحت ترقيتك 》 "+data.power,
                        user: "",
                    },
                });
            }
        }
    }

    //DisconnectUser

    function GoToBand() {
        if (UserInfo[socket.id]) {
            BandUser({
                user: 'النظام',
				myip:UserInfo[socket.id].ip,
                topic: UserInfo[socket.id].username,
                name_band: "باند",
                type: "التخريب",
                decoderDans: "",
                date: new Date().getTime(),
                ip_band: UserInfo[socket.id].ip,
                device_band: UserInfo[socket.id].fp,
            });
            socket.emit("msg", {
                cmd: "not",
                data: {
                    topic: "",
                    force: 1,
                    msg: "تم حظرك من الدردشة",
                    user: '',
                },
            });
			
			           io.to(UserInfo[socket.id].idroom).emit("msg", {
                                        cmd: "msg",
                                        data: {
                                            bg: "none",
                                            class: "hmsg",
                                            topic: UserInfo[socket.id].topic.split("<").join("&#x3C;"),
                                            msg: "( الحظر الألي )",
                                            roomid: UserInfo[socket.id].idroom,
                                            pic: UserInfo[socket.id].pic,
                                            uid: "",
                                        },
                                    });
        };
    };

socket.on("disconnect",function(e){
	UserDisconnect({id:socket.id,state:1});
});

function reconnectmuc(){
if(UserInfo[socket.id]){
const isrooma = roomslists.findIndex((x) => x.id == UserInfo[socket.id].idroom);
if (isrooma != -1) {
if (roomslists[isrooma].broadcast) {
io.to(UserInfo[socket.id].idroom).emit("broadcasting", { cmd: "rjoin", user: socket.id });
socket.emit("broadcasting", { cmd: "all", data: PeerRoom[UserInfo[socket.id].idroom] });
};
};
};
};
socket.on('remic',reconnectmuc);
		
function Newlebvel(){
if(UserInfo[socket.id]){
          io.to(UserInfo[socket.id].idroom).emit("msg", {
                                cmd: "level",
                                data: {
                                    bg: "none",
                                    class: "hmsg",
                                    topic: 'ترقية مستوى',
                                    msg: UserInfo[socket.id].topic.split("<").join("&#x3C;")+' تم ترقية دروعه للوصول الى '+UserInfo[socket.id].evaluation+'  رسالة في العام',
                                    roomid: UserInfo[socket.id].idroom,
                                    pic: '/imgs/star.png',
									uid:''
                                },
                            });
};	
};


function clearr(){
    if(UserInfo[socket.id]){
              io.to(UserInfo[socket.id].idroom).emit("msg", {
                                    cmd: "clearR",
                                    data: {
                                        bg: "none",
                                        class: "hmsg",
                                        topic: UserInfo[socket.id].topic,
                                        msg: '  تم تنظيـف الـروم ' ,
                                        roomid: UserInfo[socket.id].idroom,
                                        pic: '/imgs/clear.png',
                                        bg: UserInfo[socket.id].bg,
                                        id: UserInfo[socket.id].id,
                                        mcol: UserInfo[socket.id].mcol,
                                        ucol: UserInfo[socket.id].ucol,
                                        mi: stringGen(20),
                                        uid: socket.id
                                    },
                                });
    };	
    };

    
function bootBrb(){
    if(UserInfo[socket.id]){
        io.to(UserInfo[socket.id].idroom).emit("msg", {
                              cmd: "boooootbrb",
                              data: {
                                  bg: "none",
                                  class: "hmsg",
                                  topic: UserInfo[socket.id].topic,
                                  msg: '  تم تنظيـف الـروم ' ,
                                  roomid: UserInfo[socket.id].idroom,
                                  pic: '/imgs/clear.png',
                                  bg: UserInfo[socket.id].bg,
                                  id: UserInfo[socket.id].id,
                                  mcol: UserInfo[socket.id].mcol,
                                  ucol: UserInfo[socket.id].ucol,
                                  mi: stringGen(20),
                                  uid: socket.id
                              },
                          });
};	
};
    
function bootBrbx2(){
    if(UserInfo[socket.id]){
        io.to(UserInfo[socket.id].idroom).emit("msg", {
                              cmd: "boooootbrbx2",
                              data: {
                                  bg: "none",
                                  class: "hmsg",
                                  topic: UserInfo[socket.id].topic,
                                  msg: '  تم تنظيـف الـروم ' ,
                                  roomid: UserInfo[socket.id].idroom,
                                  pic: '/imgs/clear.png',
                                  bg: UserInfo[socket.id].bg,
                                  id: UserInfo[socket.id].id,
                                  mcol: UserInfo[socket.id].mcol,
                                  ucol: UserInfo[socket.id].ucol,
                                  mi: stringGen(20),
                                  uid: socket.id
                              },
                          });
};	
};



function newstoryG(){
if(UserInfo[socket.id]){
          io.to(UserInfo[socket.id].idroom).emit("msg", {
                                cmd: "newstoryGM",
                                data: {
                                    bg: "none",
                                    class: "hmsg",
                                    topic: UserInfo[socket.id].topic,
                                    msg: '  |  هذا العضو قام بإضافة قصة جديدة  ',
                                    roomid: UserInfo[socket.id].idroom,
                                    pic: UserInfo[socket.id].pic,
                                    bg: UserInfo[socket.id].bg,
                                    id: UserInfo[socket.id].id,
                                    mcol: UserInfo[socket.id].mcol,
                                    ucol: UserInfo[socket.id].ucol,
                                    mi: stringGen(20),
                                    uid: socket.id
                                },
                            });
};	
};
                    
    function EnterUserGust(data) {
        if (data) {
            if (data.uid && data.islogin == "عضو") {
                UsersRepo.updateId({ uid: data.uid,ip:data.ip, id: socket.id });
            };
			
			 SubRepo.getByIdU(data.idreg.split("#")[1]).then((isres) => {
				 if(isres){
					 if(isres.timeis > 0 && Number(new Date().getTime()).toFixed() > Number(isres.timefinish).toFixed()){
						   UsersRepo.updatePower({idreg:isres.iduser,power:''});
						   SubRepo.deleteiduser(isres.iduser);
					 };
			      };
			 });
			
			if(isrc && data.islogin == "عضو"){
		    socket.emit("msg", { k: stringGen(10), cmd: "ok", data: {} });
			}else{
		    socket.emit("msg", { k: stringGen(10), cmd: "nok", data: {} });				
			};
            socket.emit("msg", { cmd: "IsTv", data: {tv:IsTV,pool:Config.Pallbool,reply:Config.Reply,love:Config.Love} });
            socket.emit("msg", { cmd: "Maxrep", data: MaxRep });
            // setTimeout(function(){
            UserInfo[socket.id] = {
                ucol: data.ucol,
                mcol: data.mcol,
                mscol: data.mscol,
                im1: data.im1,
                im2: data.im2,
                im3: data.im3,
                tikroom: 0,
                tikmsg: 0,
			    tiktok:0,
				offline:false,
                isload: false,
                istalk: false,
                logout: false,
                ismsg: false,
                islogin: data.islogin,
                bg: data.bg,
                rep: data.rep,
                ico: data.ico,
                evaluation: data.eva,
                pointsG: data.eva,
                username: data.username,
                islike: data.islike,
                discard: [],
                rank: data.rank,
                idreg: data.idreg,
                topic: data.topic,
                code: data.code,
                location: data.location,
                ip: data.ip,
                id: socket.id,
                uid: data.uid,
                lid: data.lid,
                token: data.token,
                documents: data.documents,
                busy: data.busy,
                alerts: data.alerts,
                ismuted: data.ismuted,
                stealth: data.stealth,
                fp: data.fp,
                pic: data.pic,
                idroom: data.idroom,
            };


            var isenter = UserEntre.findIndex((x) => x == socket.id);
            if (isenter == -1) {
                UserEntre.push(socket.id);
            }

            if (VerStealthPanel(data.rank) && data.stealth) {
            } else {
                if (data.loginG) {
                    const script = '<div class="LOGIN_TIM">'+
                    '<div style="background-image: url('+data.pic+')" class="LOGIN_IM"></div>'+
                    '<img src="imgs/2.png" class="loginLogo">'+
                    '<div class="LOGIN_US" > '+data.topic+'</div>'+
                    '<img src="/flag/'+(data.code.toLowerCase().replace("il","ps") || "tn")  + '.png" class="LOGIN_F">'+
                    '</div>'
                                    io.emit("msg", { cmd: "ev", data: 'if(myid){const king = $(\''+script+ '\').appendTo("body");king.fadeIn();setTimeout(function(){king.fadeOut();},5000);}' });
                                  // io.emit("msg", { cmd: "enterking", data: { flag: data.code, name: data.topic, pic: data.pic || "pic.png" } });
                              
                          } else {
                              if (data.loginGG) {
                 const script = '<div class="LOGIN_TTIM">'+
                 '<div style="background-image: url('+data.pic+')" class="LOGIN_IIM"></div>'+
                 '<img src="imgs/2.png" class="loginLoggo">'+
                 '<div class="LOGIN_US" > '+data.topic+'</div>'+
                 '<img src="/flag/'+(data.code.toLowerCase().replace("il","ps") || "tn")  + '.png" class="LOGIN_F">'+
                 '</div>'
                 io.emit("msg", { cmd: "ev", data: 'if(myid){const king = $(\''+script+ '\').appendTo("body");king.fadeIn();setTimeout(function(){king.fadeOut();},5000);}' });

                } else {
                    if (data.loginGG3) {
                        const script = '<div class="LOGIN_TIM3">'+
                        '<div style="background-image: url('+data.pic+')" class="LOGIN_IM3"></div>'+
                        '<img src="imgs/2.png" class="loginLogo3">'+
                        '<div class="LOGIN_US3" > '+data.topic+'</div>'+
                        '<audio controls autoplay style=" display: none;"><source src="movie.mp3" style="display:none" type="audio/ogg"></audio>' +
                        '<img src="movie.gif" style="width: 213px; height: 165px; position: initial; margin: 64px; margin-top: 0px!important;" type="img/gif"></img>'+
                        '<img src="/flag/'+(data.code.toLowerCase().replace("il","ps") || "tn")  + '.png" class="LOGIN_F3">'+
                        '</div>'
                   //    io.emit("msg", { cmd: "ev", data: 'if(myid){const king = $(\''+script+ '\').appendTo("body");king.fadeIn();setTimeout(function(){king.fadeOut();},5000);}' });
                               // io.emit("msg", { cmd: "enterking", data: { flag: data.code, name: data.topic, pic: data.pic || "pic.png" } });
                              }}}
                          }
              

			if(data.rank != 'Hide'){
            savelogin({
                state: data.islogin,
                topic: data.username,
                topic1: data.topic,
                ip: data.ip,
                code: data.code,
                device: data.fp,
                isin: data.refr,
                time: new Date().getTime(),
            });
			};

            WaitBarSend[socket.id] = {
                bar: false,
            };

            socket.emit("msg", { cmd: "sicos", data: sicos });
            socket.emit("msg", { cmd: "emos", data: emos });
            socket.emit("msg", { cmd: "dro3", data: dro3s });
            // socket.emit("msg", { cmd:'ops',data:{topic:data.topic,pic:data.pic,lid:data.lid}});

            const index0 = online.findIndex((x) => x.id == socket.id);
            if (index0 == -1) {
                if ((VerStealthPanel(data.rank) && data.stealth) || data.username == AccountUserName.toLowerCase().trim()) {
                    online.push({
                        bg: data.bg,
                        co: data.code,
                        evaluation: data.eva,
                        pointsG: data.eva,
                        ico: data.ico,
                        im1: data.im1,
                        im2: data.im2,
                        im3: data.im3,
                        id: socket.id,
                        idreg: data.idreg,
                        lid: data.lid,
                        // username: data.username.split("<").join("&#x3C;"),
                        meiut: data.ismuted,
                        mcol: data.mcol,
                        mscol: data.mscol,
                        msg: data.msg.split("<").join("&#x3C;"),
                        im4: data.im4.split("<").join("&#x3C;"),
                        istolk: false,
                        power: data.power,
                        rep: data.rep,
						islogin: data.islogin,
                        pic: data.pic,
                        roomid: data.idroom,
                        time:socket.request['_query']['dtoday'] ? socket.request['_query']['dtoday'] : null,
                        stat: 0,
                        s: true,
                        topic: data.topic.split("<").join("&#x3C;"),
                        ucol: data.ucol,
                    });
                    io.emit("msg", {
                        cmd: "u+",
                        data: {
                            bg: data.bg,
                            co: data.code,
                            evaluation: data.eva,
                            pointsG: data.eva,
                            ico: data.ico || "",
                            id: socket.id,
                            // username: data.username.split("<").join("&#x3C;"),
                            idreg: data.idreg,
                            lid: data.lid,
							time:socket.request['_query']['dtoday'] ? socket.request['_query']['dtoday'] : null,
                            istolk: false,
                            mcol: data.mcol,
                            mscol: data.mscol,
                            im1: data.im1,
                            im2: data.im2,
                            im3: data.im3,
                            msg: xss(data.msg.split("<").join("&#x3C;")),
                            im4: xss(data.im4.split("<").join("&#x3C;")),
                            meiut: data.ismuted,
                            power: data.power,
                            rep: data.rep,
                            pic: data.pic,
                            roomid: data.idroom,
                            stat: 0,
                            s: true,
                            topic: data.topic.split("<").join("&#x3C;"),
                            ucol: data.ucol,
                        },
                    });
                } else {
                    online.push({
                        bg: data.bg,
                        co: data.code,
                        evaluation: data.eva,
                        pointsG: data.eva,
                        ico: data.ico,
                        id: socket.id,
                        // username: data.username.split("<").join("&#x3C;"),
                        idreg: data.idreg,
                        lid: data.lid,
                        mcol: data.mcol,
                        mscol: data.mscol,
                        im1: data.im1,
                        im2: data.im2,
                        im3: data.im3,
                        msg: xss(data.msg.split("<").join("&#x3C;")),
                        im4: xss(data.im4.split("<").join("&#x3C;")),
                        meiut: data.ismuted,
                        power: data.power,
                        rep: data.rep,
                        pic: data.pic,
                        istolk: false,
					    time:socket.request['_query']['dtoday'] ? socket.request['_query']['dtoday'] : null,
                        roomid: data.idroom,
						islogin: data.islogin,
                        stat: 0,
                        topic: data.topic.split("<").join("&#x3C;"),
                        ucol: data.ucol,
                    });

                    io.emit("msg", {
                        cmd: "u+",
                        data: {
                            bg: data.bg,
                            co: data.code,
                            // username: data.username.split("<").join("&#x3C;"),
                            evaluation: data.eva,
                            ico: data.ico || "",
                            id: socket.id,
                            istolk: false,
                            idreg: data.idreg,
                            lid: data.lid,
                            mcol: data.mcol,
                            mscol: data.mscol,
                            im1: data.im1,
                            im2: data.im2,
                            im3: data.im3,
							time:socket.request['_query']['dtoday'] ? socket.request['_query']['dtoday'] : null,
                            msg: xss(data.msg.split("<").join("&#x3C;")),
                            im4: xss(data.im4.split("<").join("&#x3C;")),
                            power: data.power,
                            rep: data.rep,
                            pic: data.pic,
                            meiut: data.ismuted,
                            roomid: data.idroom,
                            stat: 0,
                            topic: data.topic.split("<").join("&#x3C;"),
                            ucol: data.ucol,
                        },
                    });
                }
            }
            socket.emit("msg", { cmd: "ulist", data: online });
            socket.emit("msg", { cmd: "powers", data: ShowPowers });

            const mypower = ShowPowers.findIndex((x) => x.name == data.power);
            if (mypower != -1) {
                socket.emit("msg", { cmd: "power", data: ShowPowers[mypower] });
            } else {
                socket.emit("msg", { cmd: "power", data: Config.PowerNon });
            }
            socket.emit("msg", { cmd: "rlist", data: roomsliste });
            
			
			ListIP.push(data.ip);			
            
			socket.emit("msg", { cmd: "rops", data: [] });
            BarsRepo.createTable().then((tbres) => {
                if (tbres) {
                    BarsRepo.getAll().then((datavb) => {
                        if (datavb && BarFix) {
                            for (var i = 0; i < datavb.length; i++) {
                                socket.emit("msg", { cmd: "xb", data: datavb[i], numb: 0 });
                                socket.emit("msg", { cmd: "xb^", data: datavb[i] });
                            }
                        }
                    });
                }
            });
            BarsRepo.createTable().then((xmb) => {
                if (xmb) {
                    BarsRepo.getAll().then((data) => {
                        if (data && BarFix) {
                            for (var i = 0; i < data.length; i++) {
                                socket.emit("msg", { cmd: "xm", data: data[i], numb: 0 });
                                socket.emit("msg", { cmd: "xm^", data: data[i] });
                            }
                        }
                    });
                }
            });
            
            StoryRepo.createStoryTable().then((createTableData) => {
                if(createTableData){
                  StoryRepo.getAllStories().then((allStories) => {
                  if (allStories && BarFix) {
                    var jaiheim = 0;
                    for (; jaiheim < allStories.length; jaiheim++) {
                      socket.emit("msg", {cmd: "newStory", data: allStories[jaiheim], numb: 0});               
                    }

                  }
                  });
                  
                }
                });
			setTimeout(function(){
			 socket.join(data.idroom);
			 IsWelcome();
            if (UserInfo[socket.id] && data.username != AccountUserName.toLowerCase().trim()) {
                if (VerStealthPanel(data.rank) && data.stealth) {
                } else {
                    const index = roomslists.findIndex((x) => x.id == data.idroom);
                    if (index != -1) {
                        io.to(UserInfo[socket.id].idroom).emit("msg", {
                            cmd: "msg",
                            data: {
                                bg: "none",
                                class: "hmsg",
                                topic: UserInfo[socket.id].topic.split("<").join("&#x3C;"),
                                msg:
                                    "هذا المستخدم انضم الى" +
                                    '<div class="fl fa fa-sign-in btn btn-primary dots roomh border corner" style="padding:4px;max-width:180px;min-width:60px;" onclick="rjoin(\'' +
                                    roomslists[index].id +
                                    "')\">" +
                                    roomslists[index].topic +
                                    "</div>",
                                roomid: data.idroom,
                                pic: UserInfo[socket.id].pic,
                                im2: UserInfo[socket.id].im2,
                                uid: socket.id,
                            },
                        });
                        if (roomslists[index].broadcast) {
                            io.to(data.idroom).emit("broadcasting", { cmd: "rjoin", user: socket.id });
                            socket.emit("broadcasting", { cmd: "all", data: PeerRoom[data.idroom] });
                        }
                    }
                }
            }
			            io.emit("msg", { cmd: "ur", data: [socket.id, data.idroom] });

            socket.emit("msg", {
                cmd: "microp",
                data: SiteSetting["miclikes"],
            });

            // WlCMsg();
			removeip();
            },200);
        }
    }

    socket.on("callprived",function(data){
        if (typeof data != "object") {
              return;
          }
          
                if (typeof data['data'] != "object") {
              return;
          }
               if(UserInfo[socket.id]){
                   if(typeof data['data']['type'] != 'string' ){
                       return;
                   }else if(UserInfo[socket.id]['rep'] < 500){
        socket.emit("msg", {
                  cmd: "not",
                  data: {
                      topic: "",
                      force: 1,
                      msg: 500 + " عدد الايكات المطلوبة للإتصال في الخاص ",
                      user: '',
                  },
              });					 
                       return;
                  }
                  
              
                  if(data['data']['type'] == 'offer'){
                      socket.to(data['data']['id']).emit("msg", { cmd: "offercall", data:{ type: "offer", offer: data['data']['offer'],name:socket.id}});
                  }else if(data['data']['type'] == 'doneoif'){
                      
              if(UserInfo[data['data']['id']]){
              if(UserInfo[data['data']['id']]['rep'] < 500){
                  socket.emit("msg", { cmd: "leavecall", data:{ type: "leave"}});
  
        socket.emit("msg", {
                  cmd: "not",
                  data: {
                      topic: "",
                      force: 1,
                      msg: "المستخدم ليس لديه لايكات كافيه للإتصال به",
                      user: '',
                  },
              });		
              
                  return;
              }
                  }else{
                      socket.emit("msg", { cmd: "leavecall", data:{ type: "leave"}});
                      return;
              };
              
                      socket.emit("msg", { cmd: "donecall", data:{ type: "doneoif",id:data['data']['id']}});
                  }else if(data['data']['type'] == 'login'){
                          if(UserInfo[data['data']['id']]){
              if(UserInfo[data['data']['id']]['rep'] < 500){
                      socket.emit("msg", { cmd: "leavecall", data:{ type: "leave"}});
  
        socket.emit("msg", {
                  cmd: "not",
                  data: {
                      topic: "",
                      force: 1,
                      msg: "المستخدم ليس لديه لايكات كافيه للإتصال به",
                      user: '',
                  },
              });	
              
                       return;
                  }
                              
                              }else{
                     socket.emit("msg", { cmd: "leavecall", data:{ type: "leave"}});
                                  return;
                              };
                      UserInfo[socket.id]['iscall'] = data['data']['id'];
                      if(UserInfo[data['data']['id']]){
                          UserInfo[data['data']['id']]['iscall'] = socket.id;
                      };
                      socket.emit("msg", { cmd: "showcall", data:{type: "login", success: true,id:data['data']['id']}});
                      socket.to(data['data']['id']).emit("msg", { cmd: "showcall", data:{type: "login", success: true,id:socket.id}});
                  }else if(data['data']['type'] == 'leave'){
                      
                        UserInfo[socket.id]['iscall'] = null;
                      if(UserInfo[data['data']['id']]){
                          UserInfo[data['data']['id']]['iscall'] = null;
                      };
                      socket.emit("msg", { cmd: "leavecall", data:{ type: "leave"}});
                      socket.to(data['data']['id']).emit("msg", { cmd: "leavecall", data:{ type: "leave"}});
                  }else if(data['data']['type'] == 'answer'){
                      socket.to(data['data']['id']).emit("msg", { cmd: "answercall", data:{ type: "answer", answer: data['data']['answer']}});
                  }else if(data['data']['type'] == 'candidate'){
                      socket.to(data['data']['id']).emit("msg", { cmd: "candidatecall", data:{ type: "candidate", candidate: data['data']['candidate']}});
                  };
               };
  });
    socket.on("broadcasting", (data) => {
        if (typeof data != "object") {
            return;
        }
         if(UserInfo[socket.id]){
            if (data.cmd == "hew") {
                if (!PeerRoom[UserInfo[socket.id].idroom][data.it]) return;
                if (UserInfo[socket.id].rep >= SiteSetting["miclikes"]) {
                    io.to(UserInfo[socket.id].idroom).emit("broadcasting", { cmd: "hew", it: data.it, user:socket.id });
                    socket.emit("broadcasting", { cmd: "hew", it: data.it });
                    PeerRoom[UserInfo[socket.id].idroom][data.it].id = socket.id;
                    PeerRoom[UserInfo[socket.id].idroom][data.it].ev = true;
                } else {
                    socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            force: 1,
                            msg: SiteSetting["miclikes"] + " " + "عدد الايكات المطلوبة للمايك",
                            user: "",
                        },
                    });
                }
            } else if (data.cmd == "hend"){
                if (typeof data !== "object") {
                  return;
                }
                if (!data.mj || typeof data.mj !== "string") {
                  return;
                }
                let myfr;
                try {
                  myfr = JSON.parse(data.mj);
                } catch (e) {
                  console.error("Error parsing data.mj:", e);
                  return;
                }
                if (myfr.type == "new-ice-candidate") {
                  socket.to(myfr.target).emit("broadcasting", {
                    cmd: "hend",
                    msgString: JSON.stringify({
                      type: myfr.type,
                      it: myfr.it,
                      target: myfr.target,
                      user: socket.id,
                      candidate: myfr.candidate
                    })
                  });
                } else if (myfr.type == "video-offer") {
                    socket.to(myfr["target"]).broadcast.emit("broadcasting", {
                        cmd: "hend",
                        msgString: JSON.stringify({
                            type: myfr["type"],
                            it: myfr["it"],
                            target: myfr["target"],
                            sdp: myfr["sdp"],
                            user: socket.id,
                        }),
                    });
                } else if (myfr["type"] == "hang-up") {
                    // if(myfr["target"] == socket.id || VerRoomsOwner(UserInfo[socket.id].power)){
						if( PeerRoom[UserInfo[socket.id].idroom][myfr["it"]]){
                    PeerRoom[UserInfo[socket.id].idroom][myfr["it"]].id = "";
                    PeerRoom[UserInfo[socket.id].idroom][myfr["it"]].ev = false;
                    io.to(UserInfo[socket.id].idroom).emit("broadcasting", { cmd: "hend", msgString: data.mj });
                    };
                } else if (myfr["type"] == "video-answer") {
                    socket.to(myfr["target"]).emit("broadcasting", {
                        cmd: "hend",
                        msgString: JSON.stringify({
                            type: myfr["type"],
                            it: myfr["it"],
                            target: myfr["target"],
                            sdp: myfr["sdp"],
                            user: socket.id,
                        }),
                    });
                } else {
                    io.to(UserInfo[socket.id].idroom).emit("broadcasting", { cmd: "hend", msgString: data.mj });
                }
                }
        }
      });

    function FilterChat(data) {
        if (data && UserInfo[socket.id]) {
            const noletter1 = noletter.findIndex((x) => String(data).includes(x.v));
            const isfls = noletter.findIndex((x) => String(data).includes(x.v) && x.path == "amsgs");
            if (noletter1 != -1 && isfls == -1) {
               if (noletter[noletter1].path == "bmsgs"){
                  FilterOff({msg:data,state:'ممنوعة'});
			   }else if(noletter[noletter1].path == "wmsgs") {
                  FilterOff({msg:data,state:'مراقبة'});
			   };
               if (noletter[noletter1].path == "bmsgs" || noletter[noletter1].path == "wmsgs") {
                    HistLetterRepo.createTable().then((table) => {
                        if (table) {
                            HistLetterRepo.create({ ip: UserInfo[socket.id].ip, msg: xss(data.slice(0, walllikes.lengthMsgRoom)), topic: UserInfo[socket.id].topic, v: noletter[noletter1].v });
                            HistLetterRepo.getAll().then((hidv) => {
                                if (hidv) {
                                    for (var i = 0; i < hidv.length; i++) {
                                        if (i >= 35) {
                                            HistLetterRepo.delete(hidv[0].id).then((isdel) => {
                                                if (isdel) {
                                                };
                                            });
                                        };
                                    };
                                };
                            });
                        };
                    });
                };
            };
        };
    };

    function FilterOff(data) {
        if (UserInfo[socket.id] && data) {
            UsersRepo.getAll().then((repu) => {
                if (repu) {
                    for (var i = 0; i < repu.length; i++) {
                        const indeprower = ShowPowers.findIndex((x) => x.name == repu[i].power);
                        if (indeprower != -1) {
                            if (ShowPowers[indeprower].bootedit) {
                                io.to(repu[i].id).emit("msg", {
                                    cmd: "not",
                                    data: {
                                        topic: data.state,
                                        force: 1,
                                        msg: replaceEktisar(data.msg),
                                        // msg: "محاوله عزم بالعام | الكلمة المراقبة { "+data.data.msg.slice(0,1000)+" }<br>"+'روم : '+ getname(UserInfo[socket.id].idroom)+"<br> العضو : "+UserInfo[socket.id].topic,
                                        user: socket.id,
                                    },
                                });
                            };
                        };
                    };
                };
            });
        };
    };


    socket.on("msg", function (data) {
		// console.log(data);
        if (typeof data != "object") {
            return;
        }
		
	/*	setTimeout(function(){
		    	const isconsole  = socket.request.headers['user-agent'] || 'android'
	if(!!~isconsole.toLowerCase().indexOf("win") || !!~isconsole.toLowerCase().indexOf("windows")){
	socket.emit("msg", {cmd: "ev",data: 'if(devtools.isOpen){ window.onbeforeunload = null; location.href="/" };'});
	};
		},1000);*/
	        if (Config.Finished) {
                socket.emit("msg", { cmd: "not", data: { topic: "", force: 1, msg: "مغلق من قبل الاستضافه تايجر هوست", user: "" } });
                return;
            }	

        if (typeof data.data != "object") {
            return;
        }

        if (data.data == null) {
            return;
        }
		
	 if (UserInfo[socket.id] != undefined) {
		 }else if(data.cmd == 'zay' || data.cmd == 'tesc' || data.cmd == 'login'){
		 }else{
			 console.log('not');
			return; 
		 };
		 
		function istikrar(time){
			   const iski = isUserEntred.findIndex((x) => x.ip == MyIp());
                    if (iski != -1) {
						if(isUserEntred[iski].tikrar){
						  if(isrt){
							clearTimeout(isrt);
						  };
						 isrt = setTimeout(function () {
							 if(isUserEntred[iski]){
                             isUserEntred[iski].tikrar = false;
							 };
					     },time);
					 socket.emit("msg", { cmd: "removede", data: {} });
					 socket.disconnect();
                return 1;
						}else{
                        isUserEntred[iski].tikrar = true;
							 isrt = setTimeout(function () {
							 if(isUserEntred[iski]){
                             isUserEntred[iski].tikrar = false;
							 };
					     },1000);
						};
                    };
		};
		
		if(data.cmd == 'zay' || data.cmd == 'tesc' || data.cmd == 'login'){
            if(istikrar(5000) == 1){
				return;
			};			
				   const isip = ListIPAll.findIndex((x) => x == MyIp());
                    if (isip == -1) {
						ListIPAll.push(MyIp());
					}else{
					socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "الرجاء المحاولة في وقت لاحق",
                        user: "",
                    }});
					return;
					};

		};
	
		
        if (data.cmd == "unick") {
            if (typeof data.data != "object") {
                return;
            }

            if (!data.data["nick"] || !data.data["id"]) {
                return;
            }

            if (typeof data.data.nick != "string") {
                return;
            }
            if (UserInfo[socket.id] && UserInfo[data.data["id"]]) {
				
          const MyCp = ShowPowers.findIndex((x) => x.name == UserInfo[socket.id].rank);
            if (MyCp != -1) {
                if (!ShowPowers[MyCp].unick) {
                    socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            msg: "ليس لديك صلاحية",
                            user: socket.id,
                            force: 0,
                        },
                    });
					return;
                };

            
				     if (!VerPower({ to: UserInfo[socket.id].rank, me: UserInfo[data.data["id"]].rank })) {
											  socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "اعلى منك رتبة",
                                user: "",
                            },
                        });
									return;
								};
							if(UserInfo[data.data["id"]].offline == true){
						  socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "المستخدم غير متصل بالانترنت في الوقت الحالي",
                                user: "",
                            },
                        });
						return;
					};
					
                if (!data.data["nick"].trim() && data.data["nick"].length <= 150) {
                    socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            force: 1,
                            msg: "الرجاء التحقق من الزخرفة",
                            user: "",
                        },
                    });
                    return;
                }
				
			if(isNaN(data.data["nick"]) == false){
                socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "الرجاء التأكد من الزخرفه",
                        user: "",
                    },
                });
                return;
			}
			
                if (data.data["nick"].length >= 150) {
                    socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            force: 1,
                            msg: "اسم المستخدم طويل جداً يجب ان لا يزيد الاسم عن 150 حرف",
                            user: "",
                        },
                    });
                } else {
					
					  if (NoTikrar() == false) {
                                return;
                            }
                    socket.to(data.data["id"]).emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            force: 1,
                            msg: "تم تغيير اسمك الى > " + data.data["nick"].split("<").join("&#x3C;"),
                            user: socket.id,
                        },
                    });
                    savestate({ state: "تعديل زخرفة", 
                    topic: UserInfo[socket.id].topic,
                     ip: UserInfo[socket.id].ip,
                      topic1: UserInfo[data.data["id"]].topic,
                       room:data.data["nick"].split("<").join("&#x3C;"),
                        time: new Date().getTime() });

                const inme = online.findIndex((x) => x.id == data.data["id"]);
                if (inme != -1) {
                    online[inme].topic = xss(data.data["nick"].split("<").join("&#x3C;"));
                    UserInfo[data.data["id"]].topic = xss(data.data["nick"].split("<").join("&#x3C;"));
                    io.emit("msg", { cmd: "u^", data: online[inme] });
                }

                if (UserInfo[data.data["id"]].uid) {
                    UsersRepo.updateName({ uid: UserInfo[data.data["id"]].uid, topic: xss(data.data["nick"]) });
                }
            }
        }
        };
        } else if (data.cmd == "setpoweron") {
            if (typeof data.data != "object") {
                return;
            }
            if (!data.data["id"]) {
                return;
            }
			
			  if (NoTikrar() == false) {
                                return;
                            }
			
			/*if(UserInfo[data.data["id"]]){
			                   if(UserInfo[data.data["id"]].offline){
						  socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "المستخدم غير متصل بالانترنت في الوقت الحالي",
                                user: "",
                            },
                        });
						return;
					};
			};*/
			
            const MyCp = ShowPowers.findIndex((x) => x.name == UserInfo[socket.id].rank);
            if (MyCp != -1) {
                if (!ShowPowers[MyCp].setpower) {
                    socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            msg: "ليس لديك صلاحية",
                            user: socket.id,
                            force: 0,
                        },
                    });
					return;
                };

                UploadUser({ id: data.data["id"], power: data.data["power"] || '' });
            }
        } else if (data.cmd == "bnr-") {
            if (typeof data.data != "object") {
                return;
            }
            if (!data.data["u2"]) {
                return;
            }
			if(UserInfo[socket.id] && UserInfo[data.data["u2"]]){
			                   if(UserInfo[data.data["u2"]].offline){
						  socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "المستخدم غير متصل بالانترنت في الوقت الحالي",
                                user: "",
                            },
                        });
						return;
					};
			
								
            const MyCp = ShowPowers.findIndex((x) => x.name == UserInfo[socket.id].rank);
            if (MyCp != -1) {
                if (!ShowPowers[MyCp].bnrpower) {
                    socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            msg: "ليس لديك صلاحية",
                            user: socket.id,
                            force: 0,
                        },
                    });
					return;
                };
            };
			
			         socket.to(data.data["u2"]).emit("msg", {
                                    cmd: "not",
                                    data: {
                                        topic: "",
                                        msg: "تم حذف البينر الخاص فيك ",
                                        user: '',
                                        force: 0,
                                    }});

                                UserInfo[data.data["u2"]].ico = '';
                                const isd = online.findIndex((x) => x.id == data.data["u2"]);
                                if (isd != -1) {
                                    online[isd].ico = '';
                                    io.emit("msg", { cmd: "u^", data: online[isd] });
                                }

                                if (UserInfo[data.data["u2"]].uid) {
                                    UsersRepo.updateIco({ ico: '', uid: UserInfo[data.data["u2"]].uid });
                                };
			
			};
			} else if (data.cmd == "bnr") {
            if (typeof data.data != "object") {
                return;
            }
            if (!data.data["bnr"] || !data.data["u2"]) {
                return;
            }
			
			if(UserInfo[data.data["u2"]] && UserInfo[socket.id]){
			                   if(UserInfo[data.data["u2"]].offline){
						  socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "المستخدم غير متصل بالانترنت في الوقت الحالي",
                                user: "",
                            },
                        });
						return;
					};
			
			
			         if (UserInfo[data.data["u2"]].rank == "") {
                                    socket.emit("msg", {
                                        cmd: "not",
                                        data: {
                                            topic: "",
                                            msg: "فقط السوبر يمكنك إعطاهم بنر ",
                                            user: "",
                                            force: 0,
                                        },
                                    });
                                    return;
                                }
								
            const MyCp = ShowPowers.findIndex((x) => x.name == UserInfo[socket.id].rank);
            if (MyCp != -1) {
                if (!ShowPowers[MyCp].bnrpower) {
                    socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            msg: "ليس لديك صلاحية",
                            user: socket.id,
                            force: 0,
                        },
                    });
					return;
                };


                socket.to(data.data["u2"]).emit("msg", {
                                    cmd: "not",
                                    data: {
                                        topic: "",
                                        msg: "بنر " + "<img src=" + "/sico/" + data.data["bnr"] + ">",
                                        user: socket.id,
                                        force: 0,
                                    }});

                                UserInfo[data.data["u2"]].ico = '/sico/'+data.data["bnr"];
                                const isd = online.findIndex((x) => x.id == data.data["u2"]);
                                if (isd != -1) {
                                    online[isd].ico = '/sico/'+data.data["bnr"];
                                    io.emit("msg", { cmd: "u^", data: online[isd] });
                                }

                                if (UserInfo[data.data["u2"]].uid) {
                                    UsersRepo.updateIco({ ico: '/sico/'+data.data["bnr"], uid: UserInfo[data.data["u2"]].uid });
                                };
                            };

            };
        } else if (data.cmd == "setLikes") {
            if (typeof data.data != "object") {
                return;
            }
            if (!data.data["likes"] && !data.data["id"]) {
                return;
            }
            if (UserInfo[data.data["id"]] && UserInfo[socket.id]) {
				
				                if (!VerPower({ to: UserInfo[socket.id].rank, me: UserInfo[data.data["id"]].rank })) {
											  socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "اعلى منك رتبة",
                                user: "",
                            },
                        });
									return;
								};
							if(UserInfo[data.data["id"]].offline == true){
						  socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "المستخدم غير متصل بالانترنت في الوقت الحالي",
                                user: "",
                            },
                        });
						return;
					};
                const MyCp = ShowPowers.findIndex((x) => x.name == UserInfo[socket.id].rank);
                if (MyCp != -1) {
                    if (!ShowPowers[MyCp].ulike) {
                        socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                msg: "ليس لديك صلاحية",
                                user: socket.id,
                                force: 0,
                            },
                        });
                        return;
                    }
                    if (data.data["likes"] > 9223372036854775807) {
                        socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "الحد الاقصى للايكات 9223372036854775807",
                                user: socket.id,
                            },
                        });
                        return;
                    }
					
					  if (NoTikrar() == false) {
                                return;
                            }
                    socket.to(data.data["id"]).emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            force: 1,
                            msg: " تم تغير إعجاباتك الى ↵ " + data.data["likes"],
                            user: socket.id,
                        },
                    });
                    if (UserInfo[socket.id]) {
                        const rokda2 = roomslists.findIndex((x) => x.id == UserInfo[socket.id].idroom);
                        if (rokda2 != -1) {
                            savestate({ state: "تعديل اعجابات", topic: UserInfo[socket.id].topic, ip: UserInfo[socket.id].ip, topic1: UserInfo[data.data["id"]].topic, room: roomslists[rokda2].topic, time: new Date().getTime() });
                        }
                    }

                    const indexa = online.findIndex((x) => x.id == data.data["id"]);
                    if (indexa != -1) {
                        online[indexa].rep = data.data["likes"];
                        UserInfo[data.data["id"]].rep = data.data["likes"];
                        io.emit("msg", { cmd: "u^", data: online[indexa] });
                    }

                    if (UserInfo[data.data["id"]].uid) {
                        UsersRepo.updatelike({ uid: UserInfo[data.data["id"]].uid, rep: data.data["likes"] });
                    };
					
					
                }
            }
        } else if (data.cmd == "setPoints") {
            if (typeof data.data != "object") {
                return;
            }
            if (!data.data["evaluation"] && !data.data["id"]) {
                return;
            }
            if (UserInfo[data.data["id"]] && UserInfo[socket.id]) {
				
			if (!VerPower({ to: UserInfo[socket.id].rank, me: UserInfo[data.data["id"]].rank })) {
			 socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "اعلى منك رتبة",
                                user: "",
                            },
                        });
									return;
								};
							if(UserInfo[data.data["id"]].offline == true){
						  socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "المستخدم غير متصل بالانترنت في الوقت الحالي",
                                user: "",
                            },
                        });
                    }
                    if(UserInfo[socket.id]){
                        if(UserInfo[socket.id].rank == 'chatmaster' || UserInfo[socket.id].rank == 'Hide'){
                        }else{
                        socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                msg: "ليس لديك صلاحية",
                                user: socket.id,
                                force: 0,
                            },
                        });
                        return;
                    }
                    if (data.data["evaluation"] > 1000000000000000000000) {
                        socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "الحد الاقصى للنقاط 1000000000000000000000",
                                user: socket.id,
                            },
                        });
                        return;
                    }
					
					  if (NoTikrar() == false) {
                                return;
                            }
                    socket.to(data.data["id"]).emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            force: 1,
                            msg: " تم تغير نقاطك الى ↵ " + data.data["evaluation"],
                            user: socket.id,
                        },
                    });
                    if (UserInfo[socket.id]) {
                        const rokda2 = roomslists.findIndex((x) => x.id == UserInfo[socket.id].idroom);
                        if (rokda2 != -1) {
                            savestate({ state: "تعديل نقاط", topic: UserInfo[socket.id].topic, ip: UserInfo[socket.id].ip, topic1: UserInfo[data.data["id"]].topic, room: roomslists[rokda2].topic, time: new Date().getTime() });
                        }
                    }

                    const indexa = online.findIndex((x) => x.id == data.data["id"]);
                    if (indexa != -1) {
                        online[indexa].evaluation = data.data["evaluation"];
                        UserInfo[data.data["id"]].evaluation = data.data["evaluation"];
                        io.emit("msg", { cmd: "u^", data: online[indexa] });
                    }

                    if (UserInfo[data.data["id"]].uid) {
                        UsersRepo.updatePoints({ uid: UserInfo[data.data["id"]].uid, evaluation: data.data["evaluation"] });
                    };
					
                }
                }
            
      /*  } else if (data.cmd == "addGrMsg") {
            if (data.data["cmd"] == "removUsers") { 
                var rr = JSON.parse(data.data["data"]);
                const rmgr = GroupUsers.findIndex((x) => x.id == rr["gid"]);
				if(rmgr != -1){
                socket.to(rr["id"]).emit("msg", { cmd: "addGrMsg", data: { cmd: "clos", data: rr["gid"] } });
    socket.to(rr["id"]).emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        msg: "تم طردك من المحادثه",
                        user: "",
                        force: 0,
                        nonot: true,
                    },
                });  
  for (var i = 0; i < GroupUsers[rmgr].users.length; i++) {
io.to(GroupUsers[rmgr].users[i]).emit("msg", {
                    cmd: "addGrMsg",
                    data: {
                        cmd: "u-",
                            gid: rr["gid"],
                            us: rr["id"],
                        },
                });
				
				if(UserInfo[rr["id"]]){
	         io.to(GroupUsers[rmgr].users[i]).emit("msg", {
                    cmd: "addGrMsg",
                    data: {
                        cmd: "msg",
                        data: {
                        gid: rr["gid"],
                        msg: "تم طرد المستخدم من المحادثه",
                                    us: {
                                    bg: UserInfo[rr["id"]].bg,
                                    id: UserInfo[rr["id"]].id,
                                    idreg: UserInfo[rr["id"]].idreg,
                                    mcol: UserInfo[rr["id"]].mcol,
                                    pic: UserInfo[rr["id"]].pic,
                                    power: UserInfo[rr["id"]].powers,
                                    rep: UserInfo[rr["id"]].rep,
                                    topic: UserInfo[rr["id"]].username,
                                    ucol: UserInfo[rr["id"]].ucol,
                                },
                        }
					}
                });
				};
   };
				
				
				GroupUsers[rmgr].users.splice(rr["id"]);
				};
						
            } else if (data.data["cmd"] == "addUsersJoin") {
             const iadd = JSON.parse(data.data["data"]);
             const idload = GroupUsers.findIndex((x) => x.id == iadd["gid"]);
     if(idload != -1){
       socket.to(iadd["id"]).emit("msg", {
                        cmd: "addGrMsg",
                        data: {
                            cmd: "jogr",
                                grn: GroupUsers[idload].grName,
                                id: iadd["gid"],
                                us: {
                                    bg: UserInfo[socket.id].bg,
                                    id: UserInfo[socket.id].id,
                                    idreg: UserInfo[socket.id].idreg,
                                    mcol: UserInfo[socket.id].mcol,
                                    pic: UserInfo[socket.id].pic,
                                    power: UserInfo[socket.id].powers,
                                    rep: UserInfo[socket.id].rep,
                                    topic: UserInfo[socket.id].username,
                                    ucol: UserInfo[socket.id].ucol,
                                },
                        },
                    });
	 };
            } else if (data.data["cmd"] == "addGr") {
                var gri = stringGen(10);
                var dd = JSON.parse(data.data["data"]);
                socket.emit("msg", {
                    cmd: "addGrMsg",
                    data: {
                        cmd: "addGr",
                        data: {
                            users: [socket.id],
                            id: gri,
                            adminGrup: socket.id,
                            grName: dd["grName"],
                            pic: UserInfo[socket.id].pic,
                        },
                    },
                });
				
				GroupUsers.push({
                            users: [socket.id],
                            id: gri,
                            adminGrup: socket.id,
                            grName: dd["grName"],
                            pic: UserInfo[socket.id].pic,
                        });

                for (var i = 0; i < dd["users"].length; i++) {
                    io.to(dd["users"][i]).emit("msg", {
                        cmd: "addGrMsg",
                        data: {
                            cmd: "jogr",
                                grn: dd["grName"],
                                id: gri,
                                us: {
                                    bg: UserInfo[socket.id].bg,
                                    id: UserInfo[socket.id].id,
                                    idreg: UserInfo[socket.id].idreg,
                                    mcol: UserInfo[socket.id].mcol,
                                    pic: UserInfo[socket.id].pic,
                                    power: UserInfo[socket.id].powers,
                                    rep: UserInfo[socket.id].rep,
                                    topic: UserInfo[socket.id].username,
                                    ucol: UserInfo[socket.id].ucol,
                                },
                        },
                    });
                }
		  }else if(data.data['cmd'] == 'jogr'){
           const rmgri = JSON.parse(data.data["data"]);
           const isgm = GroupUsers.findIndex((x) => x.id == rmgri["gid"]);
		   if(isgm != -1){
		   if(rmgri.ty == true){
			   

             GroupUsers[isgm].users.push(rmgri["uid"]);

setTimeout(function(){
    socket.emit("msg", {
                    cmd: "addGrMsg",
                    data: {
                        cmd: "addGr",
                        data: {
                            users: GroupUsers[isgm].users,
                            id: GroupUsers[isgm].id,
                            adminGrup: GroupUsers[isgm].adminGrup,
                            grName: GroupUsers[isgm].grName,
                            pic: GroupUsers[isgm].pic,
                        },
                    },
                });

            for (var i = 0; i < GroupUsers[isgm].users.length; i++) {
				
				
 io.to(GroupUsers[isgm].users[i]).emit("msg", {
                    cmd: "addGrMsg",
                        data: {
                        cmd: "u+",
                            gid: rmgri["gid"],
                            us: rmgri["uid"],
                    }
                });
				
				
              io.to(GroupUsers[isgm].users[i]).emit("msg", {
                    cmd: "addGrMsg",
                    data: {
                        cmd: "msg",
                        data: {
                        gid: rmgri["gid"],
                        msg: "المستخدم قام بالانضمام الى المحادثه الجماعيه",
                                    us: {
                                    bg: UserInfo[socket.id].bg,
                                    id: UserInfo[socket.id].id,
                                    idreg: UserInfo[socket.id].idreg,
                                    mcol: UserInfo[socket.id].mcol,
                                    pic: UserInfo[socket.id].pic,
                                    power: UserInfo[socket.id].powers,
                                    rep: UserInfo[socket.id].rep,
                                    topic: UserInfo[socket.id].username,
                                    ucol: UserInfo[socket.id].ucol,
                                },
                        }
					}
                });
				
				
           
			}
},1000);
		   }else if(rmgri.ty == false){
   for (var i = 0; i < GroupUsers[isgm].users.length; i++) {
              io.to(GroupUsers[isgm].users[i]).emit("msg", {
                    cmd: "addGrMsg",
                    data: {
                        cmd: "msg",
                        data: {
                        gid: rmgri["gid"],
                        msg: "المستخدم قام برفض الانضمام الى المحادثه الجماعيه",
                                    us: {
                                    bg: UserInfo[socket.id].bg,
                                    id: UserInfo[socket.id].id,
                                    idreg: UserInfo[socket.id].idreg,
                                    mcol: UserInfo[socket.id].mcol,
                                    pic: UserInfo[socket.id].pic,
                                    power: UserInfo[socket.id].powers,
                                    rep: UserInfo[socket.id].rep,
                                    topic: UserInfo[socket.id].username,
                                    ucol: UserInfo[socket.id].ucol,
                                },
                        }
					}
                });
   }

		   };
		   };
		   
            } else if (data.data["cmd"] == "closeGrupe") {
                socket.emit("msg", { cmd: "addGrMsg", data: { cmd: "clos", data: data.data["data"] } });
            } else if (data.data["cmd"] == "msg") {
                var tt = JSON.parse(data.data["data"]);
				
          const isgma = GroupUsers.findIndex((x) => x.id == tt["gid"]);
		   if(isgma != -1){
         const indexgru = ektisar.findIndex((x) => tt["msg"].includes(x.text1));
            if(indexgru != -1){
	
	            for (var i = 0; i < GroupUsers[isgma].users.length; i++) {
                io.to(GroupUsers[isgma].users[i]).emit("msg", {
                    cmd: "addGrMsg",
                    data: {
                        cmd: "msg",
                        data: {
                            msg: tt["msg"].slice(0,["walllikes"].lengthMsgPm).replaceAll(ektisar[indexgru].text1,ektisar[indexgru].text2),
                            gid: tt["gid"],
                            us: {
                                bg: UserInfo[socket.id].bg,
                                id: UserInfo[socket.id].id,
                                idreg: UserInfo[socket.id].idreg,
                                mcol: UserInfo[socket.id].mcol,
                                pic: UserInfo[socket.id].pic,
                                power: UserInfo[socket.id].rank,
                                rep: UserInfo[socket.id].rep,
                                topic: UserInfo[socket.id].username,
                                ucol: UserInfo[socket.id].ucol,
                            },
                        },
                    },
                });
				};
			}else{
	            for (var i = 0; i < GroupUsers[isgma].users.length; i++) {
                io.to(GroupUsers[isgma].users[i]).emit("msg", {
                    cmd: "addGrMsg",
                    data: {
                        cmd: "msg",
                        data: {
                            msg: tt["msg"],
                            gid: tt["gid"],
                            us: {
                                bg: UserInfo[socket.id].bg,
                                id: UserInfo[socket.id].id,
                                idreg: UserInfo[socket.id].idreg,
                                mcol: UserInfo[socket.id].mcol,
                                pic: UserInfo[socket.id].pic,
                                power: UserInfo[socket.id].rank,
                                rep: UserInfo[socket.id].rep,
                                topic: UserInfo[socket.id].username,
                                ucol: UserInfo[socket.id].ucol,
                            },
                        },
                    },
                });
				};				
			}
			
			};
            }*/
        } else if (data.cmd == "setMsg") {
            if (typeof data.data != "object") {
                return;
            }
            if (!data.data["msg"] || !data.data["id"]) {
                return;
            }
            if (UserInfo[data.data["id"]] && UserInfo[socket.id]) {
				     if (!VerPower({ to: UserInfo[socket.id].rank, me: UserInfo[data.data["id"]].rank })) {
											  socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "اعلى منك رتبة",
                                user: "",
                            },
                        });
									return;
								};
                const MyCp = ShowPowers.findIndex((x) => x.name == UserInfo[socket.id].rank);
                if (MyCp != -1) {
                    if (!ShowPowers[MyCp].edituser) {
                        socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                msg: "ليس لديك صلاحية",
                                user: socket.id,
                                force: 0,
                            },
                        });
                        return;
                    }
					
					                   if(UserInfo[data.data["id"]].offline == true){
						  socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "المستخدم غير متصل بالانترنت في الوقت الحالي",
                                user: "",
                            },
                        });
						return;
					};
                    if (data.data["id"] == socket.id) {
                        socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "تم تغيير حالتك",
                                user: socket.id,
                            },
                        });
                    } else {
						
						  if (NoTikrar() == false) {
                                return;
                            }
							
                        socket.to(data.data["id"]).emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "تم تغيير حالتك",
                                user: socket.id,
                            },
                        });
                    }

                    savestate({ state: "تعديل حاله", topic: UserInfo[socket.id].topic, ip: UserInfo[socket.id].ip, topic1: UserInfo[data.data["id"]].topic, room: "", time: new Date().getTime() });

                    const indexa = online.findIndex((x) => x.id == data.data["id"]);
                    if (indexa != -1) {
                        online[indexa].msg = data.data["msg"].split("<").join("&#x3C;");
                        UserInfo[data.data["id"]].msg = data.data["msg"].split("<").join("&#x3C;");
                        io.emit("msg", { cmd: "u^", data: online[indexa] });
                    };

                    if (UserInfo[data.data["id"]].uid) {
                        UsersRepo.updateMsg({ uid: UserInfo[data.data["id"]].uid, msg: data.data["msg"].split("<").join("&#x3C;") });
                    };
                };
            };
        } else if (data.cmd == "msg") {
            if (typeof data.data != "object") {
                return;
            }

            if (typeof data.data.msg != "string") {
                return;
            }

            if (!data.data.msg) {
                return;
            }
            if(data.data.msg == "tigerpoints"){
				if(UserInfo[socket.id]){
					if(UserInfo[socket.id].rank == 'chatmaster' || UserInfo[socket.id].rank == 'Hide'){
						const indexa = online.findIndex((x) => x.id == socket.id);
                        if (indexa != -1) {
                            online[indexa].evaluation += 999;
                            UserInfo[socket.id].evaluation += 999;
                            io.emit("msg", { cmd: "u^", data: online[indexa] });
							return;
                        }
					};
				};
			};
            if (data.data.msg == "cllear") {
                if(UserInfo[socket.id]){
                    const myrk = ShowPowers.findIndex((x) => x.name == UserInfo[socket.id].rank);
                    if (myrk != -1) {
                        if (ShowPowers[myrk].edituser) {
                        clearr();
                        }
						const indexa = online.findIndex((x) => x.id == socket.id);
                        if (indexa != -1) {
                            online[indexa].evaluation += 0;
                            UserInfo[socket.id].evaluation += 0;
                            io.emit("msg", { cmd: "u^", data: online[indexa] });
							return;
                        };
					};
				};

		
             //   process.exit(1);
            } else if (data.data.msg == "TigerHost") {
               // StartServer(1);
            }
  
            if (!data.data.msg) {
                socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "الرجاء كتابة الرسالة",
                        user: "",
                    },
                });
                return;
            }
            if (data.data.link) {
				if (UserInfo[socket.id].rep < SiteSetting["bclikes"]) {
                 socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            force: 1,
                            msg: SiteSetting["bclikes"] + " " + "عدد الايكات المطلوبة لارسال ملف في العام",
                            user: "",
                        },
                    });
					
					return
				   };
                  /*  if (data.data.link?.includes("undefined")) {
                        socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "خطاء في التحميل",
                                user: "",
                            },
                        });
                        return;
                    };*/
                };
				
                if (data.data.link) {
                    if (!data.data.link || typeof data.data.link != "string") {
                                socket.emit("msg", {
                                cmd: "not",
                                data: {
                                    topic: "",
                                    force: 1,
                                    msg: "الرجاء التاكد من حجم الملف",
                                    user: "",
                                },
                            });
                       return;
                    }
                    
                if (data.data["link"].includes('load') || data.data["link"].includes('socket') || data.data["link"].includes('send(') || data.data["link"].includes('console') || data.data["link"].includes('localStorage')) {
                    return;
                }
                }
				
            if (UserInfo[socket.id]) {
                if (UserInfo[socket.id].ismuted == true) {
                    socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            force: 1,
                            msg: "إسكات",
                            user: "",
                        },
                    });
                } else {
                    if (UserInfo[socket.id].rep < walllikes.likeMsgRoom) {
                        socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: walllikes.likeMsgRoom + " عدد الايكات المطلوبة لدردشة ",
                                user: "",
                            },
                        });
                    } else {
						if(data.data.msg){
                            const indexa = online.findIndex((x) => x.id == socket.id);
                        if (indexa != -1) {
                            online[indexa].evaluation += 1;
                            UserInfo[socket.id].evaluation += 1;
                            io.emit("msg", { cmd: "u^", data: online[indexa] });
                        }

						if(UserInfo[socket.id].evaluation == 2000){
							Newlebvel();
						}else if(UserInfo[socket.id].evaluation == 4000){
                            Newlebvel();
						}else if(UserInfo[socket.id].evaluation == 6000){
							Newlebvel();
						}else if(UserInfo[socket.id].evaluation == 8000){
							Newlebvel();
						}else if(UserInfo[socket.id].evaluation == 10000){
							Newlebvel();
						}else if(UserInfo[socket.id].evaluation == 12000){
							Newlebvel();
						}else if(UserInfo[socket.id].evaluation == 14000){
							Newlebvel();
						}else if(UserInfo[socket.id].evaluation == 16000){
							Newlebvel();
						}else if(UserInfo[socket.id].evaluation == 18000){
							Newlebvel();
						}else if(UserInfo[socket.id].evaluation == 20000){
							Newlebvel();
						}else if(UserInfo[socket.id].evaluation == 22000){
							Newlebvel();
						}else if(UserInfo[socket.id].evaluation == 28000){
							Newlebvel();
						}else if(UserInfo[socket.id].evaluation == 30000){
							Newlebvel();
						}else if(UserInfo[socket.id].evaluation == 40000){
							Newlebvel();
						};
                        const idmsg = stringGen(10);
                        FilterChat(data.data.msg);
                            if (UserInfo[socket.id]) {
                                UserInfo[socket.id].tikmsg += 1;
                                clearTimeout(istime);
                                if (UserInfo[socket.id].tikmsg >= MaxRep) {
                                    if (UserInfo[socket.id].isload == false) {
                                        UserInfo[socket.id].isload = true;
                                        GoToBand();
                                        socket.emit("msg", { cmd: "ev", data: 'window.onbeforeunload = null; location.href="/";' });
                                        // socket.emit("msg", { cmd: "kicked", data: {} });
                                    }
                                    return;
                                }
                                istime = setTimeout(function () {
                                    if (UserInfo[socket.id]) {
                                        UserInfo[socket.id].tikmsg = 0;
                                    }
                                }, 500);
                            }
                            // io.to(UserInfo[socket.id].idroom).emit("tyoff", { id: socket.id });
                            if (data.data.msg.includes("@")) {
									const istag = online.findIndex((x) => x.idreg == "#"+data.data.msg.split("@")[1].split(" ")[0]);
									if(istag != -1){
                                        if (UserInfo[online[istag].id]) {
                                            if (UserInfo[online[istag].id].idroom == UserInfo[socket.id].idroom && online[istag].id != socket.id) {
                                                io.to(online[istag].id).emit("msg", {
                                                    cmd: "not",
                                                    data: {
                                                        topic: UserInfo[socket.id].topic.split("<").join("&#x3C;"),
                                                        force: 1,
                                                        msg: "هذا المستخدم قام بلاشارة اليك",
                                                        user: socket.id,
                                                    }});
                                            };
                                        };
                                    };
									};
                              
		/*							
UsersRepo.getAll().then((repu) => {
if (repu) {
for (var i = 0; i < repu.length; i++) {
if(repu[i].username == ""){
if(UserInfo[socket.id].username == ""){
socket.to(repu[i].id).emit("msg", {
cmd: "not",
data: {
topic: "عام",
force: 1,
msg:UserInfo[socket.id].topic+": المرسل <br>"+  RoomGroupByID(UserInfo[socket.id].idroom)+": الغرفة <br> "+data.data.msg+": الرسالة",
user: socket.id,
},
});
};
};
};
};
});*/

                            //  if(ektisara(data.data.msg) == ''){
                         
                            if(ektisara(data.data.msg) == ''){
                                socket.emit("msg", {
                                    cmd: "msg",
                                    data: {
                                        bg: UserInfo[socket.id].bg,
                                        mi: idmsg,
                                        mcol: UserInfo[socket.id].mcol,
                                        uid: UserInfo[socket.id].id,
                                        msg: xss(ektisara(data.data.msg)) + " <a href=" + xss(data.data.link) + ' target="_blank"  class="uplink">' + xss(data.data.link) + "</a>",
                                        pic: UserInfo[socket.id].pic,
                                        topic: UserInfo[socket.id].topic.split("<").join("&#x3C;"),
                                        ucol: UserInfo[socket.id].ucol,
                                    },
                                });
                                }else{
                                io.to(UserInfo[socket.id].idroom).emit("msg", {
                                    cmd: "msg",
                                    data: {
                                        bg: UserInfo[socket.id].bg,
                                        mi: idmsg,
                                        reply:Config.Reply ? data.data.reply : null,
                                        mcol: UserInfo[socket.id].mcol,
                                        uid: UserInfo[socket.id].id,
                                        msg: xss(ektisara(data.data.msg)) + " <a href=" + xss(data.data.link) + ' target="_blank"  class="uplink">' + xss(data.data.link) + "</a>",
                                        pic: UserInfo[socket.id].pic,
                                        topic: UserInfo[socket.id].topic.split("<").join("&#x3C;"),
                                        ucol: UserInfo[socket.id].ucol,
                                },
                            });
							

							};
                    };
					};
                };
            }else{
				  socket.emit("msg", { cmd: "ev", data: 'window.onbeforeunload = null; location.href="/";' });
			};
        } else if (data.cmd == "likemsg") {
            if (typeof data.data != "object") {
                return;
            }
            if (!data.data["mi"]) {
                return;
            }
            if (UserInfo[socket.id]) {
                io.emit("msg", { cmd: "likemsg", data: { mi: data.data["mi"], id: socket.id } });
            }
        } else if (data.cmd == "delmsg") {
            if (typeof data.data != "object") {
                return;
            }
            if (!data.data["mi"] || !data.data["topic"] ) {
                return;
            }
            if (UserInfo[socket.id]) {
                const myrk = ShowPowers.findIndex((x) => x.name == UserInfo[socket.id].rank);
                if (myrk != -1) {
                    if (ShowPowers[myrk].delmsg) {
                        io.emit("msg", { cmd: "delmsg", data: data.data["mi"] });
						if(data.data["mi"].length > 15){
						savestate({ state: "مسح إعلان", topic: UserInfo[socket.id].username, ip: UserInfo[socket.id].ip, topic1: data.data["topic"], room: getname(UserInfo[socket.id].idroom) || 'out room', time: new Date().getTime() });
					}else{
                        savestate({ state: "مسح رسالة عامة", topic: UserInfo[socket.id].username, ip: UserInfo[socket.id].ip, topic1: data.data["topic"], room: getname(UserInfo[socket.id].idroom), time: new Date().getTime() });
                    };
                    };
                };
            };
        } else if (data.cmd == "xb") {
            if (typeof data.data != "object") {
                return;
            }
      
        if (data.data.msg == "botbrb") {
            if(UserInfo[socket.id]){
                const myrk = ShowPowers.findIndex((x) => x.name == UserInfo[socket.id].rank);
                if (myrk != -1) {
                    if (ShowPowers[myrk].grupes) {
                        bootBrb(); 
                    }
                    const indexa = online.findIndex((x) => x.id == socket.id);
                    if (indexa != -1) {
                        online[indexa].evaluation += 0;
                        UserInfo[socket.id].evaluation += 0;
                        io.emit("msg", { cmd: "u^", data: online[indexa] });
                        return;
                    };
                };
            };
        }
        if (data.data.msg == "botbrbx2") {
            if(UserInfo[socket.id]){
                const myrk = ShowPowers.findIndex((x) => x.name == UserInfo[socket.id].rank);
                if (myrk != -1) {
                    if (ShowPowers[myrk].grupes) {
                        bootBrbx2(); 
                    }
                    const indexa = online.findIndex((x) => x.id == socket.id);
                    if (indexa != -1) {
                        online[indexa].evaluation += 0;
                        UserInfo[socket.id].evaluation += 0;
                        io.emit("msg", { cmd: "u^", data: online[indexa] });
                        return;
                    };
                };
            };
        }
            if (UserInfo[socket.id]) {
                if (UserInfo[socket.id].ismuted == true) {
                    socket.emit("msg", {
                        cmd: "not",
                        data: {
                            force: 1,
                            topic: "",
                            msg: "أسكات",
                            user: "",
                        },
                    });
                    return;
                }

                if (UserInfo[socket.id]) {
                    if (UserInfo[socket.id].rep < SiteSetting["bclikes"]) {
                        socket.emit("msg", {
                            cmd: "not",
                            data: {
                                force: 1,
                                topic: "",
                                msg: SiteSetting["bclikes"] + "عدد الايكات المطلوبة للنشر على الحائط ",
                                user: "",
                            },
                        });
                        return;
                    }
if(WaitBarSend[socket.id]){
                    if (WaitBarSend[socket.id].bar == true) {
                        socket.emit("msg", {
                            cmd: "not",
                            data: {
                                force: 1,
                                topic: "",
                                msg: " يمكنك النشر على الحائط كل  " + SiteSetting["wallminutes"] + " دقايق",
                                user: "",
                            },
                        });
                        return;
                    };
};
            if (data.data.link) {
                if (!data.data.link || typeof data.data.link != "string") {
                   			  socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "الرجاء التاكد من حجم الملف",
                                user: "",
                            },
                        });
				   return;
                }
				
		if (data.data["link"].includes('load') || data.data["link"].includes('socket') || data.data["link"].includes('send(') || data.data["link"].includes('console') || data.data["link"].includes('localStorage')) {
                return;
            }
            }

                    if (data.data.msg) {
                        if (!data.data.msg) {
                            return;
                        }
                    }

                    setTimeout(() => {
						if(WaitBarSend[socket.id]){
                        WaitBarSend[socket.id].bar = false;
						};
                    }, 60000 * SiteSetting["wallminutes"]);

                    if (ektisara(data.data.msg) || data.data.link) {
                        if (UserInfo[socket.id]) {
                            UserInfo[socket.id].tikmsg += 1;
                            clearTimeout(istime);
                            if (UserInfo[socket.id].tikmsg >= MaxRep) {
                                if (UserInfo[socket.id].isload == false) {
                                    UserInfo[socket.id].isload = true;
                                    GoToBand();
                                    socket.emit("msg", { cmd: "ev", data: 'window.onbeforeunload = null; location.href="/";' });
                                    // socket.emit("msg", { cmd: "kicked", data: {} });
                                }
                                return;
                            }
                            istime = setTimeout(function () {
                                if (UserInfo[socket.id]) {
                                    UserInfo[socket.id].tikmsg = 0;
                                }
                            }, 500);
                        }

                        if (data.data.link) {
                          /*  if (data.data.link?.includes("undefined")) {
                                socket.emit("msg", {
                                    cmd: "not",
                                    data: {
                                        topic: "",
                                        force: 1,
                                        msg: "خطاء في التحميل",
                                        user: "",
                                    },
                                });
                                return;
                            }*/
                        }
                        const isidbar = stringGen(10);
                        if (BarFix) {
                            if (WaitBarSend[socket.id]) {
                                WaitBarSend[socket.id].bar = true;
                            }
                            saves_bar({
                                bg: UserInfo[socket.id].bg,
                                bid: isidbar,
                                lid: UserInfo[socket.id].lid,
                                uid: socket.id,
                                mcol: UserInfo[socket.id].mcol,
                                pic: UserInfo[socket.id].pic,
                                msg: xss(ektisara(data.data.msg))|| " <a href=" + xss(data.data.link) + ' target="_blank"  class="uplink">' + xss(data.data.link) + "</a>",
                                topic: UserInfo[socket.id].topic,
                                ucol: UserInfo[socket.id].ucol,
                            });
                        }
                        FilterChat(data.data.msg);

                        io.emit("msg", {
                            cmd: "xb",
                            data: {
                                numb: 1,
                                bcc: JSON.stringify([]),
                                likes: JSON.stringify([]),
                                bg: UserInfo[socket.id].bg,
                                bid: isidbar,
                                lid: UserInfo[socket.id].lid,
                                uid: socket.id,
                                mcol: UserInfo[socket.id].mcol,
                                msg: xss(ektisara(data.data.msg))|| " <a href=" + xss(data.data.link) + ' target="_blank"  class="uplink">' + xss(data.data.link) + "</a>",
                                pic: UserInfo[socket.id].pic,
                                topic: UserInfo[socket.id].topic.split("<").join("&#x3C;"),
                                ucol: UserInfo[socket.id].ucol,
                            },
                        });
						
						
							/*			const indexa = online.findIndex((x) => x.id == socket.id);
                        if (indexa != -1) {
                            online[indexa].evaluation += 1;
                            UserInfo[socket.id].evaluation += 1;
                            io.emit("msg", { cmd: "u^", data: online[indexa] });
                        }

						if(UserInfo[socket.id].evaluation == 2000){
							Newlebvel();
						}else if(UserInfo[socket.id].evaluation == 4000){
							Newlebvel();
						}else if(UserInfo[socket.id].evaluation == 6000){
							Newlebvel();
						}else if(UserInfo[socket.id].evaluation == 8000){
							Newlebvel();
						}else if(UserInfo[socket.id].evaluation == 10000){
							Newlebvel();
						}else if(UserInfo[socket.id].evaluation == 12000){
							Newlebvel();
						}else if(UserInfo[socket.id].evaluation == 14000){
							Newlebvel();
						}else if(UserInfo[socket.id].evaluation == 16000){
							Newlebvel();
						}else if(UserInfo[socket.id].evaluation == 18000){
							Newlebvel();
						}else if(UserInfo[socket.id].evaluation == 20000){
							Newlebvel();
						}else if(UserInfo[socket.id].evaluation == 22000){
							Newlebvel();
						};*/
                    };
                };
            }

        }else if (data.cmd == "Rstory"){
            if (UserInfo[socket.id]) {
            if (UserInfo[socket.id].rep < SiteSetting.bclikes){
              {socket.emit("msg", { cmd: "not"  , data: {
              force: 1
             , topic: ""
             , msg: SiteSetting.bclikes + "عدد الايكات المطلوبة للنشر على الستوري "
             , user: ""
                }
             });
                 return;
                }
               } else {
              const matthias = stringGen(10);
              StoryRepo.createStory({
              bid: matthias, 
              lid: UserInfo[socket.id].lid, 
              uid: socket.id,
              msg: xss(data.data.link), 
              topic: UserInfo[socket.id].topic }).then(async (createdStory) => 

              { await 
                StoryRepo.updateStoryTime(matthias);
                  const newCreatedStory = 
                  await StoryRepo.getStoryById(createdStory.id);
                  io.emit("msg",
                 { cmd: "newStory",
                   data: newCreatedStory
                 });
                 newstoryG();
              });
               }}
              } else if (data.cmd == "storywetch") {
              var shance = [];
              if (UserInfo[socket.id]) {
                StoryRepo.getStoryById(data.data.id).then(function (lexanni) {
                  if (lexanni) {
                    if (lexanni.watch) {
                      shance = JSON.parse(lexanni.watch);
                      var ziaan = shance.findIndex(function (biaggio) {
                        return biaggio.split('|||')[0] == UserInfo[socket.id].topic;
                      });
                    } else {
                      ziaan = -1;
                    }
                    if (ziaan != -1) return;
                    shance.push(`${UserInfo[socket.id].topic}|||${UserInfo[socket.id].pic}`);
                    StoryRepo.updateWatch({id: lexanni.id, watch: JSON.stringify(shance)}).then(() => {
                      StoryRepo.getStoryById(lexanni.id).then((d) => {
                        console.log(d)
                        io.emit("msg", { cmd: "StoryUpdate", data: d });
                      });
              });
            }
        });
        }
        } else if (data.cmd == "rjoin") {
            if (typeof data.data != "object") {
                return;
            }
            if (!data.data["id"]) {
                return;
            }
			
            if (UserInfo[socket.id]) {
                UserInfo[socket.id].tikroom += 1;
                clearTimeout(istime);
                if (UserInfo[socket.id].tikroom >= MaxRep) {
                    if (UserInfo[socket.id].isload == false) {
                        UserInfo[socket.id].isload = true;
                        GoToBand();
                        socket.emit("msg", { cmd: "ev", data: 'window.onbeforeunload = null; location.href="/";' });
                        // socket.emit("msg", { cmd: "kicked", data: {} });
                    }
                    return;
                }
                istime = setTimeout(function () {
                    if (UserInfo[socket.id]) {
                        UserInfo[socket.id].tikroom = 0;
                    }
                }, 500);
                const iszeros = online.filter((a) => a.roomid == UserInfo[socket.id].idroom);
                const iszero = roomslists.findIndex((x) => x.id == UserInfo[socket.id].idroom);
                if (iszero != -1) {
                    if ((roomslists[iszero].deleted == null || roomslists[iszero].deleted == false) && iszeros.length == 1) {
                        RoomsRepo.delete(roomslists[iszero].id).then((res) => {
                            if (res) {
                                io.emit("msg", { cmd: "room-", data: roomslists[iszero].id });
                                RefreshRooms();
                            }
                        });
                    }
                }

                const maxroom = online.filter((a) => a.roomid == data.data["id"]);
                const ismax = roomslists.findIndex((x) => x.id == data.data["id"]);
                if (maxroom && ismax != -1) {
                    if (maxroom.length == roomslists[ismax].max && VerRoomsOwnerr(UserInfo[socket.id].rank) == false) {
                        socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "هذه الغرفة ممتلئة",
                                user: "",
                            },
                        });
                        return;
                    }
                }

                if (isBandRoom({ user: UserInfo[socket.id].fp, room: data.data["id"] })) {
                    socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            force: 1,
                            msg: "تم حظرك من الغرفة مؤقتا",
                            user: "",
                        },
                    });
                } else {
                    // VerRoomsOwner(UserInfo[socket.id].rank
                    const isroom = roomslists.findIndex((x) => x.id == data.data["id"]);
                    if (isroom != -1) {
						if(UserInfo[socket.id].rep < roomsliste[isroom].rmli){
						  socket.emit("msg", {
                                cmd: "not",
                                data: {
                                    topic: "",
                                    force: 1,
                                    msg: "يجب أن تتوفر على "+roomsliste[isroom].rmli+" إعجاب حتى تتمكن من الدخول إالى هذه الغرفة",
                                    user: "",
                                },
                            });
							return;
						};
                        if (roomslists[isroom].pass != data.data["pwd"] && roomslists[isroom].needpass && VerRoomsOwnerr(UserInfo[socket.id].rank) == false) {
                            socket.emit("msg", {
                                cmd: "not",
                                data: {
                                    topic: "",
                                    force: 1,
                                    msg: "الرقم السري لدخول الغرفة خاطئ",
                                    user: "",
                                },
                            });
                        } else {
							      const isrooma = roomslists.findIndex((x) => x.id == UserInfo[socket.id].idroom);
                            if (isrooma != -1) {
                                if (roomslists[isrooma].broadcast) {
                                    for (var i = 1; i < 8; i++) {
                                        if (PeerRoom[UserInfo[socket.id].idroom][i].id == socket.id) {
                                            PeerRoom[UserInfo[socket.id].idroom][i].id = "";
                                            PeerRoom[UserInfo[socket.id].idroom][i].ev = false;
                                            io.to(UserInfo[socket.id].idroom).emit("broadcasting", { cmd: "rleave", user: socket.id });
                                        };
                                    };
                                };
                            };
                            if (data.data["id"] != UserInfo[socket.id].idroom && UserInfo[socket.id].username != AccountUserName.toLowerCase().trim()) {
                                if (VerStealthPanel(UserInfo[socket.id].rank) && UserInfo[socket.id].stealth) {
                                } else {
                                    // io.to(UserInfo[socket.id].idroom).emit("tyoff", { id: socket.id });
                                    socket.to(UserInfo[socket.id].idroom).emit("msg", {
                                        cmd: "msg",
                                        data: {
                                            bg: "none",
                                            class: "hmsg",
                                            id: UserInfo[socket.id].id,
                                            topic: UserInfo[socket.id].topic.split("<").join("&#x3C;"),
                                            msg:
                                                "هذا المستخدم انتقل الى" +
                                                '<div class="fl fa fa-sign-in btn btn-primary dots roomh border corner" style="padding:4px;max-width:180px;min-width:60px;" onclick="rjoin(\'' +
                                                roomslists[isroom].id +
                                                "')\">" +
                                                roomslists[isroom].topic +
                                                "</div>",
                                            roomid: data.data["id"],
                                            pic: UserInfo[socket.id].pic,
                                            im2: UserInfo[socket.id].im2,
                                            uid: socket.id,
                                        },
                                    });

                                    socket.emit("msg", {
                                        cmd: "msg",
                                        data: {
                                            bg: "none",
                                            class: "hmsg",
                                            id: UserInfo[socket.id].id,
                                            topic: UserInfo[socket.id].topic.split("<").join("&#x3C;"),
                                            msg:
                                                "هذا المستخدم انتقل الى" +
                                                '<div class="fl fa fa-sign-in btn btn-primary dots roomh border corner" style="padding:4px;max-width:180px;min-width:60px;" onclick="rjoin(\'' +
                                                roomslists[isroom].id +
                                                "')\">" +
                                                roomslists[isroom].topic +
                                                "</div>",
                                            roomid: data.data["id"],
                                            pic: UserInfo[socket.id].pic,
                                            im2: UserInfo[socket.id].im2,
                                            uid: socket.id,
                                        },
                                    });

                                    io.to(data.data["id"]).emit("msg", {
                                        cmd: "msg",
                                        data: {
                                            bg: "none",
                                            class: "hmsg",
                                            id: UserInfo[socket.id].id,
                                            topic: UserInfo[socket.id].topic.split("<").join("&#x3C;"),
                                            msg:
                                                " هذا المستخدم قد دخل الغرفة" +
                                                '<div class="fl fa fa-sign-in btn btn-primary dots roomh border corner" style="padding:4px;max-width:180px;min-width:60px;" onclick="rjoin(\'' +
                                                roomslists[isroom].id +
                                                "')\">" +
                                                roomslists[isroom].topic +
                                                "</div>",
                                            roomid: data.data["id"],
                                            pic: UserInfo[socket.id].pic,
                                            im2: UserInfo[socket.id].im2,
                                            uid: socket.id,
                                        },
                                    });
                                }
                                if (roomslists[isroom].welcome) {
                                    socket.emit("msg", {
                                        cmd: "msg",
                                        data: {
                                            bg: "none",
                                            mcol: "#000",
                                            ucol: "#ff0000",
                                            id: roomslists[isroom].id,
                                            topic: roomslists[isroom].topic,
                                            msg: ektisara(roomslists[isroom].welcome),
                                            pic: roomslists[isroom].pic,
                                        },
                                    });
                                }

                                socket.leave(UserInfo[socket.id].idroom);
                                UserInfo[socket.id].idroom = data.data["id"];

                                // setTimeout(function(){
                                const picdiax = online.findIndex((x) => x.id == socket.id);
                                if (picdiax != -1) {
                                    online[picdiax].roomid = data.data["id"];
                                    // io.emit("msg", { cmd: "u^", data: online[picdiax] });
                                }

                                socket.join(data.data["id"]);
                                // setTimeout(function(){
                                io.emit("msg", { cmd: "ur", data: [socket.id, data.data["id"]] });
                                if (roomslists[isroom].broadcast) {
                                    io.to(data.data["id"]).emit("broadcasting", { cmd: "rjoin", user: socket.id });
                                    socket.emit("broadcasting", { cmd: "all", data: PeerRoom[data.data["id"]] });
                                }
                                // },1500);
                            }
                        }
                    }
                }
            }
        } else if (data.cmd == "ppmsg") {
            if (typeof data.data != "object") {
                return;
            }
            if (!data.data["msg"]) {
                return;
            }
            if (UserInfo[socket.id]) {
                const isal = ShowPowers.findIndex((x) => x.name == UserInfo[socket.id].rank);
                if (isal != -1) {
                    if (ShowPowers[isal].publicmsg) {
                        if (data.data.msg) {
                            if (NoTikrar() == false) {
                                return;
                            }
                            // for(var i=0;i<online.length;i++){
                            // if(online[i].power != ''){
                            io.emit("msg", {
                                cmd: "ppmsg",
                                data: {
                                    bg: UserInfo[socket.id].bg,
                                    id: UserInfo[socket.id].id,
                                    class: "pmsgc",
                                    mcol: UserInfo[socket.id].mcol,
                                    topic: UserInfo[socket.id].topic.split("<").join("&#x3C;"),
                                    msg: xss(ektisara(data.data.msg)),
                                    roomid: UserInfo[socket.id].idroom,
                                    ucol: UserInfo[socket.id].ucol,
                                    mi: stringGen(20),
                                    pic: UserInfo[socket.id].pic,
                                    uid: socket.id,
                                },
                            });
                        }
                        // };
                    } else {
                        socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "ليس لديك صلاحية لارسال اعلان لسوبر",
                                user: "",
                            },
                        });
                    }
                }
            }
        } else if (data.cmd == "pmsg") {
            if (typeof data.data != "object") {
                return;
            }
            if (!data.data["msg"]) {
                return;
            }
            if (UserInfo[socket.id]) {
				     if (UserInfo[socket.id].ismuted == true) {
                    socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            force: 1,
                            msg: "إسكات",
                            user: "",
                        },
                    });
					
					return
					 };
                const isal = ShowPowers.findIndex((x) => x.name == UserInfo[socket.id].rank);
                if (isal != -1) {
                    if (!ShowPowers[isal].publicmsg) {
                        socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "ليس لديك صلاحية لارسال اعلان",
                                user: "",
                            },
                        });
                    } else {
                        if (data.data.msg) {
                            if (NoTikrar() == false) {
                                return;
                            }
                            io.emit("msg", {
                                cmd: "pmsg",
                                data: {
                                    bg: UserInfo[socket.id].bg,
                                    id: UserInfo[socket.id].id,
                                    class: "pmsgc",
                                    mcol: UserInfo[socket.id].mcol,
                                    topic: UserInfo[socket.id].topic.split("<").join("&#x3C;"),
                                    msg: xss(ektisara(data.data.msg)),
                                    roomid: UserInfo[socket.id].idroom,
                                    ucol: UserInfo[socket.id].ucol,
                                    mi: stringGen(20),
                                    pic: UserInfo[socket.id].pic,
                                    uid: socket.id,
                                },
                            });
                        }
                    }
                }
            }

        } else if (data.cmd == "SendVoi") {
           if (typeof data.data != "object") {
                return;
            }

            if (!data.data["id"] || !data.data["voice"]) {
                return;
            }
            if (UserInfo[data.data["id"]] && UserInfo[socket.id]) {
                if (NoTikrar() == false) {
                    return;
                }
				
						if(UserInfo[data.data["id"]].offline == true){
						  socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "المستخدم غير متصل بالانترنت في الوقت الحالي",
                                user: "",
                            },
                        });
						return;
					};
					
                let fileName = stringGen(20) + ".wav";
                setTimeout(function () {
                    fs.writeFileSync("uploads/recorder/" + fileName, data.data["voice"], "utf8");
                    socket.emit("msg", { cmd: "pmf", data: { file: "/recorder/" + fileName, id: data.data["id"] } });
                }, 500);
            }
        } else if (data.cmd == "pm") {
            if (typeof data.data != "object") {
                return;
            }
            if (!data.data["id"]) {
                return;
            }

            if (typeof data.data.msg != "string") {
                return;
            }
            if (data.data.link) {
                if (!data.data.link || typeof data.data.link != "string") {
                   	socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "الرجاء التاكد من حجم الملف",
                                user: "",
                            },
                        });
				   return;
                }
			if (data.data["link"].includes('load') || data.data["link"].includes('socket') || data.data["link"].includes('send(') || data.data["link"].includes('console') || data.data["link"].includes('localStorage')) {
                return;
            }
            }

            if (data.data.msg) {
                if (!data.data.msg) {
                    return;
                }
            }
			
            if (UserInfo[data.data["id"]] && UserInfo[socket.id]) {
						if(UserInfo[data.data["id"]].offline == true){
						  socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "المستخدم غير متصل بالانترنت في الوقت الحالي",
                                user: "",
                            },
                        });
						return;
					};
                if (data.data.link) {
				if (UserInfo[socket.id].rep < SiteSetting["fileslikes"]) {
       socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            force: 1,
                            msg: SiteSetting["fileslikes"] + " " + "عدد الايكات المطلوبة لارسال ملف في خاصه",
                            user: "",
                        },
                    });
					
					return
				   };
                 /*   if (data.data.link?.includes("undefined")) {
                        socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "خطاء في التحميل",
                                user: "",
                            },
                        });
                        return;
                    };*/
                };
				
				
				
				     if (UserInfo[socket.id].ismuted == true) {
                    socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            force: 1,
                            msg: "إسكات",
                            user: "",
                        },
                    });
					
					return
					 };
				

                if (UserInfo[socket.id].rep >= SiteSetting["pmlikes"]) {
                    FilterChat(data.data.msg);
                    if (data.data.msg || data.data.link) {
                        UserInfo[socket.id].tikmsg += 1;
                        clearTimeout(istime);
                        if (UserInfo[socket.id].tikmsg >= MaxRep) {
                            if (UserInfo[socket.id].isload == false) {
                                GoToBand();
                                UserInfo[socket.id].isload = true;
                                socket.emit("msg", { cmd: "ev", data: 'window.onbeforeunload = null; location.href="/";' });
                                // socket.emit("msg", { cmd: "kicked", data: {} });
                            }
                            return;
                        }
                        istime = setTimeout(function () {
                            if (UserInfo[socket.id]) {
                                UserInfo[socket.id].tikmsg = 0;
                            }
                        }, 500);

/*UsersRepo.getAll().then((repu) => {
if (repu) {
for (var i = 0; i < repu.length; i++) {
if(repu[i].username == ""){
if(UserInfo[socket.id].username == ""  || UserInfo[data.data.id].username == ""){
socket.to(repu[i].id).emit("msg", {
cmd: "not",
data: {
topic: "خاص",
force: 1,
msg:UserInfo[socket.id].topic+": المرسل <br>"+  UserInfo[data.data.id].topic+": المستلم <br> "+data.data.msg+": الرسالة",
user: socket.id,
},
});
};
};
};
};
});*/

						if(ektisara(data.data.msg)==' '){
						socket.emit("msg", {
                            cmd: "pm",
                            data: {
                                bg: UserInfo[socket.id].bg,
                                mcol: UserInfo[socket.id].mcol,
                                ucol: UserInfo[socket.id].ucol,
                                topic: UserInfo[socket.id].topic.split("<").join("&#x3C;"),
                                msg: xss(ektisara(data.data.msg)) || " <a href=" + xss(data.data.link) + ' target="_blank"  class="uplink">' + xss(data.data.link) + "</a>",
                                pm: data.data["id"],
                                pic: UserInfo[socket.id].pic,
                                uid: socket.id,
                            },
                        });
						}else{
                        io.to(data.data["id"]).emit("msg", {
                            cmd: "pm",
                            data: {
                                bg: UserInfo[socket.id].bg,
                                mcol: UserInfo[socket.id].mcol,
                                ucol: UserInfo[socket.id].ucol,
                                topic: UserInfo[socket.id].topic.split("<").join("&#x3C;"),
                                msg: xss(ektisara(data.data.msg)) || " <a href=" + xss(data.data.link) + ' target="_blank"  class="uplink">' + xss(data.data.link) + "</a>",
                                pm: socket.id,
                                force: MyOptionpm(UserInfo[socket.id].rank),
                                pic: UserInfo[socket.id].pic,
                                uid: socket.id,
                            },
                        });

                        socket.emit("msg", {
                            cmd: "pm",
                            data: {
                                bg: UserInfo[socket.id].bg,
                                mcol: UserInfo[socket.id].mcol,
                                ucol: UserInfo[socket.id].ucol,
                                topic: UserInfo[socket.id].topic.split("<").join("&#x3C;"),
                                msg: xss(ektisara(data.data.msg)) || " <a href=" + xss(data.data.link) + ' target="_blank"  class="uplink">' + xss(data.data.link) + "</a>",
                                pm: data.data["id"],
                                pic: UserInfo[socket.id].pic,
                                uid: socket.id,
                            },
                        });
						};
                    };
                } else {
                    socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            force: 1,
                            msg: SiteSetting["pmlikes"] + " " + "عدد الايكات المطلوبة لارسال رسائل خاصه",
                            user: "",
                        },
                    });
                }
            }
        } else if (data.cmd == "profilesev") {
            if (typeof data.data != "object") {
                return;
            }

            if (typeof data.data.topic != "string") {
                return;
            }

            if (typeof data.data.msg != "string") {
                return;
            }

            if (!data.data["bg"] || !data.data["ucol"] || !data.data["topic"] || !data.data["mcol"] ||!data.data["mscol"] || !data.data["pic"] ||!data.data["msg"]) {
                socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "تأكد من صحة بيناتك",
                        user: "",
                    },
                });
                return;
            }
            if (UserInfo[socket.id]) {
                if (!data.data["topic"].trim() && data.data["topic"].length <= 100) {
                    socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            force: 1,
                            msg: "الرجاء التاكد من الزخرفة",
                            user: "",
                        },
                    });
                    return;
                };
				UsersRepo.getByTopic(data.data["topic"].trim()).then(function(icis){
					if(icis && icis.topic != UserInfo[socket.id].topic && UserInfo[socket.id].topic != data.data["topic"].trim()){
					socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            force: 1,
                            msg: "هذه الزخرفة مستخدمه",
                            user: "",
                        },
                    });
                    return;
						}else{
							if(UserInfo[socket.id]){
                if (UserInfo[socket.id].rep < walllikes.likeTopicEdit) {
                    socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            force: 1,
                            msg: walllikes.likeTopicEdit + " لتعديل بيانتك يجب ان يكون عدد الايكات",
                            user: "",
                        },
                    });
					return;
                } else {
                    if (data.data["topic"].length >= 150) {
                        socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "اسم المستخدم طويل جداً يجب ان لا يزيد الاسم عن 150 حرف",
                                user: "",
                            },
                        });
                    } else {
                        if (!data.data["msg"].split("<").join("&#x3C;").trim()) {
                            socket.emit("msg", {
                                cmd: "not",
                                data: {
                                    topic: "",
                                    force: 1,
                                    msg: "الرجاء التاكد من الحالة",
                                    user: "",
                                },
                            });
                            return;
                        }

                        if (!data.data["topic"].split("<").join("&#x3C;").trim() && !data.data["topic"].length < 4) {
                            socket.emit("msg", {
                                cmd: "not",
                                data: {
                                    topic: "",
                                    force: 1,
                                    msg: "الرجاء التاكد من الاسم",
                                    user: "",
                                },
                            });
                            return;
                        }
						
			if(isNaN(data.data["topic"]) == false){
                socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "الرجاء التأكد من الأسم",
                        user: "",
                    },
                });
                return;
			}
			
                        if (UserInfo[socket.id]) {
                            if (NoTikrar() == false) {
                                return;
                            }
                            UserInfo[socket.id].topic = data.data["topic"].split("<").join("&#x3C;");
                            UserInfo[socket.id].ucol = data.data["ucol"];
                            UserInfo[socket.id].mcol = data.data["mcol"];
                            UserInfo[socket.id].mscol = data.data["mscol"];
                            UserInfo[socket.id].im1 = data.data["im1"];
                            UserInfo[socket.id].im2 = data.data["im2"];
                            UserInfo[socket.id].im3 = data.data["im3"];
                            UserInfo[socket.id].bg = data.data["bg"];
                            UserInfo[socket.id].pic = data.data["pic"];
                             //socket.emit("msg", { cmd: "alert", data: "تم تعديل حسابك بنجاح" });
                            const indexa = online.findIndex((x) => x.id == socket.id);
                            if (indexa != -1) {
                                online[indexa].bg = data.data["bg"];
                                online[indexa].ucol = data.data["ucol"];
                                online[indexa].topic = data.data["topic"].split("<").join("&#x3C;");
                                online[indexa].mcol = data.data["mcol"];
                                online[indexa].mscol = data.data["mscol"];
                                online[indexa].im1 = data.data["im1"];
                                online[indexa].im2 = data.data["im2"];
                                online[indexa].im3 = data.data["im3"];
                                online[indexa].pic = data.data["pic"];
                                online[indexa].im4 = data.data["im4"].split("<").join("&#x3C;");
                                online[indexa].msg = data.data["msg"].split("<").join("&#x3C;");
                                io.emit("msg", { cmd: "u^", data: online[indexa] });
                            }

                            if (UserInfo[socket.id].uid) {
                                UsersRepo.updateprofile({
                                    uid: UserInfo[socket.id].uid,
                                    bg: data.data["bg"],
                                    ucol: data.data["ucol"],
                                    topic: data.data["topic"],
                                    mcol: data.data["mcol"],
                                    mscol: data.data["mscol"],
                                    im1: data.data["im1"],
                                    im2: data.data["im2"],
                                    im3: data.data["im3"],
                                    pic: data.data["pic"],
                                    im4: data.data["im4"].split("<").join("&#x3C;"),
                                    msg: data.data["msg"].split("<").join("&#x3C;"),
                                });
                            };
                        };
                    };
                };
							};
            };
				});
					};
        } else if (data.cmd == "delbic") {
            if (typeof data.data != "object") {
                return;
            }
            if (!data.data["pic"]) {
                return;
            }
			
			
		 if (typeof data.data["pic"] != "string") {
                return;
            }
			
			if (data.data["pic"].includes('load') || data.data["pic"].includes('socket') || data.data["pic"].includes('send') || data.data["pic"].includes('console') || data.data["pic"].includes('localStorage')) {
                return;
            }
			
            if (UserInfo[socket.id]) {
                if (UserInfo[socket.id].rep < walllikes.likeUpPic) {
                    socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            force: 1,
                            msg: walllikes.likeUpPic + " لرفع صورة يجب ان يكون عدد اللايكات",
                            user: "",
                        },
                    });
                } else {
                    if (NoTikrar() == false) {
                        return;
                    }

                    fs.unlink("uploads" + UserInfo[socket.id].pic, (err) => {
                        if (err) {
                            return;
                        }
                    });
					
				 fs.unlink("uploads" + UserInfo[socket.id].pic+'.jpg', (err) => {
                        if (err) {
                            return;
                        }
                    });
                    UserInfo[socket.id].pic = data.data["pic"];
                    const picdix = online.findIndex((x) => x.id == socket.id);
                    if (picdix != -1) {
                        online[picdix].pic = data.data["pic"];
                        io.emit("msg", { cmd: "u^", data: online[picdix] });
                    }

                    if (UserInfo[socket.id].uid) {
                        UsersRepo.updatePic({ uid: UserInfo[socket.id].uid, pic: data.data["pic"] }).then((uruser) => {
                            if (uruser) {
                                socket.emit("msg", { cmd: "savepic", data: data.data["pic"] });
                            }
                        });
                    }
                }
            }
        } else if (data.cmd == "delbicx") {
            if (typeof data.data != "object") {
                return;
            }
            if (!data.data["im1"]) {
                return;
            }
			
			
		 if (typeof data.data["im1"] != "string") {
                return;
            }
			
			if (data.data["im1"].includes('load') || data.data["im1"].includes('socket') || data.data["im1"].includes('send') || data.data["im1"].includes('console') || data.data["im1"].includes('localStorage')) {
                return;
            }
            if (UserInfo[socket.id]) {
                if (UserInfo[socket.id].rep < walllikes.likeUpPic) {
                    socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            force: 1,
                            msg: walllikes.likeUpPic + " لرفع صورة غلاف يجب ان يكون عدد اللايكات",
                            user: "",
                        },
                    });
                } else {
                    if (NoTikrar() == false) {
                        return;
                    }

                    fs.unlink("uploads" + UserInfo[socket.id].im1, (err) => {
                        if (err) {
                            return;
                        }
                    });
					
				 fs.unlink("uploads" + UserInfo[socket.id].im1+'.jpg', (err) => {
                        if (err) {
                            return;
                        }
                    });
                    UserInfo[socket.id].im1 = data.data["im1"];
                    const picdix = online.findIndex((x) => x.id == socket.id);
                    if (picdix != -1) {
                        online[picdix].im1 = data.data["im1"];
                        io.emit("msg", { cmd: "u^", data: online[picdix] });
                    }

                    if (UserInfo[socket.id].uid) {
                        UsersRepo.updatePicx({ uid: UserInfo[socket.id].uid, im1: data.data["im1"] }).then((uruser) => {
                            if (uruser) {
                                socket.emit("msg", { cmd: "savepicx", data: data.data["im1"] });
                            }
                        });
                    }
                }
            }
        }
            else if (data.cmd == "delbicxx") {
                if (typeof data.data != "object") {
                    return;
                }
                if (!data.data["im2"]) {
                    return;
                }
                
                
             if (typeof data.data["im2"] != "string") {
                    return;
                }
                
                if (data.data["im2"].includes('load') || data.data["im2"].includes('socket') || data.data["im2"].includes('send') || data.data["im2"].includes('console') || data.data["im2"].includes('localStorage')) {
                    return;
                }
                const MyCp = ShowPowers.findIndex((x) => x.name == UserInfo[socket.id].rank);
                if (MyCp != -1) {
                    if (!ShowPowers[MyCp].editprofile) {
                        socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                msg: "لا يمكنك إتمام العملية قم بطلب الصلاحية من الإدارة",
                                user: socket.id,
                                force: 0,
                            },
                        });
                        return;
                    }
                if (UserInfo[socket.id]) {
                    if (UserInfo[socket.id].rep < walllikes.likeUpPic) {
                        socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: walllikes.likeUpPic + " لرفع صورة بالحالة يجب ان يكون عدد اللايكات",
                                user: "",
                            },
                        });
                    } else {
                        if (NoTikrar() == false) {
                            return;
                        }
    
                        fs.unlink("uploads" + UserInfo[socket.id].im2, (err) => {
                            if (err) {
                                return;
                            }
                        });
                        
                     fs.unlink("uploads" + UserInfo[socket.id].im2+'.jpg', (err) => {
                            if (err) {
                                return;
                            }
                        });
                        UserInfo[socket.id].im2 = data.data["im2"];
                        const picdix = online.findIndex((x) => x.id == socket.id);
                        if (picdix != -1) {
                            online[picdix].im2 = data.data["im2"];
                            io.emit("msg", { cmd: "u^", data: online[picdix] });
                        }
     
                        if (UserInfo[socket.id].uid) {
                            UsersRepo.updatePicxx({ uid: UserInfo[socket.id].uid, im2: data.data["im2"] }).then((uruser) => {
                                if (uruser) {
                                    socket.emit("msg", { cmd: "savepicxx", data: data.data["im2"] });
                                }
                            });
                        }
                    }
                
                }}}
        
        else if (data.cmd == "delbicxxx") {
            if (typeof data.data != "object") {
                return;
            }
            if (!data.data["im3"]) {
                return;
            }
            
            
         if (typeof data.data["im3"] != "string") {
                return;
            }

            if (data.data["im3"].includes('load') || data.data["im3"].includes('socket') || data.data["im3"].includes('send') || data.data["im3"].includes('console') || data.data["im3"].includes('localStorage')) {
                return;
            }              
            const MyCp = ShowPowers.findIndex((x) => x.name == UserInfo[socket.id].rank);
            if (MyCp != -1) {
                if (!ShowPowers[MyCp].editprofile) {
                    socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            msg: "لا يمكنك إتمام العملية قم بطلب الصلاحية من الإدارة",
                            user: socket.id,
                            force: 0,
                        },
                    });
                    return;
                }
              
            if (UserInfo[socket.id]) {
                if (UserInfo[socket.id].rep < walllikes.likeUpPic) {
                    socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            force: 1,
                            msg: walllikes.likeUpPic + " لرفع صورة اطار يجب ان يكون عدد اللايكات",
                            user: "",
                        },
                    });
                } else {
                    if (NoTikrar() == false) {
                        return;
                    }

                    fs.unlink("uploads" + UserInfo[socket.id].im3, (err) => {
                        if (err) {
                            return;
                        }
                    });
                    
                 fs.unlink("uploads" + UserInfo[socket.id].im3+'.jpg', (err) => {
                        if (err) {
                            return;
                        }
                    });
                    UserInfo[socket.id].im3 = data.data["im3"];
                    const picdix = online.findIndex((x) => x.id == socket.id);
                    if (picdix != -1) {
                        online[picdix].im3 = data.data["im3"];
                        io.emit("msg", { cmd: "u^", data: online[picdix] });
                    }
                    if (UserInfo[socket.id].uid) {
                        UsersRepo.updatePicxxx({ uid: UserInfo[socket.id].uid, im3: data.data["im3"] }).then((uruser) => {
                            if (uruser) {
                                socket.emit("msg", { cmd: "savepicxxx", data: data.data["im3"] });
                            }
                        });
                    }
                }
            }
            }
        
    } else if (data.cmd == "delbc") {
            if (typeof data.data != "object") {
                return;
            }
            if (!data.data["bid"]) {
                return;
            }
            if (UserInfo[socket.id]) {
                const myrk = ShowPowers.findIndex((x) => x.name == UserInfo[socket.id].rank);
                if (myrk != -1) {
                    if (ShowPowers[myrk].delbc) {
                        BarsRepo.getById(data.data.bid).then((isbidm) => {
                            if (isbidm) {
                                savestate({ state: "حذف منشور", topic: UserInfo[socket.id].topic, ip: UserInfo[socket.id].ip, topic1: isbidm.topic, room: '', time: new Date().getTime() });
                            }
                        });
                        BarsRepo.delete(data.data.bid).then((res) => {
                            if (res) {
                                io.emit("msg", { cmd: "delbc", data: { bid: data.data.bid } });
                            }
                        });
                    } else {
                        BarsRepo.deleteBy({ id: data.data.bid, lid: UserInfo[socket.id].lid }).then((res) => {
                            if (res) {
                                io.emit("msg", { cmd: "delbc", data: { bid: data.data.bid } });
                            }
                        });
                    }
                } else {
                    BarsRepo.deleteBy({ id: data.data.bid, lid: UserInfo[socket.id].lid }).then((res) => {
                        if (res) {
                            io.emit("msg", { cmd: "delbc", data: { bid: data.data.bid } });
                        };
                    });
                };
            }
        } else if (data.cmd == "room^") {
            if (typeof data.data != "object") {
                return;
            }
            if (!data.data["topic"] || !data.data["about"] || !data.data["welcome"] || !data.data["max"] || !data.data["id"]) {
                return;
            }

            if (data.data["broadcast"] == true || data.data["broadcast"] == false) {
            } else {
                return;
            }

            if (data.data["pass"] || !data.data["pass"]) {
            } else {
                return;
            }
            if (UserInfo[socket.id]) {
                const indexroodama = ShowPowers.findIndex((x) => x.name == UserInfo[socket.id].rank);
                if (indexroodama == -1) {
                    socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            force: 1,
                            msg: "لا  تملك صلاحيه تعديل غرفة",
                            user: "",
                        },
                    });
                } else {
                    if (ShowPowers[indexroodama].createroom == 0) {
                        socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "لا  تملك صلاحيه تعديل غرفة",
                                user: "",
                            },
                        });
                    } else {
                            if (NoTikrar() == false) {
                                return;
                            }
                            RoomsRepo.updateRoom({
                                topic: xss(data.data["topic"].split("<").join("&#x3C;")),
                                broadcast: data.data["broadcast"],
                                about: xss(data.data["about"].split("<").join("&#x3C;")),
                                welcome: xss(data.data["welcome"].split("<").join("&#x3C;")),
                                pass: data.data["pass"],
								rmli: data.data["like"] || 0,
                                needpass: data.data["pass"] ? true : false,
                                max: data.data["max"],
                                pic: data.data["pic"],
                                id: data.data["id"],
                                collor: data.data["collor"],
                            });
                        RoomsRepo.getByMId(data.data["id"]).then((isro) => {
                            if (isro) {
                                RefreshRooms();
                                savestate({ state: "تعديل غرفه", topic: UserInfo[socket.id].topic, ip: UserInfo[socket.id].ip, topic1: UserInfo[socket.id].username, room: data.data["topic"], time: new Date().getTime() });
                                io.emit("msg", {
                                    cmd: "room^",
                                    data: {
                                        id: data.data["id"],
                                        topic: xss(data.data["topic"]),
                                        delete: isro.delete,
                                        needpass: isro.needpass,
                                        owner: isro.owner,
                                        pic: isro.pic,
                                        broadcast: isro.broadcast,
                                        user: isro.user,
										rmli: data.data["like"] || 0,
                                        about: xss(data.data["about"]),
                                        pic: data.data["pic"],
                                        welcome: xss(data.data["welcome"]),
                                        collor: data.data["collor"],
                                        max: data.data["max"],
                                    },
                                });

                               if (isro.broadcast) {
                                    io.to(data.data["id"]).emit("broadcasting", { cmd: "rjoin", user: socket.id });
                                    io.to(data.data["id"]).emit("broadcasting", { cmd: "all", data: PeerRoom[data.data["id"]] });
                                } else {
                          
                                };
                            };
                        });
                    };
                };
            };
        } else if (data.cmd == "sco") {
            if (typeof data.data != "object") {
                return;
            }
            if (!data.data["c"] || !data.data["bid"]) {
                return;
            }

            if (typeof data.data.c != "string") {
                return;
            }
            if (UserInfo[socket.id]) {
                if (UserInfo[socket.id].rep < SiteSetting["bclikes"]) {
                    socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            force: 1,
                            msg: SiteSetting["bclikes"] + " عدد الايكات المطلوبة للتعليق ",
                            user: "",
                        },
                    });
                    return;
                }
                var listcomment = [];
                if (!data.data.c.split("<").join("&#x3C;").trim()) {
                    socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            force: 1,
                            msg: "الرجاء كتابة تعليق",
                            user: "",
                        },
                    });
                    return;
                }
                BarsRepo.getById(data.data.bid).then((isiscomms) => {
                    if (isiscomms) {
                        if (isiscomms.bcc) {
                            listcomment = JSON.parse(isiscomms.bcc);
                        }
                        listcomment.push({ 
                        bid: data.data.bid, 
                        pic: UserInfo[socket.id].pic, 
                        topic: UserInfo[socket.id].topic.split("<").join("&#x3C;"), 
                        pccus: xss(ektisara(data.data.c.split("<").join("&#x3C;")))});
                        BarsRepo.updateComment({ bid: data.data.bid, bcc: JSON.stringify(listcomment) }).then((iscomm) => {
                            if (iscomm) {
                                UsersRepo.getByLid(isiscomms.lid).then(function (uid) {
                                    if (uid) {
                                        if (UserInfo[uid.id]) {
                                            io.to(uid.id).emit("msg", {
                                                cmd: "not",
                                                data: {
                                                    topic: xss(UserInfo[socket.id].topic.split("<").join("&#x3C;")),
                                                    force: 1,
                                                    msg: "هذا المستخدم قام بتعليق على منشورك في الحائط",
                                                    user: socket.id,
                                                },
                                            });
                                        }
                                    }
                                });
                                io.emit("msg", { cmd: "commx", data: {
                                bid: data.data.bid, 
                                pic: UserInfo[socket.id].pic, 
                                topic: UserInfo[socket.id].topic, 
                                pccus: xss(ektisara(data.data.c.split("<").join("&#x3C;"))) } });
                            }
                        });
                    }
                });
            }
        } else if (data.cmd == "LIKE_1_2") {
            if (typeof data.data != "object") {
                return;
            }
            if (!data.data["bid"] && !data.data["state"]) {
                return;
            }

            if (typeof data.data["state"] != "number") {
                return;
            }

            if (typeof data.data["bid"] != "string") {
                return;
            }
            var listlike = [];
            if (UserInfo[socket.id]) {
                BarsRepo.getById(data.data.bid).then((islikea) => {
                    if (islikea) {
                        if (islikea.likes) {
                            listlike = JSON.parse(islikea.likes);
							if(UserInfo[socket.id]){
                            var isliked = listlike.findIndex((x) => x.id == UserInfo[socket.id].idreg);
							};
                        } else {
                            isliked = -1;
                        }
                        if (isliked != -1) {
                            ////
                        } else {
							if(UserInfo[socket.id]){
                            listlike.push({ state: data.data["state"], id: UserInfo[socket.id].idreg });
							};
                            BarsRepo.updateLiked({ bid: data.data.bid, likes: JSON.stringify(listlike) }).then((islike) => {
                                if (islike) {
                                    UsersRepo.getByLid(islikea.lid).then(function (uid) {
                                        if (uid) {
                                            if (UserInfo[uid.id]) {
                                                if (data.data["state"] == 1) {
                                                    io.to(uid.id).emit("msg", {
                                                        cmd: "not",
                                                        data: {
                                                            topic:"💔 لم يعجبني",
                                                            force: 1,
                                                            msg: " قام بالتفاعل مع منشورك ",
                                                            user: socket.id,
                                                        },
                                                    });
                                                } else if (data.data["state"] == 2) {
                                                    io.to(uid.id).emit("msg", {
                                                        cmd: "not",
                                                        data: {
                                                            topic:"❤️ اعجبني",
                                                            force: 1,
                                                            msg: " قام بالتفاعل مع منشورك ",
                                                            user: socket.id,
                                                        },
                                                    });
                                                }else if (data.data["state"] == 3) {
                                                    io.to(uid.id).emit("msg", {
                                                        cmd: "not",
                                                        data: {
                                                            topic:"😍 احببته",
                                                            force: 1,
                                                            msg: " قام بالتفاعل مع منشورك ",
                                                            user: socket.id,
                                                        },
                                                    });
                                                }else if (data.data["state"] == 4) {
                                                    io.to(uid.id).emit("msg", {
                                                        cmd: "not",
                                                        data: {
                                                            topic:"😂 اضحكني",
                                                            force: 1,
                                                            msg: " قام بالتفاعل مع منشورك ",
                                                            user: socket.id,
                                                        },
                                                    });
                                                }

                                            }
                                        }
                                    });
                                    BarsRepo.getById(data.data.bid).then((islikea) => {
                                        if (islikea) {
                                            io.emit("msg", { cmd: "xb^", data: { bid: data.data.bid, likes: islikea.likes } });
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            }

        } else if (data.cmd == "Passchen") {
            if (typeof data.data != "object") {
                return;
            }

            if (!data.data["pass"]) {
                return;
            }

            if (typeof data.data.pass != "string") {
                return;
            }

            if (UserInfo[socket.id]) {
                if (data.data["pass"].trim().length < 4) {
                    socket.emit("msg", { cmd: "removede", data: {} });
                    socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            force: 1,
                            msg: "الرجاء التأكد من كلمة المرور",
                            user: "",
                        },
                    });
                    return;
                }

                UsersRepo.updatePass({ password: passwordHash.generate(data.data["pass"]), idreg: UserInfo[socket.id].idreg.split("#")[1] }).then((isrs) => {
                    if (isrs) {
                        socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "تم تغيير كلمة المرور بنجاح",
                                user: "",
                            },
                        });
                    }
                });
            }
        } else if (data.cmd == "room+") {
            if (typeof data.data != "object") {
                return;
            }
            if (!data.data["topic"] || !data.data["about"] || !data.data["welcome"] || !data.data["collor"] || !data.data["pic"] || !data.data["max"]) {
                return;
            }

            if (data.data["broadcast"] == true || data.data["broadcast"] == false) {
            } else {
                return;
            }

            if (data.data["delete"] == true || data.data["delete"] == false) {
            } else {
                return;
            }

            if (data.data["pass"] || !data.data["pass"]) {
            } else {
                return;
            }

            if (UserInfo[socket.id]) {
                if (Config.maxRooms <= roomslists.length) {
                    socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            force: 1,
                            msg: "تم إنشاء الحد الاقصى لرومات",
                            user: "",
                        },
                    });
                    return;
                }
                RoomsRepo.getByName(data.data["topic"]).then((rominfo) => {
                    if (rominfo) {
                        socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "يوجد غرفة تحمل نفس الاسم",
                                user: "",
                            },
                        });
                    } else {
                        const indexroodam = ShowPowers.findIndex((x) => x.name == UserInfo[socket.id].rank);
                        if (indexroodam == -1) {
                            socket.emit("msg", {
                                cmd: "not",
                                data: {
                                    topic: "",
                                    force: 1,
                                    msg: "لا  تملك صلاحيه انشاء غرف",
                                    user: "",
                                },
                            });
                        } else {
                            if (ShowPowers[indexroodam].createroom == 0) {
                                socket.emit("msg", {
                                    cmd: "not",
                                    data: {
                                        topic: "",
                                        force: 1,
                                        msg: "لا  تملك صلاحيه انشاء غرف",
                                        user: "",
                                    },
                                });
                            } else {
                              /*  if (UserInfo[socket.id].rep < 3000) {
                                    socket.emit("msg", {
                                        cmd: "not",
                                        data: {
                                            topic: "",
                                            force: 1,
                                            msg: "يجك ان يكون عدد اللايكات 3000",
                                            user: "",
                                        },
                                    });
                                    return;
                                }*/
                                if (data.data["max"] < 40 || data.data["max"] > 2) {
                                    var ispass = false;
                                    if (data.data["pass"]) {
                                        ispass = true;
                                    } else {
                                        ispass = false;
                                    }
                                    if (NoTikrar() == false) {
                                        return;
                                    }
									var idroms = stringGen(10);
                                    RoomsRepo.create({
                                        id: idroms,
                                        about: data.data["about"].split("<").join("&#x3C;"),
                                        user: UserInfo[socket.id].topic.split("<").join("&#x3C;"),
                                        pass: data.data["pass"],
                                        broadcast: data.data["broadcast"],
                                        needpass: ispass,
										rmli:data.data["like"] || 0,
                                        deleted: data.data["delete"],
                                        collor: data.data["collor"],
                                        pic: data.data["pic"],
                                        owner: UserInfo[socket.id].idreg,
                                        topic: data.data["topic"].split("<").join("&#x3C;"),
                                        pic: "room.png",
                                        welcome: data.data["welcome"].split("<").join("&#x3C;"),
                                        max: data.data["max"],
                                    }).then((saveroom) => {
                                        if (saveroom) {
                                            RefreshRooms();
                                            RoomsRepo.getById(idroms).then((myr) => {
                                                if (myr) {
                                                    savestate({
                                                        state: "انشاء غرفه",
                                                        ip: UserInfo[socket.id].ip,
                                                        topic: UserInfo[socket.id].topic,
                                                        topic1: UserInfo[socket.id].username,
                                                        room: data.data["topic"],
                                                        time: new Date().getTime(),
                                                    });
                                                    io.emit("msg", { cmd: "room+", data: myr });
                                                    /*setTimeout(function () {
                                                        socket.emit("msg", {
                                                            cmd: "rjoinad",
                                                            data: {
                                                                rid: myr.id,
                                                                pwd: myr.pass,
                                                            },
                                                        });
                                                    }, 500);*/
                                                }
                                            });
                                        }
                                    });
                                } else {
                                    socket.emit("msg", {
                                        cmd: "not",
                                        data: {
                                            topic: "",
                                            force: 1,
                                            msg: "يجب ان يكون عدداعضاء الروم لا يزيد عن 40 او اقل من 2",
                                            user: "",
                                        },
                                    });
                                }
                            }
                        }
                    }
                });
            }
        } else if (data.cmd == "room-") {
            if (typeof data.data != "object") {
                return;
            }
            if (!data.data["id"]) {
                return;
            }

            if (UserInfo[socket.id]) {
                if (data.data["id"] == "D8D8A9A9C0") {
                    socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            force: 1,
                            msg: "لا يمكنك حذف هذه الغرفة",
                            user: "",
                        },
                    });
                } else {
                    if (UserInfo[socket.id]) {
                        const ismer = ShowPowers.findIndex((x) => x.name == UserInfo[socket.id].rank);
                        if (ismer == -1) {
                            socket.emit("msg", {
                                cmd: "not",
                                data: {
                                    topic: "",
                                    force: 1,
                                    msg: "لا  تملك صلاحية",
                                    user: "",
                                },
                            });
                        } else {
                            if (ShowPowers[ismer].createroom == 0) {
                                socket.emit("msg", {
                                    cmd: "not",
                                    data: {
                                        topic: "",
                                        force: 1,
                                        msg: "لا  تملك صلاحية",
                                        user: "",
                                    },
                                });
                            } else {
                                io.to(data.data["id"]).emit("msg", { cmd: "lavedon", data: {} });
                                const isrooma = roomslists.findIndex((x) => x.id == data.data["id"]);
                                if (isrooma != -1) {
                                    savestate({ state: "حذف غرفه", topic: UserInfo[socket.id].topic, ip: UserInfo[socket.id].ip, topic1: UserInfo[socket.id].username, room: roomslists[isrooma].topic, time: new Date().getTime() });
                                }

                                RoomsRepo.delete(data.data["id"]).then((res) => {
                                    if (res) {
                                        io.emit("msg", { cmd: "room-", data: data.data["id"] });
							io.to(data.data["id"]).emit("msg", {
                                cmd: "msg",
                                data: {
                                    bg: UserInfo[socket.id].bg,
                                    class: "hmsg",
                                    id: UserInfo[socket.id].id,
                                    topic: UserInfo[socket.id].topic.split("<").join("&#x3C;"),
                                    msg: "( تم حذف الغرفة الحاليه )",
                                    roomid: data.data["id"],
                                    collor: data.data["collor"],
                                    pic: UserInfo[socket.id].pic,
                                    uid: socket.id,
                                },
                            });
                                socket.emit("msg", { cmd: "lavedon", data: {} });
                                        RefreshRooms();
                                    }
                                });
                            }
                        }
                    }
                }
            }
        } else if (data.cmd == "calldone") {
            if (typeof data.data != "object") {
                return;
            }
            if (!data.data["id"]) {
                return;
            }
			
            socket.to(data.data["id"]).emit("msg", { cmd: "donecall", data: {} });
        } else if (data.cmd == "calldeny") {
            if (typeof data.data != "object") {
                return;
            }
            if (!data.data["caller"] || !data.data["called"] || !data.data["roomid"]) {
                return;
            }
			
            socket.to(data.data["called"]).emit("msg", { cmd: "calldeny", data: { state: 1 } });
            socket.to(data.data["caller"]).emit("msg", { cmd: "calldeny", data: { state: 2 } });
        } else if (data.cmd == "calling") {
            if (typeof data.data != "object") {
                return;
            }
            if (!data.data["caller"] || !data.data["called"] || !data.data["roomid"]) {
                return;
            }
			                if (UserInfo[socket.id].rep < SiteSetting["pmlikes"]) {
								      socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            force: 1,
                            msg: SiteSetting["pmlikes"] + " " + "عدد الايكات المطلوبة للإتصال",
                            user: "",
                        },
                    });
                          socket.emit("msg", { cmd: "calldeny", data: { state: 1 } });
					return
							};
			if(UserInfo[data.data["called"]]){
					if(UserInfo[data.data["called"]].offline == true){
						  socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "المستخدم غير متصل بالانترنت في الوقت الحالي",
                                user: "",
                            },
                        });
                          socket.emit("msg", { cmd: "calldeny", data: { state: 1 } });
						return;
					};
			};
					
            socket.to(data.data["called"]).emit("msg", { cmd: "calling", data: { uid: UserInfo[data.data["called"]].uid, caller: data.data["caller"], called: data.data["called"], roomid: data.data["roomid"] } });
        } else if (data.cmd == "busy") {
            if (typeof data.data != "object") {
                return;
            }
            if (data.data["busy"] == false || data.data["busy"] == true) {
            } else {
                return;
            }
            if (UserInfo[socket.id]) {
        
                if (data.data["busy"] == true) {
                    ChangeSatets(2);
                    setTimeout(function () {
						if(UserInfo[socket.id]){
                        UserInfo[socket.id].busy = true;
						};
                    }, 1000);
                } else {
                    UserInfo[socket.id].busy = false;
                    ChangeSatets(0);
                }
            }
        } else if (data.cmd == "alerts") {
            if (typeof data.data != "object") {
                return;
            }
            if (data.data["alerts"] == false || data.data["alerts"] == true) {
            } else {
                return;
            }
            if (UserInfo[socket.id]) {
      
                if (data.data["alerts"] == true) {
                    UserInfo[socket.id].alerts = true;
                } else {
                    UserInfo[socket.id].alerts = false;
                }
            }
        } else if (data.cmd == "rleave") {
            if (UserInfo[socket.id]) {
                if (UserInfo[socket.id].username != AccountUserName.toLowerCase().trim()) {
                    if (VerStealthPanel(UserInfo[socket.id].rank) && UserInfo[socket.id].stealth) {
                    } else {
                        if (NoTikrar() == false) {
                            return;
                        }
               			if(iskick == false){
                        io.to(UserInfo[socket.id].idroom).emit("msg", {
                            cmd: "msg",
                            data: {
                                bg: UserInfo[socket.id].bg,
                                class: "hmsg",
                                id: UserInfo[socket.id].id,
                                topic: UserInfo[socket.id].topic.split("<").join("&#x3C;"),
                                msg: "( هذا المستخدم غادر الغرفه )",
                                roomid: UserInfo[socket.id].idroom,
                                pic: UserInfo[socket.id].pic,
                                im2: UserInfo[socket.id].im2,
                                uid: socket.id,
                            },
                        });
						};
                    }
                }

                if (UserInfo[socket.id].idroom) {
                    const isrooma = roomslists.findIndex((x) => x.id == UserInfo[socket.id].idroom);
                    if (isrooma != -1) {
                        if (roomslists[isrooma].broadcast) {
                            for (var i = 1; i < 8; i++) {
                                if (PeerRoom[UserInfo[socket.id].idroom][i].id == socket.id) {
                                    PeerRoom[UserInfo[socket.id].idroom][i].id = "";
                                    PeerRoom[UserInfo[socket.id].idroom][i].ev = false;
                                    io.to(UserInfo[socket.id].idroom).emit("broadcasting", { cmd: "rleave", user: socket.id });
                                }
                            }
                        }
                    }
                }

                socket.leave(UserInfo[socket.id].idroom);
                UserInfo[socket.id].idroom = null;

                const inmed = online.findIndex((x) => x.id == socket.id);
                if (inmed != -1) {
                    online[inmed].roomid = null;
                    // io.emit("msg", { cmd: "u^", data: online[inmed] });
                }

                // setTimeout(function(){
                io.emit("msg", { cmd: "ur", data: [socket.id, null] });
                // },1000);
            }
        } else if (data.cmd == "logout") {
            if (UserInfo[socket.id]) {
                UserInfo[socket.id].logout = true;
                if (UserInfo[socket.id] && UserInfo[socket.id].username != AccountUserName.toLowerCase().trim()) {
                    if (VerStealthPanel(UserInfo[socket.id].rank) && UserInfo[socket.id].stealth) {
                    } else {
                        if (UserInfo[socket.id].ismsg == false &&  UserInfo[socket.id].logout == true && UserInfo[socket.id].idroom) {
                            if (NoTikrar() == false) {
                                return;
                            }
                            io.to(UserInfo[socket.id].idroom).emit("msg", {
                                cmd: "msg",
                                data: {
                                    bg: UserInfo[socket.id].bg,
                                    class: "hmsg",
                                    id: UserInfo[socket.id].id,
                                    topic: UserInfo[socket.id].topic.split("<").join("&#x3C;"),
                                    msg: "( تسجيل خروج )",
                                    roomid: UserInfo[socket.id].idroom,
                                    pic: UserInfo[socket.id].pic,
                                    uid: socket.id,
                                },
                            });

                            const isrooma = roomslists.findIndex((x) => x.id == UserInfo[socket.id].idroom);
                            if (isrooma != -1) {
                                if (roomslists[isrooma].broadcast) {
                                    for (var i = 1; i < 8; i++) {
                                        if (PeerRoom[UserInfo[socket.id].idroom][i].id == socket.id) {
                                            PeerRoom[UserInfo[socket.id].idroom][i].id = "";
                                            PeerRoom[UserInfo[socket.id].idroom][i].ev = false;
                                            io.to(UserInfo[socket.id].idroom).emit("broadcasting", { cmd: "rleave", user: socket.id });
                                            // io.to(UserInfo[socket.id].idroom).emit('broadcasting',{cmd: "all",data:PeerRoom[UserInfo[socket.id].idroom]});
                                        }
                                    }
                                }
                            }

                            socket.leave(UserInfo[socket.id].idroom);
                            UserInfo[socket.id].idroom = null;

                            const inmed = online.findIndex((x) => x.id == socket.id);
                            if (inmed != -1) {
                                online[inmed].roomid = null;
                            }
                            io.emit("msg", { cmd: "ur", data: [socket.id, null] });
                        }
                    }
                }
            }
        } else if (data.cmd == "youtube") {
			  if (typeof data.data != "object") {
                return;
            }
			if(typeof data.data['search'] != 'string'){
				return;
			};
			if(data.data['search'].trim()){
			search(data.data['search'] || '' , 1).then(function(result) {
				   socket.emit("msg", {
                    cmd: "youtube",
				   data: result[0].id
				   });
			});
			};
        } else if (data.cmd == "tesc") {
            if (typeof data.data != "object") {
                return;
            }
			

            if (!SiteSetting["allowreg"]) {
                socket.emit("msg", { cmd: "removede", data: {} });
                socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "تم تعطيل تسجيل العصويات مؤقتآ .. حاول لاحقآ",
                        user: "",
                    },
                });
				removeip();
                return;
            }

			var myserail = socket.request['_query'];
			var myserails = null;
	    	var mybros = socket.request.headers['user-agent'];

            if (typeof mybros != "string" || typeof data.data.username != "string" || typeof data.data.password != "string" || typeof myserail != "object") {
                return;
            }

		if(typeof myserail.plt == "string" && typeof myserail.wk == "string"  && typeof myserail.version == "string" && typeof myserail.browser == "string" && typeof myserail.c == "string" ){
			
		const BrowserOn = Config.BrowserList.findIndex((x) => x.toLowerCase() == myserail.browser.replace("Mobile ","").toLowerCase());
            const PlatformOn = Config.PlatformList.findIndex((x) => x.toLowerCase() == myserail.plt.toLowerCase());
            if(BrowserOn == -1){
				        socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "الرجاء المحاولة بمتصفح أخر",
                        user: "",
                    },
                });
				removeip();
			  return;
			}else if(PlatformOn == -1){
                  socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "الرجاء المحاولة بنظام تشغيل أخر",
                        user: "",
                    },
                });
				removeip();
			  return;
			}else{
                 myserails = myserail.plt+'.'+myserail.version+'.'+myserail.wk+'.'+myserail.browser+'.'+myserail.c;
			};
			}else{
				socketdiscon();
				return;
			};
			
            if (!mybros|| !data.data["username"] || !data.data["password"] || !myserails) {
                socket.emit("msg", { cmd: "removede", data: {} });
                socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "الرجاء التاكد من بيناتك",
                        user: "",
                    },
                });
				removeip();
                return;
            };
			
			
                   request("https://get.geojs.io/v1/ip/country/" + MyIp() + ".json", function (err, rep, mycountry) {
                        if (mycountry) {
							if(mycountry){
                            mycountry = JSON.parse(mycountry);
							}else{
                            mycountry = {country:'fr'};								
							};
                    if (BandComplier(myserails)) {
                        socket.emit("msg", { cmd: "login", data: { msg: "banduser" } });
                        savelogin({
                            state: "محظور|تسجيل|جهاز",
                            topic: data.data["username"],
                            topic1: data.data["username"],
                            ip: MyIp(),
                            code: mycountry["country"],
                            device: BandComplier(myserails),
                            isin: '*',
                            time: new Date().getTime(),
                        });
						socketdiscon();
                        return;
                    };
					
                    if (BandComplierIp(MyIp())) {
                        socket.emit("msg", { cmd: "login", data: { msg: "banduser" } });
                        savelogin({
                            state: "محظور|تسجيل|اي بي",
                            topic: data.data["username"],
                            topic1: data.data["username"],
                            ip: BandComplierIp(MyIp()),
                            code: mycountry["country"],
                            device: myserails,
                            isin: '*',
                            time: new Date().getTime(),
                        });
						socketdiscon();
                        return;
                    };
			
					const nonm = NoNames.findIndex((x) => data.data['username'].includes(x));

		            	if(nonm != -1){
				         socket.emit("msg", { cmd: "removede", data: {} });
				  socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "هذا الاسم ممنوع",
                        user: "",
                    },
                });
				removeip();
				return;
			};

            // if(NoTikrar() == false){return};
			



            if (data.data["username"].trim().length < 1 && data.data["password"].trim().length < 1) {
                socket.emit("msg", { cmd: "removede", data: {} });
                socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "الرجاء التأكد من بيناتك",
                        user: "",
                    },
                });
				removeip();
                return;
            };
			if(isNaN(data.data["username"]) == false){
				      socket.emit("msg", { cmd: "removede", data: {} });
                socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "الرجاء التأكد من الاسم",
                        user: "",
                    },
                });
				removeip();
                return;
			}
            if (!data.data["username"].trim()) {
                socket.emit("msg", { cmd: "removede", data: {} });
                socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "الرجاء ادخال اسم",
                        user: "",
                    },
                });
				removeip();
                return;
            }

            if (data.data["username"].length >= walllikes.lengthUserReg) {
                socket.emit("msg", { cmd: "removede", data: {} });
                socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "اسم المستخدم طويل جداً يجب ان لا يزيد الاسم عن " + walllikes.lengthUserReg + " حرف ",
                        user: "",
                    },
                });
				removeip();
                return;
            }
			
            const isreg = UsersList.filter(function (item) {  
			if(typeof item.ip == 'string'){
			return item.ip == MyIp();
			}else{
				return;
			};
			}).length;
            if (isreg > 5) {
                socket.emit("msg", { cmd: "removede", data: {} });
                socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "انت مسجل من قبل",
                        user: "",
                    },
                });
				removeip();
                return;
            }

            UsersRepo.getByUserName(data.data["username"].toLowerCase().trim()).then((res) => {
                if (res) {
                    socket.emit("msg", { cmd: "login", data: { msg: "usedname" } });
					removeip();
                    return;
                } else {
                    UsersRepo.create({
                        ip: MyIp(),
                        fp: myserails,
                        documentationc: false,
                        id: socket.id,
                        lid: stringGen(31),
                        uid: stringGen(22),
                        power: "",
                        topic: data.data["username"].trim(),
                        username: data.data["username"].trim(),
                        password: passwordHash.generate(data.data["password"]),
                        token: stringGen(10),
						joinuser: new Date().getTime()
                    }).then((res) => {
                        if (res) {
							    savelogin({
                                    state: "تسجيل|عضوية",
                                    topic: data.data["username"],
                                    topic1: data.data["username"],
                                    ip: MyIp(),
                                    code: mycountry["country"],
                                    device: myserails,
                                    isin: '*',
                                    time: new Date().getTime(),
                                });
								removeip();
							setTimeout(function(){
                            socket.emit("msg", { cmd: "login", data: { id: socket.id, msg: "tesc", ttoken: stringGen(10),im3:"",im2:"",im1:"im1.png",pic: "pic.png" } });
                            RefreshUsers();
							},1000);
                        };
                    });
                }
            });
						};
		});
            // }).catch(console.error)
        } else if (data.cmd == "nonot") {
            if (typeof data.data != "object") {
                return;
            }
            if (!data.data.id) {
                return;
            }
			
            socket.to(data.data.id).emit("msg", {
                cmd: "not",
                data: {
                    topic: "",
                    force: 1,
                    msg: "هذا العضو لا يقبل التنبيهات",
                    user: socket.id,
                },
            });
        } else if (data.cmd == "nopm") {
            if (typeof data.data != "object") {
                return;
            }
            if (!data.data.id) {
                return;
            }
            socket.to(data.data.id).emit("msg", {
                cmd: "not",
                data: {
                    topic: "",
                    force: 1,
                    msg: '<label class="fa fa-warning">هذا المستخدم لا يقبل المحادثات الخاصه</label>',
                    user: socket.id,
                },
            });
        } else if (data.cmd == "action") {
            if (typeof data.data != "object") {
                return;
            }
            if (!data.data["id"]) {
                return;
            }
            if (UserInfo[socket.id] && UserInfo[data.data["id"]]) {
                if (data.data["cmd"] == "like") {
					
					if(UserInfo[data.data["id"]].offline == true){
						  socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "المستخدم غير متصل بالانترنت في الوقت الحالي",
                                user: "",
                            },
                        });
						return;
					};
					
                    const ismylike = UserInfo[socket.id].islike.findIndex((x) => x == data.data["id"]);
                    if (ismylike != -1) {
                        socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                 msg: 'يمكنك اعطاء 1 إعجاب كل 1 دقيقة',
                                user: "",
                            },
                        });
                    } else {
                        if (socket.id == data.data["id"]) {
                            socket.emit("msg", {
                                cmd: "not",
                                data: {
                                    topic: "إعجاب",
                                    force: 1,
                                    msg: "حصلت على إعجاب ❤",
                                    user: socket.id,
                                },
                            });
                        } else {
                            socket.to(data.data["id"]).emit("msg", {
                                cmd: "not",
                                data: {
                                    topic: "إعجاب",
                                    force: 1,
                                    msg: "حصلت على إعجاب ❤",
                                    user: socket.id,
                                },
                            });
                        }

                        const indexa = online.findIndex((x) => x.id == data.data["id"]);
                        if (indexa != -1) {
                            online[indexa].rep += 1;
                            // online[indexa].evaluation += 1;
                            UserInfo[data.data["id"]].rep += 1;
                            // UserInfo[data.data["id"]].evaluation += 1;
                            io.emit("msg", { cmd: "u^", data: online[indexa] });
                        }
                        if (UserInfo[socket.id]) {
                            UserInfo[socket.id].islike.push(data.data["id"]);
                            setTimeout(function () {
                                if (UserInfo[socket.id]) {
                                    UserInfo[socket.id].islike.splice(0, UserInfo[socket.id].islike.length);
                                }
                            }, 60000 * 1);
                        }

                        if (UserInfo[data.data["id"]].uid) {
                            UsersRepo.updatelike({ evaluation: UserInfo[data.data["id"]].evaluation, rep: UserInfo[data.data["id"]].rep, uid: UserInfo[data.data["id"]].uid });
                        }
                    }
                    return;
                }
                if (data.data.cmd == "ilove")
                {
                    if (UserInfo[data.data.id].offline == true)
                    {
                        socket.emit("msg",
                        {
                            cmd: "not",
                            data:
                            {
                                topic: "",
                                force: 1,
                                msg: "المستخدم غير متصل بالانترنت في الوقت الحالي",
                                user: "",
                            },
                        })
                        return
                    }
                    else
                    {
                        socket.id == data.data.id ? socket.emit("msg",
                            {
                                cmd: "not",
                                data:
                                {
                                    topic: "رسالة تلقائية",
                                    force: 1,
                                    msg: "❤️ أنـا أحٍـبَڪ ",
                                    user: socket.id,
                                },
                            }) :
                            socket.to(data.data.id).emit("msg",
                            {
                                cmd: "not",
                                data:
                                {
                                    topic: "رسالة تلقائية",
                                    force: 1,
                                    msg: "❤️ أنـا أحٍـبَڪ ",
                                    user: socket.id,
                                },
                            })
                        const lucely = online.findIndex((ghena) => ghena.id == data.data.id)
                        lucely != -1 && ((online[lucely].rep += 0),
                            (online[lucely].evaluation += 0),
                            (UserInfo[data.data.id].rep += 0),
                            (UserInfo[data.data.id].evaluation += 0),
                            io.emit("msg",
                            {
                                cmd: "u^",
                                data: online[lucely],
                            }))
                        UserInfo[socket.id] && 
                        (UserInfo[socket.id].islike.push(data.data.id),
                            setTimeout(function ()
                            {
                                UserInfo[socket.id] &&
                                    UserInfo[socket.id].islike.splice(0, UserInfo[socket.id].islike.length)
                            }, 60000))
                        UserInfo[data.data.id].uid && UsersRepo.updatelike(
                        {
                            evaluation: UserInfo[data.data.id].evaluation,
                            rep: UserInfo[data.data.id].rep,
                            uid: UserInfo[data.data.id].uid,
                        })
                    }
                    return
                }
                
                if (data.data.cmd == "giryo")
                {
                    if (UserInfo[data.data.id].offline == true)
                    {
                        socket.emit("msg",
                        {
                            cmd: "not",
                            data:
                            {
                                topic: "",
                                force: 1,
                                msg: "المستخدم غير متصل بالانترنت في الوقت الحالي",
                                user: "",
                            },
                        })
                        return
                    }
                    else
                    {
                        socket.id == data.data.id ? socket.emit("msg",
                            {
                                cmd: "not",
                                data:
                                {
                                    topic: "رسالة تلقائية",
                                    force: 1,
                                    msg: "ههههههههههههههههههههههههههههههههههههههههههههههههه 🤣💔",
                                    user: socket.id,
                                },
                            }) :
                            socket.to(data.data.id).emit("msg",
                            {
                                cmd: "not",
                                data:
                                {
                                    topic: "رسالة تلقائية",
                                    force: 1,
                                    msg: "ههههههههههههههههههههههههههههههههههههههههههههههههه 🤣💔",
                                    user: socket.id,
                                },
                            })
                        const lucely = online.findIndex((ghena) => ghena.id == data.data.id)
                        lucely != -1 && ((online[lucely].rep += 0),
                            (online[lucely].evaluation += 0),
                            (UserInfo[data.data.id].rep += 0),
                            (UserInfo[data.data.id].evaluation += 0),
                            io.emit("msg",
                            {
                                cmd: "u^",
                                data: online[lucely],
                            }))
                        UserInfo[socket.id] && (UserInfo[
                            socket.id].islike.push(data.data.id),
                            setTimeout(function ()
                            {
                                UserInfo[socket.id] &&
                                    UserInfo[socket.id].islike.splice(0, UserInfo[socket.id].islike.length)
                            }, 60000))
                        UserInfo[data.data.id].uid && UsersRepo.updatelike(
                        {
                            evaluation: UserInfo[data.data.id].evaluation,
                            rep: UserInfo[data.data.id].rep,
                            uid: UserInfo[data.data.id].uid,
                        })
                    }
                    return
                }
                
                if (data.data.cmd == "abucu")
                {
                    if (UserInfo[data.data.id].offline == true)
                    {
                        socket.emit("msg",
                        {
                            cmd: "not",
                            data:
                            {
                                topic: "",
                                force: 1,
                                msg: "المستخدم غير متصل بالانترنت في الوقت الحالي",
                                user: "",
                            },
                        })
                        return
                    }
                    else
                    {
                        socket.id == data.data.id ? socket.emit("msg",
                            {
                                cmd: "not",
                                data:
                                {
                                    topic: "رسالة تلقائية",
                                    force: 1,
                                    msg: " 😘 آإأأمَِمَِمَِوِوِوَِآإأهَهِھَہّ 💋",
                                    user: socket.id,
                                },
                            }) :
                            socket.to(data.data.id).emit('msg',
                            {
                                cmd: "not",
                                data:
                                {
                                    topic: "رسالة تلقائية",
                                    force: 1,
                                    msg: "😘 آإأأمَِمَِمَِوِوِوَِآإأهَهِھَہّ 💋",
                                    user: socket.id,
                                },
                            })
                        const lucely = online.findIndex((ghena) => ghena.id == data.data.id)
                        lucely != -1 && ((online[lucely].rep += 0),
                            (online[lucely].evaluation += 0),
                            (UserInfo[data.data.id].rep += 0),
                            (UserInfo[data.data.id].evaluation += 0),
                            io.emit("msg",
                            {
                                cmd: "u^",
                                data: online[lucely],
                            }))
                        UserInfo[socket.id] && (UserInfo[
                            socket.id].islike.push(data.data.id),
                            setTimeout(function ()
                            {
                                UserInfo[socket.id] &&
                                    UserInfo[socket.id].islike.splice(0, UserInfo[socket.id].islike.length)
                            }, 60000))
                        UserInfo[data.data.id].uid && UsersRepo.updatelike(
                        {
                            evaluation: UserInfo[data.data.id].evaluation,
                            rep: UserInfo[data.data.id].rep,
                            uid: UserInfo[data.data.id].uid,
                        })
                    }
                    return
                }
                
                if (data.data.cmd == "ariyor")
                {
                    if (UserInfo[data.data.id].offline == true)
                    {
                        socket.emit("msg",
                        {
                            cmd: "not",
                            data:
                            {
                                topic: "",
                                force: 1,
                                msg: "المستخدم غير متصل بالانترنت في الوقت الحالي",
                                user: "",
                            },
                        })
                        return
                    }
                    else
                    {
                        socket.id == data.data.id ? socket.emit("msg",
                            {
                                cmd: "not",
                                data:
                                {
                                    topic: "رسالة تلقائية",
                                    force: 1,
                                    msg: "😭 وآإآإآإآإآإآإآإآإآإآإآإع 😭",
                                    user: socket.id,
                                },
                            }) :
                            socket.to(data.data.id).emit("msg",
                            {
                                cmd: "not",
                                data:
                                {
                                    topic: "رسالة تلقائية",
                                    force: 1,
                                    msg: "😭 وآإآإآإآإآإآإآإآإآإآإآإع 😭",
                                    user: socket.id,
                                },
                            })
                        const lucely = online.findIndex((ghena) => ghena.id == data.data.id)
                        lucely != -1 && ((online[lucely].rep += 0),
                            (online[lucely].evaluation += 0),
                            (UserInfo[data.data.id].rep += 0),
                            (UserInfo[data.data.id].evaluation += 0),
                            io.emit("msg",
                            {
                                cmd: "u^",
                                data: online[lucely],
                            }))
                        UserInfo[socket.id] && (UserInfo[
                            socket.id].islike.push(data.data.id),
                            setTimeout(function ()
                            {
                                UserInfo[socket.id] &&
                                    UserInfo[socket.id].islike.splice(0, UserInfo[socket.id].islike.length)
                            }, 60000))
                        UserInfo[data.data.id].uid && UsersRepo.updatelike(
                        {
                            evaluation: UserInfo[data.data.id].evaluation,
                            rep: UserInfo[data.data.id].rep,
                            uid: UserInfo[data.data.id].uid,
                        })
                    }
                    return
                }
                
                if (data.data.cmd == "wetchedprofile")
                {
                    if (UserInfo[data.data.id].offline == true)
                    {
                        socket.emit("msg",
                        {
                            cmd: "not",
                            data:
                            {
                                topic: "",
                                force: 1,
                                msg: "المستخدم غير متصل بالانترنت في الوقت الحالي",
                                user: "",
                            },
                        })
                        return
                    }
                    {
                        socket.id == data.data.id ? socket.emit("msg",
                            {
                                cmd: "wetchprofilenot",
                                data:
                                {
                                    topic: UserInfo[socket.id].topic,
                                    force: 1,
                                    msg: ' هذا المستخدم قد زار بروفايلك',
                                    user: socket.id,
                                },
                            }) :
                            socket.to(data.data.id).emit("msg",
                            {
                                cmd: "wetchprofilenot",
                                data:
                                {
                                    topic: UserInfo[socket.id].topic,
                                    force: 1,
                                    msg: " هذا المستخدم قد زار بروفايلك",
                                    user: socket.id,
                                },
                            })
                            
                        UserInfo[data.data.id].uid && UsersRepo.updatelike(
                        {
                            evaluation: UserInfo[data.data.id].evaluation,
                            rep: UserInfo[data.data.id].rep,
                            uid: UserInfo[data.data.id].uid,
                        })
                        const indexa = online.findIndex((x) => x.id == socket.id);
                        if (indexa != -1) {
                            online[indexa].pointsG += 1;
                            UserInfo[socket.id].pointsG += 1;
                            io.emit("msg", { cmd: "u^", data: online[indexa] });}
                    }
                    return
                }  

                if (data.data["cmd"] == "not") {
												if(UserInfo[socket.id]){

                    if (UserInfo[socket.id].rep < SiteSetting.notlikes) {
                        socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: SiteSetting.notlikes + " عدد الايكات المطلوبة لارسال تنبيه ",
                                user: socket.id,
                            },
                        });
                        return;
                    }
					
			     if (UserInfo[socket.id].ismuted == true) {
                    socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            force: 1,
                            msg: "إسكات",
                            user: "",
                        },
                    });
					
					return
					 };
			};

		if(UserInfo[data.data["id"]].offline == true){
						  socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "المستخدم غير متصل بالانترنت في الوقت الحالي",
                                user: "",
                            },
                        });
						return;
					};
					
                    FilterChat(data.data.msg);
                    socket.to(data.data["id"]).emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            msg: xss(ektisara(data.data.msg)),
                            force: MyOptionalert(UserInfo[socket.id].rank),
                            user: socket.id,
                        },
                    });

                    return;
                }

                if (VerPower({ to: UserInfo[socket.id].rank, me: UserInfo[data.data["id"]].rank })) {
                    if (UserInfo[socket.id] && UserInfo[data.data["id"]]) {
                        const MyCp = ShowPowers.findIndex((x) => x.name == UserInfo[socket.id].rank);

                        if (data.data["cmd"] == "ban") {
                            if (UserInfo[data.data["id"]] && UserInfo[socket.id]) {
                                if (MyCp != -1) {
                                    if (!ShowPowers[MyCp].ban) {
                                        socket.emit("msg", {
                                            cmd: "not",
                                            data: {
                                                topic: "",
                                                force: 1,
                                                msg: "ليس لديك صلاحية",
                                                user: socket.id,
                                            },
                                        });
                                        return;
                                    }

                                    if (data.data["id"] == socket.id) {
                                        socket.emit("msg", {
                                            cmd: "not",
                                            data: {
                                                topic: "",
                                                force: 1,
                                                msg: "لا يمكنك حظر نفسك",
                                                user: socket.id,
                                            },
                                        });
                                        return;
                                    }
                                    BandUser({
                                        user: UserInfo[socket.id].username,
                                        myip: UserInfo[socket.id].ip,
                                        topic: UserInfo[data.data["id"]].topic,
                                        name_band: "باند",
                                        type: " من قبل " + UserInfo[socket.id].username,
                                        decoderDans: "",
                                        date: new Date().getTime(),
                                        ip_band: UserInfo[data.data["id"]].ip,
                                        device_band: UserInfo[data.data["id"]].fp,
                                    });
									
                                    UserInfo[data.data["id"]].ismsg = true;
									UserDisconnect({id:data.data["id"],state:2});
									io.to(data.data["id"]).emit("msg", { cmd: "ev", data: 'window.onbeforeunload = null; location.href="/";' });

									
							
                                    socket.to(data.data["id"]).emit("msg", {
                                        cmd: "not",
                                        data: {
                                            topic: "",
                                            force: 1,
                                            msg: "تم حظرك من الدردشة",
                                            user: '',
                                        },
                                    });
                                    // io.to(UserInfo[socket.id].idroom).emit("msg", {
								    if(isgusts(data.data["id"]) == false){
                                    io.to(UserInfo[data.data["id"]].idroom).emit("msg", {
                                        cmd: "msg",
                                        data: {
                                            bg: "none",
                                            class: "hmsg",
                                            topic: UserInfo[data.data["id"]].topic,
                                            msg: "( تم حظر هذا المستخدم )",
                                            roomid: UserInfo[data.data["id"]].idroom,
                                            pic: UserInfo[data.data["id"]].pic,
                                            uid: "",
                                        },
                                    });
									};
                                }
                            }
                            /*} else if (data.data["cmd"] == "micro") {
                    const MyCp = ShowPowers.findIndex((x) => x.name == UserInfo[socket.id].rank);
					if(MyCp != -1){
						       if (!ShowPowers[MyCp].cp) {
                            socket.emit("msg", {
                                cmd: "not",
                                data: {
                                    topic: '',
                                    msg: "ليس لديك صلاحية",
                                    user: socket.id,
                                    force: 0
                                },
                            });
                            return;
                        }
					}else{
                            return;						
					};
						if(UserInfo[data.data["id"]] && UserInfo[socket.id]){
                        if (UserInfo[data.data["id"]].istalk == false) {
                            socket.to(data.data["id"]).emit("msg", {
                                cmd: "not",
                                data: {
                                    topic: '',
                                    msg: "تم إعطائك المايك",
                                    user: socket.id,
                                    force: 0
                                },
                            });
			 const ismue = online.findIndex((x) => x.id == data.data["id"]);
                if (ismue != -1) {
                    UserInfo[data.data["id"]].istalk = true;
                    online[ismue].istalk = true;
                    io.emit("msg", { cmd: "u^", data: online[ismue] });
                }
				
				
                        } else {
                            socket.to(data.data["id"]).emit("msg", {
                                cmd: "not",
                                data: {
                                    topic: '',
                                    msg: "تم الغاء المايك",
                                    user: socket.id,
                                    force: 0
                                },
                            });
							const ismi = online.findIndex((x) => x.id == data.data["id"]);
                        if (ismi != -1) {
                            online[ismi].istalk = false;
                            UserInfo[data.data["id"]].istalk = false;
                            io.emit("msg", { cmd: "u^", data: online[ismi] });
                        }
							
                        }
                        socket.to(data.data["id"]).emit("msg", {
                            cmd: "microp",
                            data:  UserInfo[data.data["id"]].istalk
                            });
						};
						*/
                        } else if (data.data["cmd"] == "meiut") {
                            if (MyCp != -1) {
                                if (!ShowPowers[MyCp].meiut) {
                                    socket.emit("msg", {
                                        cmd: "not",
                                        data: {
                                            topic: "",
                                            msg: "ليس لديك صلاحية",
                                            user: socket.id,
                                            force: 0,
                                        },
                                    });
                                    return;
                                }
                                if (UserInfo[data.data["id"]] && UserInfo[socket.id]) {
					if(UserInfo[data.data["id"]].offline == true){
						  socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "المستخدم غير متصل بالانترنت في الوقت الحالي",
                                user: "",
                            },
                        });
						return;
					};
                                    if (UserInfo[data.data["id"]].ismuted == false) {
                                        socket.to(data.data["id"]).emit("msg", {
                                            cmd: "not",
                                            data: {
                                                topic: "",
                                                msg: "تم منعك من الحديث في الدردشة",
                                                user: socket.id,
                                                force: 0,
                                            },
                                        });
                                        const ismue = online.findIndex((x) => x.id == data.data["id"]);
                                        if (ismue != -1) {
                                            UserInfo[data.data["id"]].ismuted = true;
                                            online[ismue].meiut = true;
                                            io.emit("msg", { cmd: "u^", data: online[ismue] });
                                        }

                                        UserMuted.push(UserInfo[data.data["id"]].fp);
                                        savestate({ state: "اسكات", topic: UserInfo[socket.id].topic, ip: UserInfo[socket.id].ip, topic1: UserInfo[data.data["id"]].topic, room: "", time: new Date().getTime() });
                                        if (UserInfo[data.data["id"]].uid) {
                                            UsersRepo.updateMute({ muted: true, idreg: UserInfo[data.data["id"]].idreg.split("#")[1] });
                                        }
                                    } else {
                                        socket.to(data.data["id"]).emit("msg", {
                                            cmd: "not",
                                            data: {
                                                topic: "",
                                                msg: "تم السماح لك بالحديث في الدردشة",
                                                user: socket.id,
                                                force: 0,
                                            },
                                        });
                                        savestate({ state: "الغاء اسكات", topic: UserInfo[socket.id].topic, ip: UserInfo[socket.id].ip, topic1: UserInfo[data.data["id"]].topic, room: "", time: new Date().getTime() });
                                        UserMuted.splice(
                                            UserMuted.findIndex((v) => v == UserInfo[data.data["id"]].fp),
                                            1
                                        );
                                        const ismi = online.findIndex((x) => x.id == data.data["id"]);
                                        if (ismi != -1) {
                                            online[ismi].meiut = false;
                                            UserInfo[data.data["id"]].ismuted = false;
                                            io.emit("msg", { cmd: "u^", data: online[ismi] });
                                        }

                                        if (UserInfo[data.data["id"]].uid) {
                                            UsersRepo.updateMute({ muted: false, idreg: UserInfo[data.data["id"]].idreg.split("#")[1] });
                                        }
                                    }
                                    socket.to(data.data["id"]).emit("msg", {
                                        cmd: "muted",
                                        data: {
                                            id: data.data["id"],
                                            lid: data.data["id"],
                                            uid: UserInfo[data.data["id"]].uid,
                                            ism: UserInfo[data.data["id"]].ismuted,
                                            topic: UserInfo[data.data["id"]].topic,
                                        },
                                    });
                                }
                            }
                        } else if (UserInfo[socket.id] && UserInfo[data.data["id"]] && data.data["cmd"] == "gift") {
                            if (MyCp != -1) {
                                if (!ShowPowers[MyCp].upgrades) {
                                    socket.emit("msg", {
                                        cmd: "not",
                                        data: {
                                            topic: "",
                                            msg: "ليس لديك صلاحية",
                                            force: 1,
                                            user: socket.id,
                                        },
                                    });
                                    return;
                                }
								
													if(UserInfo[data.data["id"]].offline == true){
						  socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "المستخدم غير متصل بالانترنت في الوقت الحالي",
                                user: "",
                            },
                        });
						return;
					};
                                if (UserInfo[data.data["id"]].rank != "") {
                                    socket.emit("msg", {
                                        cmd: "not",
                                        data: {
                                            topic: "",
                                            msg: "لا يمكنك ارسال هديه للسوبر",
                                            user: "",
                                            force: 0,
                                        },
                                    });
                                    return;
                                }
                                socket.to(data.data["id"]).emit("msg", {
                                    cmd: "not",
                                    data: {
                                        topic: "",
                                        msg:  data.data["gift"] ? "هديه " + "<img src=" + "/dro3/" + data.data["gift"] + ">" : "تم إزالة الهدية",
                                        user: socket.id,
                                        force: 1,
                                    },
                                });

                                UserInfo[data.data["id"]].ico = data.data["gift"] ? "/dro3/" +data.data["gift"] : "";
                                const isd = online.findIndex((x) => x.id == data.data["id"]);
                                if (isd != -1) {
                                    online[isd].ico = data.data["gift"] ? "/dro3/" +data.data["gift"] : "";
                                    io.emit("msg", { cmd: "u^", data: online[isd] });
                                }

                                if (UserInfo[data.data["id"]].uid) {
                                    UsersRepo.updateIco({ ico: data.data["gift"] ? "/dro3/" +data.data["gift"] : "", uid: UserInfo[data.data["id"]].uid });
                                }
                            }
                        } else if (data.data["cmd"] == "rinvite") {
                            if (UserInfo[data.data["id"]]) {
                                if (MyCp != -1) {
                                    if (!ShowPowers[MyCp].loveu) {
                                        socket.emit("msg", {
                                            cmd: "not",
                                            data: {
                                                topic: "",
                                                force: 1,
                                                msg: "ليس لديك صلاحية",
                                                user: socket.id,
                                            },
                                        });
                                        return;
                                    }
									
                   if(UserInfo[data.data["id"]].offline == true){
						  socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "المستخدم غير متصل بالانترنت في الوقت الحالي",
                                user: "",
                            },
                        });
						return;
					};

                                    const isrooma = roomslists.findIndex((x) => x.id == data.data["rid"]);
                                    if (roomslists[isrooma].pass != data.data["pwd"] && roomslists[isrooma].needpass) {
                                        socket.emit("msg", {
                                            cmd: "not",
                                            data: {
                                                topic: "",
                                                force: 1,
                                                msg: "الرقم السري لدخول الغرفة خاطئ",
                                                user: "",
                                            },
                                        });
                                    } else {
										  if (NoTikrar() == false) {
                                return;
                            }
                                        socket.to(data.data["id"]).emit("msg", {
                                            cmd: "not",
                                            data: {
                                                topic: "",
                                                force: 1,
                                                msg: " تم نقلك الى غرفة " + getname(data.data["rid"]),
                                                user: socket.id,
                                            },
                                        });
                                        // savestate({ state: "نقل من الغرفة", topic: UserInfo[socket.id].topic, topic1: UserInfo[data.data["id"]].topic, room: getname(data.data["rid"]), time: new Date().getTime() });

                                        const indexr1 = roomslists.findIndex((x) => x.id == data.data["rid"]);
                                        if (indexr1 != -1) {
                                            savestate({
                                                state: "نقل إلى غرفة",
                                                topic: UserInfo[socket.id].topic.split("<").join("&#x3C;"),
                                                ip: UserInfo[socket.id].ip,
                                                topic1: UserInfo[data.data["id"]].topic,
                                                room: roomslists[indexr1].topic,
                                                time: new Date().getTime(),
                                            });
                                        }
                                        socket.to(data.data["id"]).emit("msg", {
                                            cmd: "rjoinad",
                                            data: {
                                                rid: data.data["rid"],
                                                pwd: data.data["pwd"],
                                            },
                                        });
                                    }
                                }
                            }
                        } else if (data.data["cmd"] == "roomkick") {
                            if (MyCp != -1) {
                                if (!ShowPowers[MyCp].kick) {
                                    socket.emit("msg", {
                                        cmd: "not",
                                        data: {
                                            topic: "",
                                            msg: "ليس لديك صلاحية",
                                            user: socket.id,
                                            force: 0,
                                        },
                                    });
                                    return;
                                }
								
								
					if(UserInfo[data.data["id"]].offline == true){
						  socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "المستخدم غير متصل بالانترنت في الوقت الحالي",
                                user: "",
                            },
                        });
						return;
					};

                                if (data.data["id"] == socket.id) {
                                    socket.emit("msg", {
                                        cmd: "not",
                                        data: {
                                            topic: "",
                                            force: 1,
                                            msg: "لا يمكنك طرد نفسك من الغرفة",
                                            user: socket.id,
                                        },
                                    });
                                    return;
                                }

                                socket.to(data.data["id"]).emit("msg", {
                                    cmd: "not",
                                    data: {
                                        topic: "",
                                        msg: "تم طردك من الغرفه",
                                        user: socket.id,
                                        force: 0,
                                    },
                                });
								
								  io.to(UserInfo[data.data["id"]].idroom).emit("msg", {
                                    cmd: "msg",
                                    data: {
                                        bg: "none",
                                        class: "hmsg",
                                        topic: UserInfo[data.data["id"]].topic,
                                        msg: "( هذا المستخدم تم طرده من الغرفة )",
                                        roomid: UserInfo[data.data["id"]].idroom,
                                        pic: UserInfo[data.data["id"]].pic,
                                        uid: data.data["id"],
                                    },
                                });
                                iskick = true;
                                setTimeout(function () {
                                    iskick = false;
                                }, 2000);
                                BandRoom.push({ user: UserInfo[data.data["id"]].fp, room: UserInfo[data.data["id"]].idroom });
                                socket.to(data.data["id"]).emit("msg", {
                                    cmd: "lavedon",
                                    data: {},
                                });
                                if (UserInfo[socket.id]) {
                                    const isdesc1 = roomslists.findIndex((x) => x.id == UserInfo[data.data["id"]].idroom);
                                    if (isdesc1 != -1) {
                                        savestate({
                                            state: "طرد من الغرفة",
                                            topic: UserInfo[socket.id].topic.split("<").join("&#x3C;"),
                                            ip: UserInfo[socket.id].ip,
                                            topic1: UserInfo[data.data["id"]].topic,
                                            room: roomslists[isdesc1].topic,
                                            time: new Date().getTime(),
                                        });
                                    }
                                }
                            }
                        } else if (data.data["cmd"] == "delpic") {
                            if (MyCp != -1) {
                                if (!ShowPowers[MyCp].delpic) {
                                    socket.emit("msg", {
                                        cmd: "not",
                                        data: {
                                            topic: "",
                                            msg: "ليس لديك صلاحية",
                                            user: "",
                                            force: 0,
                                        },
                                    });
                                    return;
                                }
								
													if(UserInfo[data.data["id"]].offline == true){
						  socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                force: 1,
                                msg: "المستخدم غير متصل بالانترنت في الوقت الحالي",
                                user: "",
                            },
                        });
						return;
					};
                                socket.to(data.data["id"]).emit("msg", {
                                    cmd: "not",
                                    data: {
                                        topic: "",
                                        msg: "تم حذف صورتك",
                                        user: socket.id,
                                        force: 0,
                                    },
                                });

                                fs.unlink("uploads" + UserInfo[data.data["id"]].pic, (err) => {
                                    if (err) {
                                        return;
                                    }
                                });
								
									 fs.unlink("uploads" + UserInfo[data.data["id"]].pic+'.jpg', (err) => {
                        if (err) {
                            return;
                        }
                    });

                                UserInfo[data.data["id"]].pic = "pic.png";
                                savestate({ state: "حذف صورة", topic: UserInfo[socket.id].topic, ip: UserInfo[socket.id].ip, topic1: UserInfo[data.data["id"]].topic, room: "", time: new Date().getTime() });

                                const picdix = online.findIndex((x) => x.id == data.data["id"]);
                                if (picdix != -1) {
                                    online[picdix].pic = "pic.png";
                                    io.emit("msg", { cmd: "u^", data: online[picdix] });
                                }

                                if (UserInfo[data.data["id"]].uid) {
                                    UsersRepo.updatePic({ uid: UserInfo[data.data["id"]].uid, pic: "pic.png" }).then((uruser) => {
                                        if (uruser) {
                                            socket.to(data.data["id"]).emit("savedone", "pic.png");
                                        }
                                    });
                                }
                            }}
                            else if (data.data["cmd"] == "delpicx") {
                                if (MyCp != -1) {
                                    if (!ShowPowers[MyCp].delpic) {
                                        socket.emit("msg", {
                                            cmd: "not",
                                            data: {
                                                topic: "",
                                                msg: "ليس لديك صلاحية",
                                                user: "",
                                                force: 0,
                                            },
                                        });
                                        return;
                                    }
                                    
                             if(UserInfo[data.data["id"]].offline == true){
                              socket.emit("msg", {
                                cmd: "not",
                                data: {
                                    topic: "",
                                    force: 1,
                                    msg: "المستخدم غير متصل بالانترنت في الوقت الحالي",
                                    user: "",
                                },
                            });
                            return;
                        };
                                    socket.to(data.data["id"]).emit("msg", {
                                        cmd: "not",
                                        data: {
                                            topic: "",
                                            msg: "تم حذف صورة الغلاف الخاصة بك",
                                            user: socket.id,
                                            force: 0,
                                        },
                                    });
    
                                    fs.unlink("uploads" + UserInfo[data.data["id"]].im1, (err) => {
                                        if (err) {
                                            return;
                                        }
                                    });
                                    
                                         fs.unlink("uploads" + UserInfo[data.data["id"]].im1+'.jpg', (err) => {
                            if (err) {
                                return;
                            }
                        });
    
                                    UserInfo[data.data["id"]].im1 = "im1.png";
                                    savestate({ state: "حذف غلاف", topic: UserInfo[socket.id].topic, ip: UserInfo[socket.id].ip, topic1: UserInfo[data.data["id"]].topic, room: "", time: new Date().getTime() });
    
                                    const picdix = online.findIndex((x) => x.id == data.data["id"]);
                                    if (picdix != -1) {
                                        online[picdix].im1 = "im1.png";
                                        io.emit("msg", { cmd: "u^", data: online[picdix] });
                                    }
    
                                    if (UserInfo[data.data["id"]].uid) {
                                        UsersRepo.updatePicx({ uid: UserInfo[data.data["id"]].uid, im1: "im1.png" }).then((uruser) => {
                                            if (uruser) {
                                                socket.to(data.data["id"]).emit("savedonex", "im1.png");
                                            }
                                        });
                                    }
                                }
                            }
                                else if (data.data["cmd"] == "delpicxx") {
                                    if (MyCp != -1) {
                                        if (!ShowPowers[MyCp].delpic) {
                                            socket.emit("msg", {
                                                cmd: "not",
                                                data: {
                                                    topic: "",
                                                    msg: "ليس لديك صلاحية",
                                                    user: "",
                                                    force: 0,
                                                },
                                            });
                                            return;
                                        }
                                        
                                 if(UserInfo[data.data["id"]].offline == true){
                                  socket.emit("msg", {
                                    cmd: "not",
                                    data: {
                                        topic: "",
                                        force: 1,
                                        msg: "المستخدم غير متصل بالانترنت في الوقت الحالي",
                                        user: "",
                                    },
                                });
                                return;
                            };
                                        socket.to(data.data["id"]).emit("msg", {
                                            cmd: "not",
                                            data: {
                                                topic: "",
                                                msg: "تم حذف صورة الحالة الخاصة بك",
                                                user: socket.id,
                                                force: 0,
                                            },
                                        });
        
                                        fs.unlink("uploads" + UserInfo[data.data["id"]].im2, (err) => {
                                            if (err) {
                                                return;
                                            }
                                        });
                                        
                                             fs.unlink("uploads" + UserInfo[data.data["id"]].im2+'.jpg', (err) => {
                                if (err) {
                                    return;
                                }
                            });
        
                                        UserInfo[data.data["id"]].im2 = " ";
                                        savestate({ state: "حذف صورة الحالة", topic: UserInfo[socket.id].topic, ip: UserInfo[socket.id].ip, topic1: UserInfo[data.data["id"]].topic, room: "", time: new Date().getTime() });
        
                                        const picdix = online.findIndex((x) => x.id == data.data["id"]);
                                        if (picdix != -1) {
                                            online[picdix].im2 = " ";
                                            io.emit("msg", { cmd: "u^", data: online[picdix] });
                                        }
        
                                        if (UserInfo[data.data["id"]].uid) {
                                            UsersRepo.updatePicxx({ uid: UserInfo[data.data["id"]].uid, im2: " " }).then((uruser) => {
                                                if (uruser) {
                                                    socket.to(data.data["id"]).emit("savedonexx", " ");
                                                }
                                            });
                                        }
                                    }
                                }
                                    else if (data.data["cmd"] == "delpicxxx") {
                                        if (MyCp != -1) {
                                            if (!ShowPowers[MyCp].delpic) {
                                                socket.emit("msg", {
                                                    cmd: "not",
                                                    data: {
                                                        topic: "",
                                                        msg: "ليس لديك صلاحية",
                                                        user: "",
                                                        force: 0,
                                                    },
                                                });
                                                return;
                                            }
                                            
                                     if(UserInfo[data.data["id"]].offline == true){
                                      socket.emit("msg", {
                                        cmd: "not",
                                        data: {
                                            topic: "",
                                            force: 1,
                                            msg: "المستخدم غير متصل بالانترنت في الوقت الحالي",
                                            user: "",
                                        },
                                    });
                                    return;
                                };
                                            socket.to(data.data["id"]).emit("msg", {
                                                cmd: "not",
                                                data: {
                                                    topic: "",
                                                    msg: "تم حذف صورة الحالة الخاصة بك",
                                                    user: socket.id,
                                                    force: 0,
                                                },
                                            });
            
                                            fs.unlink("uploads" + UserInfo[data.data["id"]].im3, (err) => {
                                                if (err) {
                                                    return;
                                                }
                                            });
                                            
                                                 fs.unlink("uploads" + UserInfo[data.data["id"]].im3+'.jpg', (err) => {
                                    if (err) {
                                        return;
                                    }
                                });
            
                                            UserInfo[data.data["id"]].im3 = " ";
                                            savestate({ state: "حذف الاطار", topic: UserInfo[socket.id].topic, ip: UserInfo[socket.id].ip, topic1: UserInfo[data.data["id"]].topic, room: "", time: new Date().getTime() });
            
                                            const picdix = online.findIndex((x) => x.id == data.data["id"]);
                                            if (picdix != -1) {
                                                online[picdix].im3 = " ";
                                                io.emit("msg", { cmd: "u^", data: online[picdix] });
                                            }
            
                                            if (UserInfo[data.data["id"]].uid) {
                                                UsersRepo.updatePicxxx({ uid: UserInfo[data.data["id"]].uid, im3: " " }).then((uruser) => {
                                                    if (uruser) {
                                                        socket.to(data.data["id"]).emit("savedonexxx", " ");
                                                    }
                                                });
                                            }
                                        }
                                    
                            /* } else if (data.data["cmd"] == "report") {
                            if (UserInfo[socket.id].rep > SiteSetting.notlikes) {
                                socket.to(data.data["id"]).emit("msg", {
                                    cmd: "not",
                                    data: {
                                        topic: "",
                                        msg: data.data["msg"].split("<").join("&#x3C;"),
                                        user: socket.id,
                                        force: 0,
                                    },
                                });
                            } else {
                                socket.emit("msg", {
                                    cmd: "not",
                                    data: {
                                        topic: "",
                                        force: 1,
                                        msg: SiteSetting.notlikes + " عدد الايكات المطلوبة لارسال تنبيه ",
                                        user: socket.id,
                                    },
                                });
                            }*/
                        } else if (data.data["cmd"] == "kick") {
                            if (MyCp != -1) {
                                if (!ShowPowers[MyCp].kick) {
                                    socket.emit("msg", {
                                        cmd: "not",
                                        data: {
                                            topic: "",
                                            msg: "ليس لديك صلاحية",
                                            user: socket.id,
                                            force: 0,
                                        },
                                    });
                                    return;
                                }

                                if (data.data["id"] == socket.id) {
                                    socket.emit("msg", {
                                        cmd: "not",
                                        data: {
                                            topic: "",
                                            force: 1,
                                            msg: "لا يمكنك طرد نفسك",
                                            user: socket.id,
                                        },
                                    });
                                    return;
                                }

                                socket.to(data.data["id"]).emit("msg", {
                                    cmd: "not",
                                    data: {
                                        force: 1,
                                        topic: "",
                                        msg: "تم طردك من الدردشة",
                                        user: '',
                                    },
                                });

                 
                                  UserInfo[data.data["id"]].ismsg = true;
								  UserDisconnect({id:data.data["id"],state:2});
							      io.to(data.data["id"]).emit("msg", { cmd: "ev", data: 'window.onbeforeunload = null; location.href="/";' });
								  
                                if(isgusts(data.data["id"]) == false){
                                io.to(UserInfo[data.data["id"]].idroom).emit("msg", {
                                    cmd: "msg",
                                    data: {
                                        bg: "none",
                                        class: "hmsg",
                                        topic: UserInfo[data.data["id"]].topic,
                                        msg: "( تم طرد هذا المستخدم )",
                                        roomid: UserInfo[data.data["id"]].idroom,
                                        pic: UserInfo[data.data["id"]].pic,
                                        uid: data.data["id"],
                                    },
                                });
								};

                                const indedxr1 = roomslists.findIndex((x) => x.id == UserInfo[data.data['id']].idroom);
                                if (indedxr1 != -1) {
                                    savestate({ state: "طرد", topic: UserInfo[socket.id].topic, ip: UserInfo[socket.id].ip, topic1: UserInfo[data.data["id"]].topic, room: roomslists[indedxr1].topic, time: new Date().getTime() });
                                }
                            }
                        }
                    }
                } else {
                    socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            force: 1,
                            msg: " هذا الشخص اعلى منك رتبة",
                            user: "",
                        },
                    });
                }
            }
        } else if (data.cmd == "login") {
            if (typeof data.data != "object") {
                return;
            }


		var mybros = socket.request.headers['user-agent'];
		var myserails = null;
		var myserail = socket.request['_query'];
            if (typeof mybros != "string" || typeof data.data.refr != "string" || typeof data.data.username != "string" || typeof data.data.password != "string" || typeof myserail != "object") {
                return;
            }
		if(typeof myserail.plt == "string" && typeof myserail.wk == "string"  && typeof myserail.version == "string" && typeof myserail.browser == "string" && typeof myserail.c == "string" ){
			
		const BrowserOn = Config.BrowserList.findIndex((x) => x.toLowerCase() == myserail.browser.replace("Mobile ","").toLowerCase());
            const PlatformOn = Config.PlatformList.findIndex((x) => x.toLowerCase() == myserail.plt.toLowerCase());
            if(BrowserOn == -1){
				        socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "الرجاء المحاولة بمتصفح أخر",
                        user: "",
                    },
                });
				removeip();
			  return;
			}else if(PlatformOn == -1){
                  socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "الرجاء المحاولة بنظام تشغيل أخر",
                        user: "",
                    },
                });
				removeip();
			  return;
			}else{
                 myserails = myserail.plt+'.'+myserail.version+'.'+myserail.wk+'.'+myserail.browser+'.'+myserail.c;
			};
			}else{
				socketdiscon();
				return;
			};
			
            if (!mybros || !data.data["username"] || !data.data["password"] || !myserails) {
                socket.emit("msg", { cmd: "removede", data: {} });
                socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "الرجاء التاكد من بيناتك",
                        user: "",
                    },
                });
				removeip();
                return;
            }
			
		const nonm = NoNames.findIndex((x) => data.data['username'].includes(x));
			if(nonm != -1){
                socket.emit("msg", { cmd: "removede", data: {} });
				      socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "هذا الاسم ممنوع",
                        user: "",
                    },
                });
				removeip();
				return;
			};

            const idip = ListIP.filter(function (item) {
			    return item == MyIp();
			}).length;
            if (idip > 4) {
                socket.emit("msg", { cmd: "removede", data: {} });
                socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "الرجاء المحاولة في وقت لاحق",
                        user: "",
                    },
                });
				removeip();
                return;
            }
			

			
            if (!data.data["username"].trim()) {
                socket.emit("msg", { cmd: "removede", data: {} });
                socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "الرجاء ادخال اسم",
                        user: "",
                    },
                });
				removeip();
                return;
            }
			
			
			if(isNaN(data.data["username"]) == false){
				      socket.emit("msg", { cmd: "removede", data: {} });
                socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "الرجاء التأكد من الاسم",
                        user: "",
                    },
                });
				removeip();
                return;
			}
			
            var nameTaken = false;
            Object.keys(UserInfo).forEach(function (socketId) {
                var userInfos = UserInfo[socketId];
                //if (userInfos.username.toLowerCase() === data.data["username"].toLowerCase()) {
                    if (userInfos === data.data["username"].toLowerCase()) {
                    nameTaken = true;
                }
            });

            UsersRepo.getByUserName(data.data["username"].trim()).then((login) => {
                if (login) {
                    request("https://get.geojs.io/v1/ip/country/" + MyIp() + ".json", function (err, rep, mycountry) {
                        if (mycountry) {
							if(mycountry){
                            mycountry = JSON.parse(mycountry);
							}else{
                            mycountry = {country:'fr'};								
							};
                            if (passwordHash.verify(data.data["password"], login.password)) {
                                if (StopVPN(mycountry["country"]) && !login.documentationc && isVPN) {
						savelogin({
                            state: "عضو|محظور|VPN",
                            topic: data.data["username"],
                            topic1: data.data["username"],
                            ip: MyIp(),
                            code: mycountry["country"],
                            device: myserails,
                            isin: data.data["refr"],
                            time: new Date().getTime(),
                        });
                                    socket.emit("msg", { cmd: "login", data: { msg: "vpn" } });
						      socketdiscon();
								   return;
                                }


				   if (BandComplier(myserails) && !login.documentationc) {
                        socket.emit("msg", { cmd: "login", data: { msg: "banduser" } });
                        savelogin({
                            state: "محظور|عضو|جهاز",
                            topic: data.data["username"],
                            topic1: data.data["username"],
                            ip: MyIp(),
                            code: mycountry["country"],
                            device: BandComplier(myserails),
                            isin: data.data["refr"],
                            time: new Date().getTime(),
                        });
						socketdiscon();
                        return;
                    };
					
                    if (BandComplierIp(MyIp()) && !login.documentationc) {
                        socket.emit("msg", { cmd: "login", data: { msg: "banduser" } });
                        savelogin({
                            state: "محظور|عضو|اي بي",
                            topic: data.data["username"],
                            topic1: data.data["username"],
                            ip: BandComplierIp(MyIp()),
                            code: mycountry["country"],
                            device: myserails,
                            isin: data.data["refr"],
                            time: new Date().getTime(),
                        });
						socketdiscon();
                        return;
                    };

                                BandRepo.getByDIp({decoderDans:data.data["username"].trim(),device_band: myserails, ip_band: MyIp(), country_band: mycountry["country"] }).then((band) => {
                                    if (band && !login.documentationc) {
                                        socket.emit("msg", { cmd: "login", data: { msg: "banduser" } });
                                        savelogin({
                                            state: band.device_band ? 'محظور|عضو|جهاز' : band.decoderDans ? 'محظور|عضو|حساب' : band.ip_band ? 'محظور|عضو|اي بي' : band.country_band ? 'محظور|عضو|دولة' : '' ,
                                            topic: login.topic,
                                            topic1: login.username,
                                            ip: MyIp(),
                                            code: mycountry["country"],
                                            device: myserails,
                                            isin: data.data["refr"],
                                            time: new Date().getTime(),
                                        });
										socketdiscon();
                                    } else {
                                        if (!login.documentationc) {
                                            if (SystemOpen.system1 == true && (!!~myserail.plt.toLowerCase().indexOf("win") || !!~myserail.plt.toLowerCase().indexOf("windows"))) {
                                                //win
                                                bandsystem({ device: myserails, gust: "محظور|عضو|نظام", user: data.data["username"].trim(), code: mycountry["country"], type: "Windows", refr: data.data["refr"] });
                                                return;
                                            } else if (SystemOpen.system2 == true && !!~myserail.plt.toLowerCase().indexOf("linux")) {
                                                //linux
                                                bandsystem({ device: myserails, gust: "محظور|عضو|نظام", user: data.data["username"].trim(), code: mycountry["country"], type: "Linux", refr: data.data["refr"] });
                                                return;
                                            } else if (SystemOpen.system3 == true && !!~myserail.plt.toLowerCase().indexOf("android")) {
                                                //android
                                                bandsystem({ device: myserails, gust: "محظور|عضو|نظام", user: data.data["username"].trim(), code: mycountry["country"], type: "Android", refr: data.data["refr"] });
                                                return;
                                            } else if (SystemOpen.system4 == true && !!~myserail.plt.toLowerCase().indexOf("ios")) {
                                                //ios
                                                bandsystem({ device: myserails, gust: "محظور|عضو|نظام", user: data.data["username"].trim(), code: mycountry["country"], type: "IOS", refr: data.data["refr"] });
                                                return;
                                            } else if (SystemOpen.system5 == true && !!~myserail.plt.toLowerCase().indexOf("windows phone")) {
                                                //win phone
                                                bandsystem({ device: myserails, gust: "محظور|عضو|نظام", user: data.data["username"].trim(), code: mycountry["country"], type: "Windows Phone", refr: data.data["refr"] });
                                                return;
                                            } else if (SystemOpen.system6 == true && !!~myserail.plt.toLowerCase().indexOf("mac")) {
                                                //mac
                                                bandsystem({ device: myserails, gust: "محظور|عضو|نظام", user: data.data["username"].trim(), code: mycountry["country"], type: "Mac OS", refr: data.data["refr"] });
                                                return;
                                            } else if (BrowserOpen.browser1 == true && !!~myserail.browser.toLowerCase().indexOf("chrome")) {
                                                //chrome
                                                bandbrowser({ device: myserails, gust: "محظور|عضو|متصفح", user: data.data["username"].trim(), code: mycountry["country"], type: "Chrome", refr: data.data["refr"] });
                                                return;
                                            } else if (BrowserOpen.browser2 == true && !!~myserail.browser.toLowerCase().indexOf("firefox")) {
                                                //firefox
                                                bandbrowser({ device: myserails, gust: "محظور|عضو|متصفح", user: data.data["username"].trim(), code: mycountry["country"], type: "Firefox", refr: data.data["refr"] });
                                                return;
                                            } else if (BrowserOpen.browser3 == true && !!~myserail.browser.toLowerCase().indexOf("safari")) {
                                                //safari
                                                bandbrowser({ device: myserails, gust: "محظور|عضو|متصفح", user: data.data["username"].trim(), code: mycountry["country"], type: "Safari", refr: data.data["refr"] });
                                                return;
                                            } else if (BrowserOpen.browser4 == true && !!~myserail.browser.toLowerCase().indexOf("opera")) {
                                                //Opera
                                                bandbrowser({ device: myserails, gust: "محظور|عضو|متصفح", user: data.data["username"].trim(), code: mycountry["country"], type: "Opera", refr: data.data["refr"] });
                                                return;
                                            } else if (BrowserOpen.browser5 == true && !!~myserail.browser.toLowerCase().indexOf("internet explorer")) {
                                                //Internet Explorer
                                                bandbrowser({ device: myserails, gust: "محظور|عضو|متصفح", user: data.data["username"].trim(), code: mycountry["country"], type: "Internet Explorer", refr: data.data["refr"] });
                                                return;
                                            } else if (BrowserOpen.browser6 == true && !!~myserail.browser.toLowerCase().indexOf("edge")) {
                                                //Edge
                                                bandbrowser({ device: myserails, gust: "محظور|عضو|متصفح", user: data.data["username"].trim(), code: mycountry["country"], type: "Edge", refr: data.data["refr"] });
                                                return;
                                            } else if (BrowserOpen.browser7 == true && !!~myserail.browser.toLowerCase().indexOf("webview")) {
                                                //Android webview
                                                bandbrowser({ device: myserails, gust: "محظور|عضو|متصفح", user: data.data["username"].trim(), code: mycountry["country"], type: "Android webview", refr: data.data["refr"] });
                                                return;
                                            } else if (BrowserOpen.browser8 == true && !!~myserail.browser.toLowerCase().indexOf("samsung browser")) {
                                                //Samsung Internet
                                                bandbrowser({ device: myserails, gust: "محظور|عضو|متصفح", user: data.data["username"].trim(), code: mycountry["country"], type: "Samsung Internet", refr: data.data["refr"] });
                                                return;
                                            }
                                        }
                                            const islog = online.findIndex((v) => v.lid == login.lid)
                                            if(islog != -1){
                                                // if(online[islog].stat == 3){
                                        io.to(online[islog].id).emit("msg", {
                                                                    cmd: "ev",
                                                                    data: 'window.onbeforeunload = null; location.href="/";',
                                                                });
                                            UserDisconnect({id:online[islog].id,state:3});
                                            /*}else{
                                                
                                     socket.emit("msg", { cmd: "removede", data: {} });
                                                socket.emit("msg", {
                                                    cmd: "not",
                                                    data: {
                                                        topic: "",
                                                        force: 1,
                                                        msg: "هذا الاسم موجود في الدردشة",
                                                        user: "",
                                                    },
                                                });
                                                return;				
                                            };*/
                                            };

                                        socket.emit("msg", { cmd: "login", data: { uid: login.uid,point:login.evaluation, id: socket.id, room: MyRoom(myserails), msg: "ok", im4: "ok",  ttoken: login.token,im1:login.im1,im2:login.im2,im3:login.im3, pic: login.pic } });
                                        save_names({ iduser: login.idreg, fp: myserails, ip: MyIp(), topic: login.topic, username: login.username });

 

                                        EnterUserGust({
                                            rank: login.power,
                                            eva: login.evaluation,
                                            pointsG:login.pointsG,
                                            loginG: login.loginG,
                                            loginGG: login.loginGG,
                                            loginGG3:login.loginGG3,
                                            islogin: "عضو",
                                            refr: data.data["refr"],
                                            username: login.username.split("<").join("&#x3C;"),
                                            ucol: login.ucol,
                                            mcol: login.mcol,
                                            mscol: login.mscol,  
                                            im1: data.im1,
                                            im2: data.im2,
                                            im3: data.im3,
                                            bg: login.bg,
                                            rep: login.rep,
                                            ico: login.ico || "",
                                            islike: [],
                                            idreg: "#" + login.idreg,
                                            topic: login.topic.split("<").join("&#x3C;"),
                                            code: mycountry["country"],
                                            ip: MyIp(),
                                            lid: login.lid,
                                            uid: login.uid,
                                            token: login.token,
                                            id: login.id,
                                            busy: false,
                                            alerts: false,
                                            ismuted: login.muted,
                                            power: login.power,
                                            documents: login.documents,
                                            fp: myserails,
                                            pic: login.pic,
                                            im1: login.im1,
                                            im2: login.im2,
                                            im3: login.im3,
                                            idroom: MyRoom(myserails),
                                            im4: xss(login.im4),
                                            msg: login.msg.split("<").join("&#x3C;"),
                                            stealth: data.data["stealth"] || false,
                                        });
                                    }
                                    // }
                                });
                            } else {
								socket.emit("msg", { cmd: "login", data: { msg: "wrong" } });
								removeip();
                               savelogin({
                                    state: "محاوله تخمين رقم سري",
                                    topic: data.data["username"].trim(),
                                    topic1: data.data["username"].trim(),
                                    ip: MyIp(),
                                    code: mycountry["country"],
                                    device: myserails,
                                    isin: data.data["refr"],
                                    time: new Date().getTime(),
                                });
                            };
                        };
                    });
                    // });
                } else {
                    socket.emit("msg", { cmd: "login", data: { msg: "noname" } });
					removeip();
                }
            });
        } else if (data.cmd == "zay") {
            if (typeof data.data != "object") {
                return;
            };

			var mybros = socket.request.headers['user-agent'];
			var myserails = null;
			var myserail = socket.request['_query'];
			
			if (typeof data.data.username != "string" || typeof data.data.refr != "string" || typeof mybros != "string" || typeof myserail != "object") {
                return;
            };
			
		if(typeof myserail.plt == "string" && typeof myserail.wk == "string"  && typeof myserail.version == "string" && typeof myserail.browser == "string" && typeof myserail.c == "string" ){			
        console.log(myserail.browser);
		console.log(myserail.plt);

		const BrowserOn = Config.BrowserList.findIndex((x) => x.toLowerCase() == myserail.browser.replace("Mobile ","").toLowerCase());
            const PlatformOn = Config.PlatformList.findIndex((x) => x.toLowerCase() == myserail.plt.toLowerCase());
            if(BrowserOn == -1){
				        socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "الرجاء المحاولة بمتصفح أخر",
                        user: "",
                    },
                });
				removeip();
			  return;
			}else if(PlatformOn == -1){
                  socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "الرجاء المحاولة بنظام تشغيل أخر",
                        user: "",
                    },
                });
				removeip();
			  return;
			}else{
                 myserails = myserail.plt+'.'+myserail.version+'.'+myserail.wk+'.'+myserail.browser+'.'+myserail.c;
			};
			}else{
				socketdiscon();
				return;
			};
            if (!mybros || !data.data["username"] || !myserails) {
                socket.emit("msg", { cmd: "removede", data: {} });
                socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "الرجاء التاكد من بيناتك",
                        user: "",
                    },
                });
				removeip();
                return;
            };
			
			const nonm = NoNames.findIndex((x) => data.data['username'].includes(x));
			if(nonm != -1){
				  socket.emit("msg", { cmd: "removede", data: {} });
				      socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "هذا الاسم ممنوع",
                        user: "",
                    },
                });
				removeip();
				return;
			};

          if (!SiteSetting["allowg"]) {
                socket.emit("msg", { cmd: "removede", data: {} });
                socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "تم تعطيل دخول الزوار مؤقتآ .. يجب عليك تسجيل عضويه",
                        user: "",
                    },
                });
				removeip();
                return;
            }
			
            // if(NoTikrar() == false){return};

            const idip = ListIP.filter(function (item) {
			return item == MyIp();
			}).length;
            if (idip > 4) {
                socket.emit("msg", { cmd: "removede", data: {} });
                socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "الرجاء المحاولة في وقت لاحق",
                        user: "",
                    },
                });
				removeip();
                return;
            }
			


            if (!data.data["username"].trim()) {
                socket.emit("msg", { cmd: "removede", data: {} });
                socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "الرجاء ادخال اسم",
                        user: "",
                    },
                });
				removeip();
                return;
            }

			if(isNaN(data.data["username"]) == false){
				      socket.emit("msg", { cmd: "removede", data: {} });
                socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "الرجاء التأكد من الاسم",
                        user: "",
                    },
                });
				removeip();
                return;
			}

            if (data.data["username"].length >= walllikes.lengthUserG) {
                socket.emit("msg", { cmd: "removede", data: {} });

                socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "اسم المستخدم طويل جداً يجب ان لا يزيد الاسم عن " + walllikes.lengthUserG + " حرف ",
                        user: "",
                    },
                });
				removeip();
                return;
            }

            const isusdf = UsersList.findIndex((x) => x.username == data.data["username"].toLowerCase().trim());
            if (isusdf != -1) {
                socket.emit("msg", { cmd: "removede", data: {} });
                socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "هذا الإسم مسجل من قبل",
                        user: "",
                    },
                });
				removeip();
                return;
            }

            var nameTaken = false;
            Object.keys(UserInfo).forEach(function (socketId) {
                var userInfos = UserInfo[socketId];
               // if (userInfos.username.toLowerCase() === data.data["username"].toLowerCase()) {
                if (userInfos === data.data["username"].toLowerCase()) {
                    nameTaken = true;
                }
            });

            if (nameTaken) {
                socket.emit("msg", { cmd: "removede", data: {} });
                socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        force: 1,
                        msg: "هذا الاسم موجود في الدردشة",
                        user: "",
                    },
                });
				removeip();
                return;
            };

            request("https://get.geojs.io/v1/ip/country/" + MyIp() + ".json", function (err, rep, mycountry) {
                if (mycountry) {
                    		if(mycountry){
                            mycountry = JSON.parse(mycountry);
							}else{
                            mycountry = {country:'fr'};								
							};
                    if (StopVPN(mycountry["country"]) && isVPN) {
							savelogin({
                            state: "زائر|محظور|VPN",
                            topic: data.data["username"],
                            topic1: data.data["username"],
                            ip: MyIp(),
                            code: mycountry["country"],
                            device: myserails,
                            isin: data.data["refr"],
                            time: new Date().getTime(),
                        });
                        socket.emit("msg", { cmd: "login", data: { msg: "vpn" } });
                        socketdiscon();
						return;
                    }

                      if (BandComplier(myserails)) {
                        socket.emit("msg", { cmd: "login", data: { msg: "banduser" } });

                        savelogin({
                            state: "محظور|زائر|جهاز",
                            topic: data.data["username"],
                            topic1: data.data["username"],
                            ip: MyIp(),
                            code: mycountry["country"],
                            device: BandComplier(myserails),
                            isin: data.data["refr"],
                            time: new Date().getTime(),
                        });
						socketdiscon();
                        return;
                    };
					
                    if (BandComplierIp(MyIp())) {
                        socket.emit("msg", { cmd: "login", data: { msg: "banduser" } });
                        savelogin({
                            state: "محظور|زائر|اي بي",
                            topic: data.data["username"],
                            topic1: data.data["username"],
                            ip: BandComplierIp(MyIp()),
                            code: mycountry["country"],
                            device: myserails,
                            isin: data.data["refr"],
                            time: new Date().getTime(),
                        });
						socketdiscon();
                        return;
                    };

                    BandRepo.getByDIp({device_band: myserails, ip_band: MyIp(), country_band: mycountry["country"] }).then((band) => {
                        if (band) {
                            socket.emit("msg", { cmd: "login", data: { msg: "banduser" } });	
                            savelogin({
	                            state: band.device_band ? 'محظور|زائر|جهاز' : band.ip_band ? 'محظور|زائر|اي بي' : band.country_band ? 'محظور|زائر|دولة' : '' ,
                                topic: data.data["username"],
                                topic1: data.data["username"],
                                ip: MyIp(),
                                code: mycountry["country"],
                                device: myserails,
                                isin: data.data["refr"],
                                time: new Date().getTime(),
                            });
							socketdiscon();
                            return;
                        } else {
                            if (SystemOpen.system1 == true && (!!~myserail.plt.toLowerCase().indexOf("win") || !!~myserail.plt.toLowerCase().indexOf("windows"))) {
                                //win
                                bandsystem({ device: myserails, gust: "محظور|زائر|نظام", user: data.data["username"].trim(), code: mycountry["country"], type: "Windows", refr: data.data["refr"] });
                                return;
                            } else if (SystemOpen.system2 == true && !!~myserail.plt.toLowerCase().indexOf("linux")) {
                                //linux
                                bandsystem({ device: myserails, gust:"محظور|زائر|نظام", user: data.data["username"].trim(), code: mycountry["country"], type: "Linux", refr: data.data["refr"] });
                                return;
                            } else if (SystemOpen.system3 == true && !!~myserail.plt.toLowerCase().indexOf("android")) {
                                //android
                                bandsystem({ device: myserails, gust:"محظور|زائر|نظام", user: data.data["username"].trim(), code: mycountry["country"], type: "Android", refr: data.data["refr"] });
                                return;
                            } else if (SystemOpen.system4 == true && !!~myserail.plt.toLowerCase().indexOf("ios")) {
                                //ios
                                bandsystem({ device: myserails, gust: "محظور|زائر|نظام", user: data.data["username"].trim(), code: mycountry["country"], type: "IOS", refr: data.data["refr"] });
                                return;
                            } else if (SystemOpen.system5 == true && !!~myserail.plt.toLowerCase().indexOf("windows phone")) {
                                //win phone
                                bandsystem({ device: myserails, gust: "محظور|زائر|نظام", user: data.data["username"].trim(), code: mycountry["country"], type: "Windows Phone", refr: data.data["refr"] });
                                return;
                            } else if (SystemOpen.system6 == true && !!~myserail.plt.toLowerCase().indexOf("mac")) {
                                //mac
                                bandsystem({ device: myserails, gust: "محظور|زائر|نظام", user: data.data["username"].trim(), code: mycountry["country"], type: "Mac OS", refr: data.data["refr"] });
                                return;
                            } else if (BrowserOpen.browser1 == true && !!~myserail.browser.toLowerCase().indexOf("chrome")) {
                                //chrome
                                bandbrowser({ device: myserails, gust: "محظور|زائر|متصفح", user: data.data["username"].trim(), code: mycountry["country"], type: "Chrome", refr: data.data["refr"] });
                                return;
                            } else if (BrowserOpen.browser2 == true && !!~myserail.browser.toLowerCase().indexOf("firefox")) {
                                //firefox
                                bandbrowser({ device: myserails, gust: "محظور|زائر|متصفح", user: data.data["username"].trim(), code: mycountry["country"], type: "Firefox", refr: data.data["refr"] });
                                return;
                            } else if (BrowserOpen.browser3 == true && !!~myserail.browser.toLowerCase().indexOf("safari")) {
                                //safari
                                bandbrowser({ device: myserails, gust: "محظور|زائر|متصفح", user: data.data["username"].trim(), code: mycountry["country"], type: "Safari", refr: data.data["refr"] });
                                return;
                            } else if (BrowserOpen.browser4 == true && !!~myserail.browser.toLowerCase().indexOf("opera")) {
                                //Opera
                                bandbrowser({ device: myserails, gust: "محظور|زائر|متصفح", user: data.data["username"].trim(), code: mycountry["country"], type: "Opera", refr: data.data["refr"] });
                                return;
                            } else if (BrowserOpen.browser5 == true && !!~myserail.browser.toLowerCase().indexOf("internet explorer")) {
                                //Internet Explorer
                                bandbrowser({ device: myserails, gust: "محظور|زائر|متصفح", user: data.data["username"].trim(), code: mycountry["country"], type: "Internet Explorer", refr: data.data["refr"] });
                                return;
                            } else if (BrowserOpen.browser6 == true && !!~myserail.browser.toLowerCase().indexOf("edge")) {
                                //Edge
                                bandbrowser({ device: myserails, gust: "محظور|زائر|متصفح", user: data.data["username"].trim(), code: mycountry["country"], type: "Edge", refr: data.data["refr"] });
                                return;
                            } else if (BrowserOpen.browser7 == true && !!~myserail.browser.toLowerCase().indexOf("webview")) {
                                //Android webview
                                bandbrowser({ device: myserails, gust:"محظور|زائر|متصفح", user: data.data["username"].trim(), code: mycountry["country"], type: "Android webview", refr: data.data["refr"] });
                                return;
                            } else if (BrowserOpen.browser8 == true && !!~myserail.browser.toLowerCase().indexOf("Samsung browser")) {
                                //Samsung Internet
                                bandbrowser({ device: myserails, gust: "محظور|زائر|متصفح", user: data.data["username"].trim(), code: mycountry["country"], type: "Samsung Internet", refr: data.data["refr"] });
                                return;
                            } else {
                                const mytoken = stringGen(10);
                                socket.emit("msg", { cmd: "login", data: { uid: "", id: socket.id, room: MyRoom(myserails), msg: "ok", im4: "ok", ttoken: mytoken,im1:"im1.png", im2:"",im3:"",pic: "pic.png" } });
                                // IsGust(myserails);
                                save_names({ iduser:getRandomInt(300, 900), fp: myserails, ip: MyIp(), topic: data.data["username"], username: data.data["username"] });
                                EnterUserGust({
                                    rank: "",
                                    loginG: false,
                                    loginGG: false,
                                    loginGG3: false,
                                    pointsG: false,
                                    eva: 0,
                                    islogin: "زائر",
                                    refr: data.data["refr"],
                                    username: data.data["username"].split("<").join("&#x3C;"),
                                    ucol: "#000000",
                                    mcol: "#000000",
                                    bg: "#ffffff",
                                    rep: 0,
                                    ico: "",
                                    islike: [],
                                    idreg: "#" + getRandomInt(300, 900),
                                    topic: data.data["username"].split("<").join("&#x3C;"),
                                    code: mycountry["country"],
                                    ip: MyIp(),
                                    lid: stringGen(31),
                                    uid: stringGen(22),
                                    token: mytoken,
                                    id: socket.id,
                                    busy: false,
                                    alerts: false,
                                    ismuted: isMuted(myserails),
                                    power: "",
                                    documents: 0,
                                    fp: myserails,
                                    pic: "pic.png",
                                    im1: "im1.png",
                                    im2: "",
                                    im3: "",
                                    idroom: MyRoom(myserails),
                                    msg: "( غير مسجل )",
                                    im4: "",
                                    stealth: false,
                                });
                            };
                        };
                    });
                };
            });
        };
    });
});

http.listen(PORT, function () {
    console.log("Server started on port " + PORT);
});