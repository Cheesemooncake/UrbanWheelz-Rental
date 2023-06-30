db.transports.drop()
db.users.drop()
//-----------------------transports------------------------------------------------------------------------

let transport_1 = db.transports.insertOne({ 
    name: "Bicycle", 
    author: "Siny",
    copys: [
        {
            _id: ObjectId(),
            date: new Date("2021-12-03"),
            status: "in storage"
        },
        {
            _id: ObjectId(),
            date: new Date("2022-11-10"),
            status: "in storage"
        },
        {
            _id: ObjectId(),
            date: new Date("2023-01-15"),
            status: "in use"
        }
    ]
    
})

let transport_2 = db.transports.insertOne({ 
    name: "Rollers", 
    author: "Inline",
    copys: [
        {
            _id: ObjectId(),
            date: new Date("2022-10-30"),
            status: "in use"
        },
        {
            _id: ObjectId(),
            date: new Date("2023-02-15"),
            status: "in storage"
        },
        {
            _id: ObjectId(),
            date: new Date("2023-06-13"),
            status: "in storage"
        }
    ]
    
})


let transport_3 = db.transports.insertOne({ 
    name: "Skateboard", 
    author: "Enuff",
    copys: [
        {
            _id: ObjectId(),
            date: new Date("2021-05-22"),
            status: "in storage"
        },
        {
            _id: ObjectId(),
            date: new Date("2023-03-11"),
            status: "in use"
        },
        {
            _id: ObjectId(),
            date: new Date("2023-06-25"),
            status: "in storage"
        }
    ]
    
})

let transport_4 = db.transports.insertOne({ 
    name: "Scooter", 
    author: "Cityride",
    copys: [
        {
            _id: ObjectId(),
            date: new Date("2020-07-01"),
            status: "in storage"
        },
        {
            _id: ObjectId(),
            date: new Date("2021-10-18"),
            status: "in storage"
        },
        {
            _id: ObjectId(),
            date: new Date("2023-05-25"),
            status: "in use"
        }
    ]
    
})

let transport_5 = db.transports.insertOne({ 
    name: "Electric Scooter", 
    author: "Xiaomi",
    copys: [
        {
            _id: ObjectId(),
            date: new Date("2023-05-01"),
            status: "in storage"
        },
        {
            _id: ObjectId(),
            date: new Date("2022-08-23"),
            status: "in use"
        },
        {
            _id: ObjectId(),
            date: new Date("2023-09-08"),
            status: "in storage"
        }
    ]
    
})

let transport_6 = db.transports.insertOne({ 
    name: "Skis", 
    author: "Nordway Classic",
    copys: [
        {
            _id: ObjectId(),
            date: new Date("2023-01-30"),
            status: "in storage"
        },
        {
            _id: ObjectId(),
            date: new Date("2022-02-05"),
            status: "in storage"
        },
        {
            _id: ObjectId(),
            date: new Date("2023-12-26"),
            status: "in storage"
        }
    ]
    
})

let transport_7 = db.transports.insertOne({ 
    name: "Snowboard", 
    author: "Santa Cruz",
    copys: [
        {
            _id: ObjectId(),
            date: new Date("2021-11-28"),
            status: "in storage"
        },
        {
            _id: ObjectId(),
            date: new Date("2022-02-28"),
            status: "in storage"
        },
        {
            _id: ObjectId(),
            date: new Date("2023-01-15"),
            status: "in storage"
        }
    ]
    
})


//----------------------users-------------------------------------------------------------------------------------
let user_1 = db.users.insertOne(
    { 
        name: "Ekaterina", 
        lastname: "Andreeva", 
        startRegistration: new Date("2023-04-01"),
        endRegistration: new Date("2033-04-01"),
        ticket:"1234",
        transports: [
            {
                transport: db.transports.findOne({_id: transport_1.insertedId}).copys[2],
                startDate: new Date("2023-05-13T16:00:00Z"),
                endDate: new Date("2023-05-14T16:00:00Z"),
                status: "in use"
            }
        ], 

    }
)

let user_2 = db.users.insertOne(
    { 
        name: "David", 
        lastname: "Filippov", 
        startRegistration: new Date("2022-01-10"),
        endRegistration: new Date("2032-01-10"),
        ticket:"2354",
        transports: [
            {
                transport: db.transports.findOne({_id: transport_2.insertedId}).copys[0],
                startDate: new Date("2023-06-05T16:00:00Z"),
                endDate: new Date("2023-06-06T16:00:00Z"),
                status: "in use"
            }
        ], 

    }
)

let user_3 = db.users.insertOne(
    { 
        name: "Anna", 
        lastname: "Makarova", 
        startRegistration: new Date("2020-10-29"),
        endRegistration: new Date("2030-10-29"),
        ticket:"3658",
        transports: [
            {
                transport: db.transports.findOne({_id: transport_3.insertedId}).copys[1],
                startDate: new Date("2023-04-10T16:00:00Z"),
                endDate: new Date("2023-04-11T16:00:00Z"),
                status: "in use"
            }
        ], 

    }
)

let user_4 = db.users.insertOne(
    { 
        name: "Dmitry", 
        lastname: "Fedorov", 
        startRegistration: new Date("2023-05-05"),
        endRegistration: new Date("2030-05-05"),
        ticket:"5036",
        transports: [
            {
                transport: db.transports.findOne({_id: transport_4.insertedId}).copys[2],
                startDate: new Date("2023-06-15T16:00:00Z"),
                endDate: new Date("2023-06-18T16:00:00Z"),
                status: "in use"
            }
        ], 

    }
)

let user_5 = db.users.insertOne(
    { 
        name: "Evgeny", 
        lastname: "Nikonov", 
        startRegistration: new Date("2023-05-05"),
        endRegistration: new Date("2030-05-05"),
        ticket:"3456",
        transports: [
            {
                transport: db.transports.findOne({_id: transport_5.insertedId}).copys[1],
                startDate: new Date("2023-05-21T16:00:00Z"),
                endDate: new Date("2023-05-22T16:00:00Z"),
                status: "in use"
            }
        ], 

    }
)