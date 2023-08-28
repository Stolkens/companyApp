const expect = require("chai").expect;
const Employee = require("../employee.model");

describe("Employee", () => {
  it("should throw an error if no args", () => {
    const emp = new Employee({});

    emp.validate((err) => {
      expect(err.errors.firstName, err.errors.lastName, err.errors.department)
        .to.exist;
    });
  });
  it("should not throw an error if args is okey", () => {
    const emp = new Employee({
      firstName: "John",
      lastName: "Doe",
      department: "Management",
    });
    emp.validate((err) => {
      expect(err).to.not.exist;
    });
  });
});