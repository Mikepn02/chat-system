class GetLogs {
    constructor(dao) {
        this.dao = dao
    }
	
    createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      state VARCHAR(255),
      topic VARCHAR(255),
      username VARCHAR(255),
      ip VARCHAR(255),
      code VARCHAR(255),
      device VARCHAR(255) DEFAULT 'en',
      isin VARCHAR(255),
      time TEXT)`;
        return this.dao.run(sql)
    }

    create(data) {
		if(data){
        return this.dao.run(
            'INSERT INTO logs (state,topic,username,ip,code,device,isin,time) VALUES (?,?,?,?,?,?,?,?)',
            [data.state,data.topic,data.username,data.ip,data.code,data.device,data.isin,data.time]);
		};
    }

   
    delete(id) {
        return this.dao.run(
                `DELETE FROM logs WHERE id = ?`,
            [id]
        )
    }
	
	   deleteall() {
        return this.dao.run(`DELETE FROM logs`)
    }
	
	  updateById(data) {
        if (data) {
            return this.dao.run(`UPDATE logs SET time = ?,device = ? WHERE id = ?`, [data.time, data.device,data.id]);
        }
    }

    getByIp(data) {
		if(data){
        return this.dao.get(
                `SELECT * FROM logs WHERE ip = ? AND state = ? AND topic = ? AND username = ?`,
            [data.ip,data.state,data.topic,data.username]);
		};
    }

    getAll() {
        return this.dao.all(`SELECT * FROM logs ORDER BY time DESC`);
    }
	
	
	  getBy(data) {
		  if(data){
        return this.dao.all("SELECT * FROM logs WHERE ip LIKE ? OR device LIKE ? OR topic LIKE ? OR username LIKE ?",['%'+data.ip+'%','%'+data.device+'%','%'+data.topic+'%','%'+data.username+'%']);
		  };
    }

}

module.exports = GetLogs;