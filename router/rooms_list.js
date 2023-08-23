class GetRooms {
  constructor(dao) {
    this.dao = dao;
  }

  // ALTER TABLE rooms ADD COLUMN rmli INTEGER DEFAULT 0 AFTER topic;
  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS rooms (
      idroom INTEGER PRIMARY KEY AUTO_INCREMENT,
      about VARCHAR(255),
      user VARCHAR(255),
      pass VARCHAR(255),
      id VARCHAR(255),
      owner VARCHAR(255),
      topic VARCHAR(255),
	    pic VARCHAR(255),
      collor VARCHAR(7) DEFAULT "#000",
	    rmli INTEGER DEFAULT 0,
      welcome VARCHAR(255),
      broadcast BOOLEAN DEFAULT false,
      deleted BOOLEAN DEFAULT false,
      needpass BOOLEAN DEFAULT false,
	  max INTEGER DEFAULT 0)`;
    return this.dao.run(sql);
  }

  create(data) {
    if (data) {
      return this.dao.run(
        "INSERT INTO rooms (id,about,user,pass,owner,topic,pic,welcome,deleted,needpass,max,rmli,broadcast,collor) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          data.id,
          data.about,
          data.user,
          data.pass,
          data.owner,
          data.topic,
          data.pic,
          data.welcome,
          data.deleted,
          data.needpass,
          data.max,
          data.rmli,
          data.broadcast,
          data.collor,
        ]
      );
    }
  }

  getAllWith() {
    return this.dao.all(
      `SELECT about,deleted,id,max,needpass,owner,pic,topic,welcome,broadcast,rmli,collor FROM rooms`
    );
  }

  delete(id) {
    return this.dao.run(`DELETE FROM rooms WHERE id = ?`, [id]);
  }

  getById(id) {
    return this.dao.get(`SELECT * FROM rooms WHERE id = ?`, [id]);
  }

  getByMId(id) {
    return this.dao.get(`SELECT * FROM rooms WHERE id = ?`, [id]);
  }

  updateRoom(data) {
    if (data) {
      return this.dao.run(
        `UPDATE rooms SET topic = ? , broadcast = ?, about = ? , welcome = ? , pass = ? ,  needpass = ? , max = ?, rmli = ? , collor = ?, pic = ? WHERE id = ?`,
        [
          data.topic,
          data.broadcast,
          data.about,
          data.welcome,
          data.pass,
          data.needpass,
          data.max,
          data.rmli,
          data.collor,
          data.pic,
          data.id,
        ]
      );
    }
  }

  updatePass(data) {
    if (data) {
      return this.dao.run(
        `UPDATE rooms SET pass = ? , needpass = ? WHERE id = ?`,
        [data.pass, data.needpass, data.id]
      );
    }
  }
  updatePic(data) {
    if (data) {
      return this.dao.run(`UPDATE rooms SET pic = ? WHERE id = ?`, [
        data.pic,
        data.id,
      ]);
    }
  }

  getByName(topic) {
    return this.dao.get(`SELECT * FROM rooms WHERE topic = ?`, [topic]);
  }

  dtl() {
    return this.dao.run(`DELETE FROM rooms`);
  }

  getAll() {
    return this.dao.all(`SELECT * FROM rooms`);
  }
}

module.exports = GetRooms;
