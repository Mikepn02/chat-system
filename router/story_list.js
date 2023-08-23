
	
	class GetStory {
    constructor(dao) {
        this.dao = dao
    }
	
	
	

	
	
	
	
	



createStoryTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS story (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      owner VARCHAR(255),
      topic VARCHAR(255),
      pic VARCHAR(255),
      views TEXT DEFAULT (''),
	  type VARCHAR(255),
	  time INTEGER,
	  url VARCHAR(255),
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
        return this.dao.run(sql)
};

createStory(data) {
	if(typeof data == 'object'){
		return this.dao.run(
		'INSERT INTO story (owner,topic,pic,type,time,url) VALUES (?,?,?,?,?,?)',
		[data['owner'],data['topic'],data['pic'],data['type'],data['time'],data['url']]);
	};
};
	


	
	
	deleteOldStories() {
        return this.dao.all(`DELETE FROM story WHERE createdAt <= date('now',' -1 day')`)
    }
	
	deleteStoryById(id) {
        return this.dao.run(
                `DELETE FROM story WHERE id = ?`,
            [id]
        )
    }
	
	getAllStories() {
        return this.dao.all(`SELECT * FROM story`)
    }
	
	
	 getStoryById(id) {
        return this.dao.run(
                `DELETE FROM story WHERE id = ?`,
            [id]
        )
    }

	
		updateWatch(data) {
        if (data) {
            return this.dao.run(`UPDATE story SET watch = ? WHERE bid = ?`, [data.watch,data.bid]);
        }
    }
	
	
	updateStoryTime(data) {
        if (data) {
            return this.dao.run(`UPDATE story SET createdAt = DATETIME(createdAt, '+180 minutes') WHERE bid = ?`, [data]);
        }
    }

    
    getAllStories() {
        return this.dao.all(`SELECT * FROM story`)
    }

}


module.exports = GetStory;