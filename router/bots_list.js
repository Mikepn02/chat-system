class GetBots {
    constructor(dao) {
        this.dao = dao;
    }

    createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS bots (
      idreg INTEGER PRIMARY KEY AUTO_INCREMENT,
      msg VARCHAR(255) DEFAULT "(عضو جديد)",
      pic VARCHAR(255) DEFAULT "pic.png",
	  im1 VARCHAR(255) DEFAULT "im1.png",
      power VARCHAR(255) DEFAULT "",
      country VARCHAR(255) DEFAULT "",
      room VARCHAR(255) DEFAULT "",
      ip VARCHAR(255) DEFAULT "",
      id VARCHAR(255) DEFAULT "",
      stat INT DEFAULT 0,
      topic VARCHAR(255) DEFAULT "")`;
        return this.dao.run(sql);
    }
	

 create(data) {
        if (data) {
            return this.dao.run("INSERT INTO bots (msg,pic,im1,power,country,room,ip,id,stat,topic) VALUES (?,?,?,?,?,?,?,?,?)", [data.msg,data.pic,data.im1,data.power,data.country, data.room,data.ip,data.id,data.stat, data.topic]);
        }
 }
 
    delete(id) {
        return this.dao.run(`DELETE FROM bots WHERE id = ?`, [id]);
    }

    getById(id) {
        return this.dao.get(`SELECT * FROM bots WHERE id = ?`, [id]);
    }
	
	
    getAll() {
        return this.dao.all(`SELECT * FROM bots`);
    }	

}

module.exports = GetBots;
