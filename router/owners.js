    constructor(dao) {
        this.dao = dao;
    }

    createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS owner (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
	  bars BOOLEAN DEFAULT true,
	  Vpn BOOLEAN DEFAULT false,
	  Gust TEXT,
	  datafinish DATETIME DEFAULT CURRENT_TIMESTAMP,
	  MaxRep INTEGER DEFAULT 3,
	  Tv TEXT,
	  Vistor TEXT,
	  room VARCHAR(255),
	  isbanner BOOLEAN DEFAULT false,
	  isbanner1 BOOLEAN DEFAULT false,
	  isbanner2 BOOLEAN DEFAULT false,
      isbanner3 BOOLEAN DEFAULT false,
	  rc BOOLEAN DEFAULT false,
      cooment BOOLEAN DEFAULT false,
	  offline BOOLEAN DEFAULT false)`;
      return this.dao.run(sql);
    }

    create(data) {
		if(data){
        return this.dao.run(
            'INSERT INTO owner (MaxRep,Tv,Gust,datafinish,Vistor,bars,isbanner,rc,cooment,offline,room) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
            [3,'','',new Date(),'',data.bars,false,true,data.cooment,data.offline,'D8D8A9A9C0']);
		};
    }
	
	

DeleteDatabase(){
	this.dao.DeleteTable();
};

ExportDb(data){
 this.dao.ExportDatabase(data);
};
	
CreateDatabase(){
	this.dao.DatabaseTable();
};
	
	update(data) {
        if (data) {
            return this.dao.run(`UPDATE owner SET bars = ? WHERE id = ?`, [data.bars,data.id]);
        }
    }

	updateBann(data) {
        if (data) {
            return this.dao.run(`UPDATE owner SET isbanner = ? WHERE id = ?`, [data.bnr,data.id]);
        }
    }
	updateBann1(data) {
        if (data) {
            return this.dao.run(`UPDATE owner SET isbanner1 = ? WHERE id = ?`, [data.bnr1,data.id]);
        }
    }
	

	updateBann2(data) {
        if (data) {
            return this.dao.run(`UPDATE owner SET isbanner2 = ? WHERE id = ?`, [data.bnr2,data.id]);
        }
    }
	
	updateBann3(data) {
        if (data) {
            return this.dao.run(`UPDATE owner SET isbanner3 = ? WHERE id = ?`, [data.bnr3,data.id]);
        }
    }
	
	
		updateBann4(data) {
        if (data) {
            return this.dao.run(`UPDATE owner SET isbanner4 = ? WHERE id = ?`, [data.bnr4,data.id]);
        }
    }
	
	
	updateRc(data) {
        if (data) {
            return this.dao.run(`UPDATE owner SET rc = ? WHERE id = ?`, [data.rc,data.id]);
        }
    }
	updateCom(data) {
        if (data) {
            return this.dao.run(`UPDATE owner SET cooment = ? WHERE id = ?`, [data.cooment,data.id]);
        }
    }

	updateTF(data) {
        if (data) {
            return this.dao.run(`UPDATE owner SET datafinish = ? WHERE id = ?`, [data.time,data.id]);
        }
    }
	
	updateGust(data) {
        if (data) {
            return this.dao.run(`UPDATE owner SET Gust = ? WHERE id = ?`, [data.gust,data.id]);
        }
    }
		
		
	updateRoom(data) {
        if (data) {
            return this.dao.run(`UPDATE owner SET room = ? WHERE id = ?`, [data.room,data.id]);
        }
    }
	
	
	updateMaxRep(data) {
        if (data) {
            return this.dao.run(`UPDATE owner SET MaxRep = ? WHERE id = ?`, [data.max,data.id]);
        }
    }
	
		updateVPN(data) {
        if (data) {
            return this.dao.run(`UPDATE owner SET Vpn = ? WHERE id = ?`, [data.vpn,data.id]);
        }
    }
	
	updateVistor(data) {
        if (data) {
            return this.dao.run(`UPDATE owner SET Vistor = ? WHERE id = ?`, [data.vistor,data.id]);
        }
    }	
	
	updateTv(data) {
        if (data) {
            return this.dao.run(`UPDATE owner SET Tv = ? WHERE id = ?`, [data.Tv,data.id]);
        }
    }
			
	updateOff(data) {
        if (data) {
            return this.dao.run(`UPDATE owner SET offline = ? WHERE id = ?`, [data.offline,data.id]);
        }
    }
	
	   getById(id) {
        return this.dao.get(
                `SELECT * FROM owner WHERE id = ?`,
            [id])
    }
	
    getAll() {
        return this.dao.all(`SELECT * FROM owner`);
    }
}


module.exports = GetOwner;
