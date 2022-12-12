/* Your Code Here */

let createEmployeeRecord = function(data){
    return {
        firstName: data[0],
        familyName: data[1],
        title: data[2],
        payPerHour: data[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
function createEmployeeRecords(employeeRowData) {
    return employeeRowData.map(function(data){
        return createEmployeeRecord(data)
    })
}
function createTimeInEvent(entryTime){
    let [date, hour] = entryTime.split(" ")

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date,
    })

    return this
}

function createTimeOutEvent (exitTime){
    let [date, hour] = exitTime.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date,
    })

    return this
}

function hoursWorkedOnDate (findDate){
    let inPoint= this.timeInEvents.find(function(event){
        return event.date === findDate
    })

    let outPoint = this.timeOutEvents.find(function(event){
        return event.date === findDate
    })

    return (outPoint.hour - inPoint.hour) / 100
}

let wagesEarnedOnDate = function(dueDate){
    let rawWage = hoursWorkedOnDate.call(this, dueDate)
        * this.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(){
    let eligibleDates = this.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0)

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function allWagesFor () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}