class GetHistLetter {
    constructor(dao) {
        this.dao = dao;
    }

    createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS histletter (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      ip VARCHAR(255),
      msg VARCHAR(255),
      topic VARCHAR(255),
      v VARCHAR(255))`;
        return this.dao.run(sql);
    }

    create(data) {
        if (data) {
            return this.dao.run("INSERT INTO histletter (ip,msg,topic,v) VALUES (?,?,?,?)", [data.ip, data.msg,data.topic,data.v]);
        }
    }

    delete(id) {
        return this.dao.run(`DELETE FROM histletter WHERE id = ?`, [id]);
    }


    getById(id) {
        return this.dao.get(`SELECT * FROM histletter WHERE id = ?`, [id]);
    }
	
    deleteall() {
        return this.dao.run(`DELETE FROM histletter`)
    }


    getAll() {
        return this.dao.all(`SELECT * FROM histletter`);
    }
	
}

module.exports = GetHistLetter;
