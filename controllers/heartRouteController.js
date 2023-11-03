const sqlite3 = require('sqlite3').verbose();
const Joi = require('joi'); 

const db = new sqlite3.Database('hospital');


// const heartRateController = {};
db.serialize(()=> {
  db.run('CREATE TABLE IF NOT EXISTS patient (id INTEGER PRIMARY KEY ,patient_nid INTEGER,heart_rate INTEGER ,body_temperature INTEGER, patient_name string , patient_frequent_sickness string,  date_time DATETIME DEFAULT CURRENT_TIMESTAMP )');
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

  const { id } = req.params;

  const schema = Joi.object({
    patient_nid: Joi.number().required(),
    heart_rate: Joi.number().required(),
    body_temperature: Joi.number().required(),
    patient_name: Joi.string().required(),
    patient_frequent_sickness: Joi.string().required(),
    // date_time: Joi.number().required(),
    
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
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
  const {id} = req.params;
  db.run(
    'DELETE FROM patient WHERE id = ?',
    [id],
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
  const {id}=req.params
  const { heart_rate, body_temperature, patient_name, patient_frequent_sickness, patient_nid } = req.body;
  db.run(
    'UPDATE patient SET heart_rate = ?, body_temperature = ?, patient_name = ?, patient_frequent_sickness = ?, patient_nid = ? WHERE id = ?',
    [heart_rate, body_temperature, patient_name, patient_frequent_sickness, patient_nid, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'User information updated successfully' });
     
    }
  );
};

module.exports.heartRateControllerGetById= (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM patient WHERE id = ?';

  db.all(sql, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!row) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    console.log(row)
    res.json({ patient: row});
  });
};

module.exports.displayChart= (req,res) =>{
  const query = 'SELECT heart_rate, body_temperature, patient_name, patient_frequent_sickness, patient_nid FROM patient';
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching data from the database');
    } else {
      res.render('index.ejs', { patient : rows} );
    
    }
  });
}



// module.exports = heartRateController;
