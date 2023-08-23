class GetIntroMsg {
    constructor(dao) {
        this.dao = dao;
    }

    createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS intromsg (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      category VARCHAR(255),
      adresse VARCHAR(255),
      msg VARCHAR(255))`;
        return this.dao.run(sql);
    }

    create(data) {
        if (data) {
            return this.dao.run("INSERT INTO intromsg (category,adresse,msg) VALUES (?,?,?)", [data.category, data.adresse,data.msg]);
        }
    }

    delete(id) {
        return this.dao.run(`DELETE FROM intromsg WHERE id = ?`, [id]);
    }


    getById(id) {
        return this.dao.get(`SELECT * FROM intromsg WHERE id = ?`, [id]);
    }
	

    getAll() {
        return this.dao.all(`SELECT * FROM intromsg`);
    }
	
	 getAllIn(data) {
		 if(data){
        return this.dao.all(`SELECT * FROM intromsg WHERE category = ?`,[data]);
		 };
    }
}

module.exports = GetIntroMsg;
