const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors'); 

const app = express();
const port = 5000;

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "password",
    port: 3306,
    database: "airport_dbms"
};

const pool = mysql.createPool(dbConfig);

app.use(cors(

));
app.use(express.json()); 
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
      const connection = await mysql.createConnection(dbConfig);
      const [rows] = await connection.execute(
          'SELECT * FROM users WHERE username = ? AND password = ?',
          [username, password]
      );
      connection.end();

      if (rows.length > 0) {
          // login successful
          res.send({ success: true });
      } else {
          // login failed
          res.send({ success: true });
      }
  } catch (err) {
      // handle error
      console.error(err);
      res.status(500).send({ success: false });
  }
});


app.get('/getTypeOfPlane', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('Select * from type_of_plane');
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/getAirportAprons', async (req, res) => { 
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM airport_apron;');
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/getAirplane', async (req, res) => { 
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM airplane;');
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/getOwner', async (req, res) => { 
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM owner;');
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getEmployee', async (req, res) => { 
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM employee;');
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/searchAirplaneByRegistration', async (req, res) => {
  try {
    const { registration_no } = req.body;

    if (!registration_no) {
      return res.status(400).json({ error: 'Registration number is required' });
    }

    const regNumber = Number(registration_no);

    const connection = await pool.getConnection();

    const [airplaneRows] = await connection.query('SELECT * FROM airplane WHERE Registration_Number = ?;', [regNumber]);

    const [ownsRows] = await connection.query('SELECT * FROM owner WHERE owner_id = ?;', airplaneRows[0].owner_id);

    if (airplaneRows.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Airplane with the provided registration number not found' });
    }

    const airplaneModel = airplaneRows[0].Model;

    const [typeOfPlaneRows] = await connection.query('SELECT * FROM type_of_plane WHERE model = ?;', [airplaneModel]);

    const [worksOnRows] = await connection.query('SELECT * FROM works_on WHERE Registration_number = ?;', [regNumber]);

    const empArray = worksOnRows.map((row) => row.Employee_ID);

    if (empArray.length === 0) {
      connection.release();
      return res.json({
        airplane: airplaneRows|| [],
        owns: ownsRows || [],
        typeOfPlane: typeOfPlaneRows || [],
        employees: [],
        airportApron: [] 
      });
    }

    const [employeeRows] = await connection.query('SELECT * FROM employee WHERE Employee_Id IN (?);', [empArray]);

    const apNumber = airplaneRows[0].Apron_number;

    const [airportApronRows] = await connection.query('SELECT * FROM airport_apron WHERE Apron_number = ?;', [apNumber]);

    connection.release();

    const response = {
      airplane: airplaneRows || [],
      owns: ownsRows || [],
      typeOfPlane: typeOfPlaneRows || [],
      employees: employeeRows,
      airportApron: airportApronRows || []
    };

    res.json(response);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put('/airplanes/:registration_number', async (req, res) => {
  const registrationNumber = req.params.registration_number;
  const { Model, Manufacturer, Apron_number, owner_id, Maintenance_Status, Last_Maintenance_Date, Purchase_date } = req.body;

  try {
    const connection = await pool.getConnection();

    const checkModelQuery = 'SELECT * FROM type_of_plane WHERE Model = ?';
    const [modelRows] = await connection.query(checkModelQuery, [Model]);
    if (modelRows.length === 0) {
      connection.release();
      return res.status(400).json({ error: 'Invalid Model provided. Model does not exist in type_of_plane table.' });
    }

    const checkApronQuery = 'SELECT * FROM airport_apron WHERE Apron_number = ?';
    const [apronRows] = await connection.query(checkApronQuery, [Apron_number]);
    if (apronRows.length === 0) {
      connection.release();
      return res.status(400).json({ error: 'Invalid Apron_number provided. Apron_number does not exist in airport_apron table.' });
    }

    const checkOwnerQuery = 'SELECT * FROM owner WHERE owner_id = ?';
    const [ownerRows] = await connection.query(checkOwnerQuery, [owner_id]);
    if (ownerRows.length === 0) {
      connection.release();
      return res.status(400).json({ error: 'Invalid owner_id provided. owner_id does not exist in owner table.' });
    }

    const query = `UPDATE airplane SET Model = ?, Manufacturer = ?, Apron_number = ?, owner_id = ?, Maintenance_Status = ?, Last_Maintenance_Date = ?, Purchase_date = ? WHERE Registration_number = ?`;

    const values = [Model, Manufacturer, Apron_number, owner_id, Maintenance_Status, Last_Maintenance_Date, Purchase_date, registrationNumber];

    await connection.query(query, values);
    connection.release();

    res.status(200).json({ message: 'Airplane updated successfully.' });
  } catch (err) {
    console.error('Error updating airplane:', err);
    res.status(500).json({ error: 'An error occurred while updating the airplane.' });
  }
});



app.put('/airport_aprons/:apron_number', async (req, res) => {
  const apronNumber = req.params.apron_number;
  const { Apron_type, Aircraft_Capacity, Apron_status } = req.body;

  try {
    const connection = await pool.getConnection();
    const query = `UPDATE airport_apron SET Apron_type = ?, Aircraft_Capacity = ?, Apron_status = ? WHERE Apron_number = ?`;

    const values = [Apron_type, Aircraft_Capacity, Apron_status, apronNumber];

    await connection.query(query, values);
    connection.release();
    res.status(200).json({ message: 'Airport apron updated successfully.' });
  } catch (err) {
    console.error('Error updating airport apron:', err);
    res.status(500).json({ error: 'An error occurred while updating the airport apron.' });
  }
});

app.put('/type_of_planes/:model', async (req, res) => {
  const model = req.params.model;
  const { Fuel_Capacity, Maximum_Range, Weight, Seating_Capacity } = req.body;

  try {
    const connection = await pool.getConnection();
    const query = `UPDATE type_of_plane 
                   SET Fuel_Capacity = ?, 
                       Maximum_Range = ?, 
                       Weight = ?, 
                       Seating_Capacity = ? 
                   WHERE Model = ?`;

    const values = [Fuel_Capacity, Maximum_Range, Weight, Seating_Capacity, model];

    await connection.query(query, values);
    connection.release();
    res.status(200).json({ message: 'Type of plane updated successfully.' });
  } catch (err) {
    console.error('Error updating type of plane:', err);
    res.status(500).json({ error: 'An error occurred while updating the type of plane.' });
  }
});


app.put('/owns/:owner_id', async (req, res) => {
  const ownerId = req.params.owner_id;
  const {
    Name,
    Street,
    State,
    City,
    Zip,
    Phone_No,
    Type_of_owner
  } = req.body;

  try {
    const connection = await pool.getConnection();
    const query = `UPDATE owner 
                   SET Name = ?, Street = ?, State = ?, City = ?, Zip = ?, Phone_No = ?, Type_of_owner = ? 
                   WHERE owner_id = ?`;

    const values = [Name, Street, State, City, Zip, Phone_No, Type_of_owner, ownerId];

    await connection.query(query, values);
    connection.release();
    res.status(200).json({ message: 'Owner table updated successfully.' });
  } catch (err) {
    console.error('Error updating owner table:', err);
    res.status(500).json({ error: 'An error occurred while updating the owner table.' });
  }
});

app.put('/employees/:employee_id', async (req, res) => {
  const employeeId = req.params.employee_id;
  const {
    First_name,
    Middle_Name,
    Last_name, 
    Salary,
    Sex,
    Shift,
    Address,
    Role,
  } = req.body;

  try {
    const connection = await pool.getConnection();
    const query = `UPDATE employee 
                   SET First_name = ?,
                       Middle_Name = ?,
                       Last_name = ?,
                       Salary = ?,
                       Sex = ?,
                       Shift = ?,
                       Address = ?,
                       Role = ?
                   WHERE Employee_ID = ?`;

    const values = [
      First_name,
      Middle_Name,
      Last_name,
      Salary,
      Sex,
      Shift,
      Address,
      Role,
      employeeId,
    ];

    await connection.query(query, values);
    connection.release();
    res.status(200).json({ message: 'Employee updated successfully.' });
  } catch (err) {
    console.error('Error updating employee:', err);
    res.status(500).json({ error: 'An error occurred while updating the employee.' });
  }
});
app.delete('/airplanes/:registration_number', async (req, res) => {
  const registrationNumber = req.params.registration_number;

  try {
    const connection = await pool.getConnection();

    const deleteWorksOnQuery = 'DELETE FROM works_on WHERE Registration_number = ?';
    await connection.query(deleteWorksOnQuery, [registrationNumber]);

    const deleteAirplaneQuery = 'DELETE FROM airplane WHERE Registration_number = ?';
    const result = await connection.query(deleteAirplaneQuery, [registrationNumber]);

    connection.release();

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Airplane not found.' });
    } else {
      res.status(200).json({ message: 'Airplane and related records deleted successfully.' });
    }
  } catch (err) {
    console.error('Error deleting airplane:', err);
    res.status(500).json({ error: 'An error occurred while deleting the airplane.' });
  }
});

app.delete('/employees/:employee_id', async (req, res) => {
  const employeeId = req.params.employee_id;

  try {
    const connection = await pool.getConnection();

    const deletePilotQuery = 'DELETE FROM pilot WHERE Employee_ID = ?';
    await connection.query(deletePilotQuery, [employeeId]);

    const deleteEmployeeQuery = 'DELETE FROM employee WHERE Employee_ID = ?';
    const result = await connection.query(deleteEmployeeQuery, [employeeId]);

    connection.release();

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Employee not found.' });
    } else {
      res.status(200).json({ message: 'Employee and related pilot records deleted successfully.' });
    }
  } catch (err) {
    console.error('Error deleting employee:', err);
    res.status(500).json({ error: 'An error occurred while deleting the employee.' });
  }
});

app.delete('/owns/:owner_id', async (req, res) => {
  const ownerId = req.params.owner_id;

  try {
    const connection = await pool.getConnection();
    const query = `DELETE FROM owner WHERE owner_id = ?`;

    const result = await connection.query(query, [ownerId]);
    connection.release();

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Ownership entry not found.' });
    } else {
      res.status(200).json({ message: 'Ownership entry deleted successfully.' });
    }
  } catch (err) {
    console.error('Error deleting ownership entry:', err);
    res.status(500).json({ error: 'An error occurred while deleting the ownership entry.' });
  }
});
app.post('/airplanes', async (req, res) => {
  const { Registration_number, Model, Manufacturer, Apron_number, owner_id, Maintenance_Status, Last_Maintenance_Date, Purchase_date } = req.body;

  try {
    const connection = await pool.getConnection();

    const checkModelQuery = 'SELECT * FROM type_of_plane WHERE Model = ?';
    const [modelRows] = await connection.query(checkModelQuery, [Model]);
    if (modelRows.length === 0) {
      connection.release();
      return res.status(400).json({ error: 'Invalid Model provided. Model does not exist in type_of_plane table.' });
    }

    const checkApronQuery = 'SELECT * FROM airport_apron WHERE Apron_number = ?';
    const [apronRows] = await connection.query(checkApronQuery, [Apron_number]);
    if (apronRows.length === 0) {
      connection.release();
      return res.status(400).json({ error: 'Invalid Apron_number provided. Apron_number does not exist in airport_apron table.' });
    }

    const checkOwnerQuery = 'SELECT * FROM owner WHERE owner_id = ?';
    const [ownerRows] = await connection.query(checkOwnerQuery, [owner_id]);
    if (ownerRows.length === 0) {
      connection.release();
      return res.status(400).json({ error: 'Invalid owner_id provided. owner_id does not exist in owner table.' });
    }

    const insertQuery = `INSERT INTO airplane (Registration_number, Model, Manufacturer, Apron_number, owner_id, Maintenance_Status, Last_Maintenance_Date, Purchase_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [Registration_number, Model, Manufacturer, Apron_number, owner_id, Maintenance_Status, Last_Maintenance_Date, Purchase_date];

    await connection.query(insertQuery, values);
    connection.release();

    res.status(201).json({ message: 'Airplane inserted successfully.' });
  } catch (err) {
    console.error('Error inserting airplane:', err);
    res.status(500).json({ error: 'An error occurred while inserting the airplane.' });
  }
});


app.post('/airport_apron', async (req, res) => {
  const { Apron_number, Apron_type, Aircraft_Capacity, Apron_status } = req.body;

  try {
    const connection = await pool.getConnection();

    const insertQuery = `INSERT INTO airport_apron (Apron_number, Apron_type, Aircraft_Capacity, Apron_status) VALUES (?, ?, ?, ?)`;
    const values = [Apron_number, Apron_type, Aircraft_Capacity, Apron_status];

    await connection.query(insertQuery, values);
    connection.release();

    res.status(201).json({ message: 'Airport apron inserted successfully.' });
  } catch (err) {
    console.error('Error inserting airport apron:', err);
    res.status(500).json({ error: 'An error occurred while inserting the airport apron.' });
  }
});
app.post('/type_of_plane', async (req, res) => {
  const { Model, Fuel_Capacity, Maximum_Range, Weight, Seating_Capacity } = req.body;

  try {
    const connection = await pool.getConnection();

    const insertQuery = `INSERT INTO type_of_plane (Model, Fuel_Capacity, Maximum_Range, Weight, Seating_Capacity) VALUES (?, ?, ?, ?, ?)`;
    const values = [Model, Fuel_Capacity, Maximum_Range, Weight, Seating_Capacity];

    await connection.query(insertQuery, values);
    connection.release();

    res.status(201).json({ message: 'Type of plane inserted successfully.' });
  } catch (err) {
    console.error('Error inserting type of plane:', err);
    res.status(500).json({ error: 'An error occurred while inserting the type of plane.' });
  }
});

app.post('/employees', async (req, res) => {
  const { Employee_ID, First_name, Middle_Name, Last_name, Salary, Sex, Shift, Address, Role } = req.body;

  try {
    const connection = await pool.getConnection();

    const insertQuery = `INSERT INTO employee (Employee_ID, First_name, Middle_Name, Last_name, Salary, Sex, Shift, Address, Role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [Employee_ID, First_name, Middle_Name, Last_name, Salary, Sex, Shift, Address, Role];

    await connection.query(insertQuery, values);
    connection.release();

    res.status(201).json({ message: 'Employee inserted successfully.' });
  } catch (err) {
    console.error('Error inserting employee:', err);
    res.status(500).json({ error: 'An error occurred while inserting the employee.' });
  }
});

app.post('/owns', async (req, res) => {
  const { owner_id, Name, Street, State, City, Zip, Phone_No, Type_of_owner } = req.body;

  try {
    const connection = await pool.getConnection();

    const insertQuery = `INSERT INTO owner (owner_id, Name, Street, State, City, Zip, Phone_No, Type_of_owner) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [owner_id, Name, Street, State, City, Zip, Phone_No, Type_of_owner];

    await connection.query(insertQuery, values);
    connection.release();

    res.status(201).json({ message: 'Owner record inserted successfully.' });
  } catch (err) {
    console.error('Error inserting owner record:', err);
    res.status(500).json({ error: 'An error occurred while inserting the owner record.' });
  }
});

app.post('/search/airport_apron', async (req, res) => {
  const { column, value } = req.body;

  try {
    const connection = await pool.getConnection();
    let searchQuery = 'SELECT * FROM airport_apron WHERE ';

    const queryParams = [];
    if (column === 'Apron_number') {
      searchQuery += 'Apron_number = ?';
      queryParams.push(parseInt(value));
    } else if (column === 'Aircraft_Capacity') {
      const capacityValues = value.split(',').map(Number);
      searchQuery += 'Aircraft_Capacity IN (?)';
      queryParams.push(capacityValues);
    } else if (column === 'Apron_type' || column === 'Apron_status') {
      searchQuery += `${column} LIKE ?`;
      queryParams.push(`%${value}%`);
    } else {
      connection.release();
      return res.status(400).json({ error: 'Invalid column name. Please provide a valid column name.' });
    }

    const [rows] = await connection.query(searchQuery, queryParams);
    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No matching records found.' });
    }

    res.json(rows);
  } catch (err) {
    console.error('Error searching airport_apron:', err);
    res.status(500).json({ error: 'An error occurred while searching the airport_apron table.' });
  }
});
app.post('/search/airplane', async (req, res) => {
  const { column, value } = req.body;

  try {
    const connection = await pool.getConnection();
    let searchQuery = 'SELECT * FROM airplane WHERE ';

    const queryParams = [];
    if (column === 'Registration_number') {
      searchQuery += 'Registration_number = ?  ';
      queryParams.push(parseInt(value));
    } else if (column === 'Model') {
      searchQuery += 'Model LIKE ?  ';
      queryParams.push(`%${value}%`);
    } else if (column === 'Manufacturer') {
      searchQuery += 'Manufacturer LIKE ?  ';
      queryParams.push(`%${value}%`);
    } else if (column === 'Apron_number') {
      searchQuery += 'Apron_number = ?  ';
      queryParams.push(parseInt(value));
    } else if (column === 'Maintenance_Status') {
      searchQuery += 'Maintenance_Status LIKE ?  ';
      queryParams.push(`%${value}%`);
    } else if (column === 'Last_Maintenance_Date') {
      searchQuery += 'Last_Maintenance_Date = ?  ';
      queryParams.push(value);
    } else {
      connection.release();
      return res.status(400).json({ error: 'Invalid column name. Please provide a valid column name.' });
    }

    const [rows] = await connection.query(searchQuery, queryParams);
    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No matching records found.' });
    }

    res.json(rows);
  } catch (err) {
    console.error('Error searching airplane:', err);
    res.status(500).json({ error: 'An error occurred while searching the airplane table.' });
  }
});


app.post('/search/typeOfPlane', async (req, res) => {
  const { column, value } = req.body;

  try {
    const connection = await pool.getConnection();
    let searchQuery = 'SELECT * FROM type_of_plane WHERE ';

    const queryParams = [];
    if (column === 'Model') {
      searchQuery += 'Model = ?  ';
      queryParams.push(value);
    } else if (column === 'Fuel_Capacity') {
      searchQuery += 'Fuel_Capacity IN (?)  ';
      queryParams.push(parseInt(value));
    } else if (column === 'Maximum_Range') {
      searchQuery += 'Maximum_Range IN (?)  ';
      queryParams.push(parseInt(value));
    } else if (column === 'Weight') {
      searchQuery += 'Weight IN (?)  ';
      queryParams.push(parseFloat(value));
    } else if (column === 'Seating_Capacity') {
      searchQuery += 'Seating_Capacity IN (?)  ';
      queryParams.push(parseInt(value));
    } else {
      connection.release();
      return res.status(400).json({ error: 'Invalid column name. Please provide a valid column name.' });
    }

    const [rows] = await connection.query(searchQuery, queryParams);
    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No matching records found.' });
    }

    res.json(rows);
  } catch (err) {
    console.error('Error searching type_of_plane:', err);
    res.status(500).json({ error: 'An error occurred while searching the type_of_plane table.' });
  }
});
app.post('/search/owners', async (req, res) => {
  const { column, value } = req.body;

  try {
    const connection = await pool.getConnection();
    let searchQuery = 'SELECT * FROM owner WHERE ';

    const queryParams = [];
    if (column === 'owner_id') {
      searchQuery += 'owner_id = ?  ';
      queryParams.push(parseInt(value));
    } else if (column === 'Name') {
      searchQuery += 'Name LIKE ?  ';
      queryParams.push(`%${value}%`);
    } else if (column === 'Street') {
      searchQuery += 'Street LIKE ?  ';
      queryParams.push(`%${value}%`);
    } else if (column === 'State') {
      searchQuery += 'State LIKE ?  ';
      queryParams.push(`%${value}%`);
    } else if (column === 'City') {
      searchQuery += 'City LIKE ?  ';
      queryParams.push(`%${value}%`);
    } else if (column === 'Zip') {
      searchQuery += 'Zip LIKE ?  ';
      queryParams.push(`%${value}%`);
    } else if (column === 'Phone_No') {
      searchQuery += 'Phone_No = ?  ';
      queryParams.push(parseInt(value));
    } else if (column === 'Type_of_owner') {
      searchQuery += 'Type_of_owner LIKE ?  ';
      queryParams.push(`%${value}%`);
    } else {
      connection.release();
      return res.status(400).json({ error: 'Invalid column name. Please provide a valid column name.' });
    }

    const [rows] = await connection.query(searchQuery, queryParams);
    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No matching records found.' });
    }

    res.json(rows);
  } catch (err) {
    console.error('Error searching owners:', err);
    res.status(500).json({ error: 'An error occurred while searching the owners table.' });
  }
});

app.post('/search/employee', async (req, res) => {
  const { column, value } = req.body;

  try {
    const connection = await pool.getConnection();
    let searchQuery = 'SELECT * FROM employee WHERE ';

    const queryParams = [];
    if (column === 'Employee_ID') {
      searchQuery += 'Employee_ID = ? ';
      queryParams.push(parseInt(value));
    } else if (column === 'First_name') {
      searchQuery += 'First_name LIKE ? ';
      queryParams.push(`%${value}%`);
    } else if (column === 'Middle_Name') {
      searchQuery += 'Middle_Name LIKE ? ';
      queryParams.push(`%${value}%`);
    } else if (column === 'Last_name') {
      searchQuery += 'Last_name LIKE ? ';
      queryParams.push(`%${value}%`);
    } else if (column === 'Salary') {
      searchQuery += 'Salary IN (?) ';
      queryParams.push(parseInt(value));
    } else if (column === 'Sex') {
      searchQuery += 'Sex IN (?) ';
      queryParams.push(value);
    } else if (column === 'Shift') {
      searchQuery += 'Shift LIKE ? ';
      queryParams.push(`%${value}%`);
    } else if (column === 'Address') {
      searchQuery += 'Address LIKE ? ';
      queryParams.push(`%${value}%`);
    } else if (column === 'Role') {
      searchQuery += 'Role LIKE ?  ';
      queryParams.push(`%${value}%`);
    } else {
      connection.release();
      return res.status(400).json({ error: 'Invalid column name. Please provide a valid column name.' });
    }

   
    const [rows] = await connection.query(searchQuery, queryParams);
    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No matching records found.' });
    }

    res.json(rows);
  } catch (err) {
    console.error('Error searching employee:', err);
    res.status(500).json({ error: 'An error occurred while searching the employee table.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
