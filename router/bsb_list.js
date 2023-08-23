class GetBsb {
    constructor(dao) {
        this.dao = dao
    }
	
    createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS bsb (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      systems VARCHAR(255) DEFAULT '',
      browsers VARCHAR(255) DEFAULT '')`;
        return this.dao.run(sql)
    }

    create(data) {
		if(data){
        return this.dao.run(
            'INSERT INTO bsb (systems,browsers) VALUES (?,?)',
            [data.systems,data.browsers]);
		};
    }

   
    delete(id) {
        return this.dao.run(
                `DELETE FROM bsb WHERE id = ?`,
            [id]
        )
    }
	
	 updateByIdS(data) {
        if (data) {
            return this.dao.run(`UPDATE bsb SET systems = ? WHERE id = ?`, [data.systems,data.id]);
        }
    }
	
		
	 updateByIdB(data) {
        if (data) {
            return this.dao.run(`UPDATE bsb SET browsers = ? WHERE id = ?`, [data.browsers,data.id]);
        }
    }
	
   getById(id) {
        return this.dao.get(
                `SELECT * FROM bsb WHERE id = ?`,
            [id]);
    }

    getAll() {
        return this.dao.all(`SELECT * FROM bsb`)
    }

}

module.exports = GetBsb;