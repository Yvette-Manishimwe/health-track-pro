const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('hospital');


// const heartRateController = {};
db.serialize(()=> {
  db.run('CREATE TABLE IF NOT EXISTS patient (id INTEGER PRIMARY KEY ,patient_nid INTEGER,heart_rate INTEGER ,body_temperature INTEGER, patient_name string , patient_frequent_sickness string)');
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
  const {id}=req.params;
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

module.exports.heartRateControllerRemove = (req, res) => {
  const {id}=req.params;
  const { heart_rate, body_temperature, patient_name, patient_frequent_sickness,patient_nid} = req.body; 

  db.run(
    'DELETE FROM patient WHERE id = ?',
    [heart_rate, body_temperature, patient_name, patient_frequent_sickness, patient_nid],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'User information deleted successfully' });
    

    }
  );
};


module.exports.heartRateControllerUpdate = (req, res) => {
  const { heart_rate, body_temperature, patient_name, patient_frequent_sickness,patient_nid } = req.body;
  db.run(
    'UPDATE patient SET heart_rate = ?, body_temperature = ?, patient_name = ?, patient_frequent_sickness = ?, patient_nid = ? WHERE id = ?',
    [heart_rate, body_temperature, patient_name, patient_frequent_sickness, patient_nid],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'User information updated successfully' });
     
    }
  );
};



// module.exports = heartRateController;
