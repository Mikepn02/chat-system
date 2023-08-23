class GetUsers {
    constructor(dao) {
        this.dao = dao;
    }

    createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS users (
      idreg INTEGER PRIMARY KEY AUTO_INCREMENT,
      bg VARCHAR(255) DEFAULT "#FFFFFF",
      mcol VARCHAR(255) DEFAULT "#000000",
      ucol VARCHAR(255) DEFAULT "#000000",
      evaluation INT DEFAULT 0,
      ico VARCHAR(255) DEFAULT "",
      ip VARCHAR(255) DEFAULT "",
      fp VARCHAR(255) DEFAULT "",
      id VARCHAR(255),
      lid VARCHAR(255),
	  uid VARCHAR(255),
      msg VARCHAR(255) DEFAULT "(عضو جديد)",
      pic VARCHAR(255) DEFAULT "pic.png",
	  im1 VARCHAR(255) DEFAULT "im1.png",
	   im2 VARCHAR(255) DEFAULT "im2.png",
	  im3 VARCHAR(255) DEFAULT "im3.png",
      power VARCHAR(255) DEFAULT "",
      rep BIGINT DEFAULT 0,
      topic VARCHAR(255) NOT NULL,
      username VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      token VARCHAR(255) NOT NULL,
      loginG BOOLEAN DEFAULT false,
      muted BOOLEAN DEFAULT false,
      documentationc INTEGER DEFAULT 0,
	  lastssen TEXT,
	  joinuser TEXT)`;
        return this.dao.run(sql);
    }
	

    create(data) {
        if (data) {
            return this.dao.run("INSERT INTO users (documentationc,ip,fp,power,id,lid,uid,topic,username,password,token,joinuser) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [data.documentationc,data.ip,data.fp,data.power,data.id, data.lid,data.uid, data.topic, data.username, data.password, data.token,data.joinuser]);
        }
    }

    delete(id) {
        return this.dao.run(`DELETE FROM users WHERE idreg = ?`, [id]);
    }

    updateId(data) {
        if (data) {
            return this.dao.run(`UPDATE users SET ip = ? , id = ? WHERE uid = ?`, [data.ip,data.id, data.uid]);
        }
    }
	
	
	
	   updatePic(data) {
        if (data) {
            return this.dao.run(`UPDATE users SET pic = ? WHERE uid = ?`, [data.pic, data.uid]);
        }
    }	




  updatePicx(data) {
        if (data) {
            return this.dao.run(`UPDATE users SET im1 = ? WHERE uid = ?`, [data.im1, data.uid]);
        }
    }





updatePicxx(data) {
        if (data) {
            return this.dao.run(`UPDATE users SET im2 = ? WHERE uid = ?`, [data.im2, data.uid]);
        }
    }




updatePicxxx(data) {
        if (data) {
            return this.dao.run(`UPDATE users SET im3 = ? WHERE uid = ?`, [data.im3, data.uid]);
        }
    }








	updateMsg(data) {
        if (data) {
            return this.dao.run(`UPDATE users SET msg = ? WHERE uid = ?`, [data.msg, data.uid]);
        }
    }
	
	 updateIco(data) {
        if (data) {
            return this.dao.run(`UPDATE users SET ico = ? WHERE uid = ?`, [data.ico, data.uid]);
        }
    }
		   updateName(data) {
        if (data) {
            return this.dao.run(`UPDATE users SET topic = ? WHERE uid = ?`, [data.topic, data.uid]);
        }
    }
	
		   updatelike(data) {
        if (data) {
            return this.dao.run(`UPDATE users SET rep = ? , evaluation = ? WHERE uid = ?`, [data.rep,data.evaluation, data.uid]);
        }
    }		

	updatelikeI(data) {
        if (data) {
            return this.dao.run(`UPDATE users SET rep = ? WHERE idreg = ?`, [data.rep, data.idreg]);
        }
    }
	
	
	updatePoints(data) {
        if (data) {
            return this.dao.run(`UPDATE users SET rep = ? WHERE idreg = ?`, [data.evaluation, data.idreg]);
        }
    }
	
	
	updatePass(data) {
        if (data) {
            return this.dao.run(`UPDATE users SET password = ? WHERE idreg = ?`, [data.password, data.idreg]);
        }
    }	
	
	updateMute(data) {
        if (data) {
            return this.dao.run(`UPDATE users SET muted = ? WHERE idreg = ?`, [data.muted, data.idreg]);
        }
    }
	
	updatePower(data) {
        if (data) {
            return this.dao.run(`UPDATE users SET power = ? WHERE idreg = ?`, [data.power, data.idreg]);
        }
    }

  updateDL(data) {
        if (data) {
            return this.dao.run(`UPDATE users SET documentationc = ? , loginG = ? WHERE idreg = ?`, [data.documentationc,data.loginG , data.id]);
        }
    }  
	
	updatedoc(data) {
        if (data) {
            return this.dao.run(`UPDATE users SET documentationc = ? WHERE username = ?`, [data.documentationc, data.id]);
        }
    }
	
	  updateTokenAndSeen(data) {
        if (data) {
            return this.dao.run(`UPDATE users SET token = ? , lastssen = ? , ip = ? , fp = ? WHERE uid = ?`, [data.token,data.lastssen,data.ip,data.fp,data.uid]);
        }
    }
	
	
								
		updateprofile(data) {
        if (data) {
            return this.dao.run(`UPDATE users SET bg = ? , ucol = ? , topic = ? , mcol = ? , pic = ? , msg = ? WHERE uid = ?`, 
			[data.bg,data.ucol,data.topic,data.mcol,data.pic,data.msg,data.uid]
			);
        }
    }

    getById(id) {
        return this.dao.get(`SELECT * FROM users WHERE idreg = ?`, [id]);
    }
	
	    getByLid(lid) {
        return this.dao.get(`SELECT * FROM users WHERE lid = ?`, [lid]);
    }
	
	
    getByToken(token) {
        return this.dao.get(`SELECT * FROM users WHERE token = ?`, [token]);
    }

    getAccount(username, password) {
        return this.dao.get(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, password]);
    }

    getByUserName(username) {
        return this.dao.get(`SELECT * FROM users WHERE username = ?`, [username]);
    }
	
    getByTopic(topic) {
        return this.dao.get(`SELECT * FROM users WHERE topic = ?`, [topic]);
    }
	
	getByFP(fp) {
        return this.dao.get(`SELECT * FROM users WHERE ip = ?`, [fp]);
    }

    getAll() {
        return this.dao.all(`SELECT lastssen,documentationc,joinuser,loginG,username,topic,pic,rep,power,fp,id,ip,uid,idreg FROM users`);
    }
	
	dtl() {
        return this.dao.run(`DELETE FROM users`)
    }

	 getENGUTSLU10() {
        return this.dao.all(`SELECT evaluation,topic,pic FROM users ORDER BY evaluation DESC LIMIT 10`);
    }

    getBy(data) {
		if(data){
        return this.dao.all(`SELECT muted,lastssen,documentationc,evaluation,joinuser,loginG,username,topic,rep,power,fp,ip,idreg FROM users WHERE ip LIKE ? OR fp LIKE ? OR username LIKE ? OR topic lIKE ?`,['%'+data.ip+'%','%'+data.ip+'%','%'+data.ip+'%','%'+data.ip+'%']);
		};
    }
}

module.exports = GetUsers;
