class GetBand {
    constructor(dao) {
        this.dao = dao;
    }
	
    createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS band (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      name_band VARCHAR(255),
      type VARCHAR(255),
      deccode VARCHAR(255),
      decoderDans VARCHAR(255),
      device_band VARCHAR(255),
      ip_band VARCHAR(255),
      country_band VARCHAR(2),
      date VARCHAR(255) DEFAULT "دائم")`;
        return this.dao.run(sql);
    }

    create(data) {
        if (data) {
            return this.dao.run("INSERT INTO band (name_band,type,deccode,decoderDans,device_band,ip_band,date,country_band) VALUES (?,?,?,?,?,?,?,?)", 
			[data.name_band,data.type,data.deccode,data.decoderDans,data.device_band,data.ip_band,data.date,data.country_band]);
        }
    }

	update(data) {
        if (data) {
            return this.dao.run(`UPDATE band SET deccode = ? , decoderDans = ? WHERE id = ?`, [data.code,data.decoderDans, data.id]);
        }
    }
	
	
    delete(id) {
        return this.dao.run(`DELETE FROM band WHERE id = ?`, [id]);
    }


    getById(id) {
        return this.dao.get(`SELECT * FROM band WHERE id = ?`, [id]);
    }
	
	getByDIp(data) {
		  if(data){
        return this.dao.get(`SELECT * FROM band WHERE device_band = ? OR ip_band = ? OR country_band = ? OR decoderDans = ?`, [data.device_band,data.ip_band,data.country_band,data.decoderDans]);
		  };
    }
	
	  getByDIps(data) {
		  if(data.device_band.trim()){
        return this.dao.get(`SELECT * FROM band WHERE device_band = ?`, [data.device_band]);
		  }else if(data.ip_band.trim()){
        return this.dao.get(`SELECT * FROM band WHERE ip_band = ?`, [data.ip_band]);
		  }else if(data.country_band.trim()){
        return this.dao.get(`SELECT * FROM band WHERE country_band = ?`, [data.country_band]);
	  }else if(data.decoderDans.trim()){
        return this.dao.get(`SELECT * FROM band WHERE decoderDans = ?`, [data.decoderDans]);
		  };
    }
	

    getAll() {
        return this.dao.all(`SELECT * FROM band  ORDER BY date DESC`);
    }
}

module.exports = GetBand;
