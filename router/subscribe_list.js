class GetSub {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS sub (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      iduser VARCHAR(255),
      sub VARCHAR(255),
      topic VARCHAR(255),
      topic1 VARCHAR(255),
      timestart VARCHAR(255),
      timefinish VARCHAR(255),
      timeis VARCHAR(255))`;
        return this.dao.run(sql)
    }

    create(data) {
		if(data){
        return this.dao.run(
            'INSERT INTO sub (iduser,sub,topic,topic1,timestart,timefinish,timeis) VALUES (?,?,?,?,?,?,?)',
            [data.iduser,data.sub,data.topic,data.topic1,data.timestart,data.timefinish,data.timeis]);
		};
    }

   
    delete(id) {
        return this.dao.run(
                `DELETE FROM sub WHERE id = ?`,
            [id]
        )
    }
	
	  deleteiduser(id) {
        return this.dao.run(
                `DELETE FROM sub WHERE iduser = ?`,
            [id]
        )
    }
	
	 update(data) {
        if (data) {
            return this.dao.run(`UPDATE sub SET sub = ?, timestart = ?, timefinish = ?, timeis = ?  WHERE iduser = ?`, [data.sub,data.timestart,data.timefinish,data.timeis,data.iduser]);
        }
    }
	
		
   getById(id) {
        return this.dao.get(
                `SELECT * FROM sub WHERE id = ?`,
            [id]);
    }
	
	 getByIdU(id) {
        return this.dao.get(
                `SELECT * FROM sub WHERE iduser = ?`,
            [id]);
    }

    getAll() {
        return this.dao.all(`SELECT * FROM sub`)
    }

}

module.exports = GetSub;