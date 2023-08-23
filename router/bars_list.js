class GetBars {
    constructor(dao) {
        this.dao = dao
    }
	
	
	
    createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS bars (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
       bcc VARCHAR(2000) DEFAULT '[]',
      likes VARCHAR(2000) DEFAULT '[]',
      bg VARCHAR(255),
      bid VARCHAR(255),
      lid VARCHAR(255),
      mcol VARCHAR(255),
      msg VARCHAR(255),
      pic VARCHAR(255),
      topic VARCHAR(255),
      ucol VARCHAR(255),
      uid VARCHAR(255))`;
        return this.dao.run(sql)
    }

    create(data) {
		if(data){
        return this.dao.run(
            'INSERT INTO bars (bg,bid,lid,mcol,msg,pic,topic,ucol,uid) VALUES (?,?,?,?,?,?,?,?,?)',
            [data.bg,data.bid,data.lid,data.mcol,data.msg,data.pic,data.topic,data.ucol,data.uid]);
		};
    }

   
   	   deleteall() {
        return this.dao.run(`DELETE FROM bars`)
    }


    delete(id) {
        return this.dao.run(
                `DELETE FROM bars WHERE bid = ?`,
            [id]
        )
    }
	
	    deleteBy(data) {
        return this.dao.run(
                `DELETE FROM bars WHERE bid = ? AND lid = ?`,
            [data.id,data.lid]
        )
    }
	
	
	    deleteById(id) {
        return this.dao.run(
                `DELETE FROM bars WHERE id = ?`,
            [id]
        )
    }
	
	updateLiked(data) {
        if (data) {
            return this.dao.run(`UPDATE bars SET likes = ? WHERE bid = ?`, [data.likes,data.bid]);
        }
    }
	
		updateComment(data) {
        if (data) {
            return this.dao.run(`UPDATE bars SET bcc = ? WHERE bid = ?`, [data.bcc,data.bid]);
        }
    }

   getById(data) {
		if(data){
        return this.dao.get(
                `SELECT * FROM bars WHERE bid = ?`,
            [data]);
		};
    }

    getAll() {
        return this.dao.all(`SELECT * FROM bars`)
    }

}

module.exports = GetBars;