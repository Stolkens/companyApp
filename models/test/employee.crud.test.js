const Employee = require('../employees.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  before(async () => {

    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
    } catch(err) {
      console.error(err);
    }
  });
  
  describe('Reading data', () => {

    before(async () => {
      const testDepOne = new Employee({ firstName: 'Janek', lastName: 'Nowak', department: 'IT' });
      await testDepOne.save();
  
      const testDepTwo = new Employee({ firstName: 'Kaziu', lastName: 'Kowalski', department: 'HR' });
      await testDepTwo.save();
    });

    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return a proper document by "name" with "findOne" method', async () => {
      const employee = await Employee.findOne({ firstName: 'Janek', lastName: 'Nowak', department: 'IT' });
      const expectedEmployeeName = 'Janek';
      const expectedEmployeeLastName = 'Nowak';
      const expectedEmployeeDepartment = 'IT';
       
      expect(employee.firstName).to.be.equal(expectedEmployeeName);
      expect(employee.lastName).to.be.equal(expectedEmployeeLastName);
      expect(employee.department).to.be.equal(expectedEmployeeDepartment);
    });

    after(async () => {
      await Employee.deleteMany();
    });

  });

  describe('Creating data', () => {

    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({ firstName: 'Janek', lastName: 'Nowak', department: 'IT' });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });
  
  });

  describe('Updating data', () => {

    beforeEach(async () => {
      const testDepOne = new Employee({ firstName: 'Janek', lastName: 'Nowak', department: 'IT' });
      await testDepOne.save();
    
      const testDepTwo = new Employee({ firstName: 'Kaziu', lastName: 'Kowalski', department: 'HR'});
      await testDepTwo.save();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne({ firstName: 'Janek' }, { $set: { firstName: 'Antek' }});
      const updatedEmployee = await Employee.findOne({ firstName: 'Antek' });
      expect(updatedEmployee).to.not.be.null;
    });
  
    it('should properly update one document with "save" method', async () => {
      const department = await Employee.findOne({ firstName: 'Janek' });
      department.firstName = 'Antek';
      await department.save();
    
      const updatedEmployee = await Employee.findOne({ firstName: 'Antek' });
      expect(updatedEmployee).to.not.be.null;
    });
  
    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { firstName: 'Mariusz' }});
      const employees = await Employee.find({ firstName: 'Mariusz' });
      expect(employees.length).to.be.equal(2);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  
  });

  describe('Removing data', () => {

    beforeEach(async () => {
      const testDepOne = new Employee({ firstName: 'Janek', lastName: 'Nowak', department: 'IT' });
      await testDepOne.save();
    
      const testDepTwo = new Employee({ firstName: 'Kaziu', lastName: 'Kowalski', department: 'HR'});
      await testDepTwo.save();
    });
    


    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ firstName: 'Janek' });
      const removedEmployee = await Employee.findOne({ firstName: 'Janek' });
      expect(removedEmployee).to.be.null;
      
    });
  
    it('should properly remove one document with "remove" method', async () => {
      const employee = await Employee.findOne({ firstName: 'Janek' });
      await employee.remove();
      const removedEmployee = await Employee.findOne({ firstName: 'Janek' });
      expect(removedEmployee).to.be.null;
    });
  
    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const removedEmployees = await Employee.find();
      expect(removedEmployees.length).to.be.equal(0);
      
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  
  });
  
});