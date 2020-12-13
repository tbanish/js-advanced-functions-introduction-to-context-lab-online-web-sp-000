// Your code here
function createEmployeeRecord (array) {
  let newEmployee = {}

  newEmployee.firstName = array[0]
  newEmployee.familyName = array[1]
  newEmployee.title = array[2]
  newEmployee.payPerHour = array[3]
  newEmployee.timeInEvents = []
  newEmployee.timeOutEvents = []

  return newEmployee
}

function createEmployeeRecords (array) {
  return array.map((s) => createEmployeeRecord(s))
}

function createTimeInEvent (record, dateTime) {
  let hour = dateTime.split(" ")[1]
  let date = dateTime.split(" ")[0]

  let object = {
    type: "TimeIn",
    hour: parseInt(hour),
    date: date
  }

  record.timeInEvents.push(object)
  return record
}

function createTimeOutEvent (record, dateTime) {
  let hour = dateTime.split(" ")[1]
  let date = dateTime.split(" ")[0]

  let object = {
    type: "TimeOut",
    hour: parseInt(hour),
    date: date
  }

  record.timeOutEvents.push(object)
  return record
}

function hoursWorkedOnDate (record, dateTime) {
  let inObj = record.timeInEvents.filter((s) => s.date === dateTime)
  let outObj = record.timeOutEvents.filter((s) => s.date === dateTime)
  let timeOut = convertTime(outObj[0].hour)
  let timeIn = convertTime(inObj[0].hour)
  let hoursWorked = timeOut - timeIn
  return hoursWorked
}

function convertTime (num) {
  let newNum;
  if (num.toString().length == 3) {
    newNum = parseInt(num.toString().slice(0,1))
  } else {
    newNum = parseInt(num.toString().slice(0,2))
  }
  return newNum
}

function wagesEarnedOnDate (record, dateTime) {
  return record.payPerHour * hoursWorkedOnDate(record, dateTime)
}

function allWagesFor (record) {
  let timeInDates = record.timeInEvents.map((s) => s.date)
  let wages = timeInDates.map((s) => wagesEarnedOnDate(record, s))
  let result = wages.reduce((total, current) => total += current, 0)
  return result
}

function findEmployeeByFirstName (array, string) {
  let employee = array.filter((s) => s.firstName == string)
  return employee[0]
}

function calculatePayroll (records) {
  let wages = records.map((s) => allWagesFor(s))
  let result = wages.reduce((total, current) => total += current, 0)
  return result
}
