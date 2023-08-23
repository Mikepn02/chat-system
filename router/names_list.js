class GetNames {
    constructor(dao) {
        this.dao = dao
    }
	

    createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS names (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      iduser VARCHAR(255),
      fp VARCHAR(255),
      ip VARCHAR(255),
      topic VARCHAR(255),
      username VARCHAR(255))`;
        return this.dao.run(sql)
    }

    create(data) {
		if(data){
        return this.dao.run(
            'INSERT INTO names (iduser,fp,ip,topic,username) VALUES (?,?,?,?,?)',
            [data.iduser,data.fp,data.ip,data.topic,data.username]);
		};
    }

   
    delete(id) {
        return this.dao.run(
                `DELETE FROM names WHERE id = ?`,
            [id]
        )
    }
	
	
		   deleteall() {
        return this.dao.run(`DELETE FROM names`)
    }


    getByIp(data) {
		if(data){
        return this.dao.get(
                `SELECT * FROM names WHERE ip = ? AND fp = ? AND topic = ? AND username = ?`,
            [data.ip,data.fp,data.topic,data.username]);
		};
    }
	
	    getByMyIp(data) {
		if(data){
        return this.dao.all(
                `SELECT * FROM names WHERE ip = ?`,
            [data]);
		};
    }

    getAll() {
        return this.dao.all(`SELECT * FROM names`)
    }

}

module.exports = GetNames;