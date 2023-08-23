class GetPowers {
    constructor(dao) {
        this.dao = dao;
    }

    createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS powers (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
	  powers TEXT
      )`;
        return this.dao.run(sql);
    }

    create(data) {
        if (data) {
            return this.dao.run("INSERT INTO powers (powers) VALUES (?)", 
			[data]);
        }
    }
	
	
	updatePower(data) {
        if (data) {
            return this.dao.run(`UPDATE powers SET powers = ? WHERE id = ?`, [data.power,data.id]);
        }
    }

    delete(id) {
        return this.dao.run(`DELETE FROM powers WHERE id = ?`, [id]);
    }

    getById(id) {
        return this.dao.get(`SELECT * FROM powers WHERE id = ?`, [id]);
    }

    getAll() {
        return this.dao.all(`SELECT * FROM powers`);
    }
}

module.exports = GetPowers;
