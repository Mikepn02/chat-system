class GetCuts {
    constructor(dao) {
        this.dao = dao;
    }

    createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS cuts (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      text1 VARCHAR(255),
      text2 VARCHAR(255))`;
        return this.dao.run(sql);
    }

    create(data) {
        if (data) {
            return this.dao.run("INSERT INTO cuts (text1,text2) VALUES (?,?)", [data.text1, data.text2]);
        }
    }

    delete(id) {
        return this.dao.run(`DELETE FROM cuts WHERE id = ?`, [id]);
    }


    getById(id) {
        return this.dao.get(`SELECT * FROM cuts WHERE id = ?`, [id]);
    }
	

    getAll() {
        return this.dao.all(`SELECT * FROM cuts`);
    }
}

module.exports = GetCuts;
