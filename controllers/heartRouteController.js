const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('hospital');


// const heartRateController = {};
db.serialize(()=> {
  db.run('CREATE TABLE IF NOT EXISTS patient (id INTEGER PRIMARY KEY ,patient_nid INTEGER,heart_rate INTEGER ,body_temperature INTEGER, patient_name TEXT , patient_frequent_sickness TEXT)');
})

module.exports.heartRateControllerGetll = (req, res) => {
  db.all('SELECT * FROM patient', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ patient: rows });
  });
};


module.exports.heartRateControllerAdd = (req, res) => {
  const { patient_nid, heart_rate, body_temperature, patient_name,patient_frequent_sickness } = req.body;
  db.run(
    'INSERT INTO patient (patient_nid, heart_rate, body_temperature, patient_name,patient_frequent_sickness) VALUES (?, ?, ?,?,?)',
    [patient_nid,heart_rate, body_temperature, patient_name,patient_frequent_sickness ],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
};


// module.exports = heartRateController;
