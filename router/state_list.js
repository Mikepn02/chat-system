class GetStats {
    constructor(dao) {
        this.dao = dao
    }
	
    createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS stats (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      state VARCHAR(255),
      topic VARCHAR(255),
      username VARCHAR(255),
      room VARCHAR(255),
      ip VARCHAR(255),
      time VARCHAR(255))`;
        return this.dao.run(sql)
    }

    create(data) {
		if(data){
        return this.dao.run(
            'INSERT INTO stats (state,topic,username,room,ip,time) VALUES (?,?,?,?,?,?)',
            [data.state,data.topic,data.username,data.room,data.ip,data.time]);
		};
    }

   
    delete(id) {
        return this.dao.run(
                `DELETE FROM stats WHERE id = ?`,
            [id]
        )
    }
	
	deleteall() {
        return this.dao.run(`DELETE FROM stats`)
    }

    getById(data) {
		if(data){
        return this.dao.get(
                `SELECT * FROM stats WHERE id = ?`,
            [data]);
		};
    }

    getAll() {
        return this.dao.all(`SELECT * FROM stats ORDER BY time DESC`)
    }

}

module.exports = GetStats;