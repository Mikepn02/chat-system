class GetHosts {
    constructor(dao) {
        this.dao = dao;
    }

    createTable() {
     const sql = `
    CREATE TABLE IF NOT EXISTS hosts (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
	  hostname VARCHAR(255),
	  setting INTEGER
      )`;
        return this.dao.run(sql);
    }

    create(data) {
        if (data) {
            return this.dao.run("INSERT INTO hosts (hostname,setting) VALUES (?,?)", 
			[data.hostname,data.setting]);
        }
    }

    delete(id) {
        return this.dao.run(`DELETE FROM hosts WHERE setting = ?`, [id]);
    }

    getById(id) {
        return this.dao.get(`SELECT * FROM hosts WHERE id = ?`, [id]);
    }

    getAll() {
        return this.dao.all(`SELECT * FROM hosts`);
    }
}

module.exports = GetHosts;
