const dbHandler    =   require("../../services/dbHandler")
const promise      =   require("bluebird")
const mongoHandler =   require("../../services/mongoHandler")

exports.bookingComplete = (driverid)=>
{
    return new Promise((resolve, reject)=>{
        promise.coroutine(function * (){
            let query2=`SELECT no_of_trips FROM driver`;
            let trips=yield dbHandler.dbHandlerPromise(query2)
            let totaltrips =trips[0].no_of_trips+1;
            let query=`UPDATE driver d,booking b SET d.status=0,b.bookingstatus=2,d.no_of_trips=${totaltrips} where d.id=${driverid} AND b.driverid=${driverid} AND d.status=1`;
            let result = yield dbHandler.dbHandlerPromise(query)
            if(result.affectedRows==0)
            reject({
                "mgs":"error during complete booking"
            })
            resolve(result)
           // mongoHandler.addCompletionTime(driverid);
        })()
    })
}

exports.driver_id = (opts) => {
    return new Promise((resolve, reject) => {
        promise.coroutine(function* () {
            let values=[];
            values.push(opts);
            const query = 'SELECT id FROM driver WHERE access_token=?';
            let result = yield dbHandler.dbHandlerPromise(query, values)
            resolve(result)
        })();
    })
}

exports.driver_emailid = (id) => {
    return new Promise((resolve, reject) => {
        promise.coroutine(function* () {
            const query = 'SELECT email FROM driver WHERE id=?';
            let result = yield dbHandler.dbHandlerPromise(query, id)
            resolve(result)
        })();
    })
}


exports.statusUpdate=(email)=>
{
    return new Promise ((resolve,reject)=>
    {
        promise.coroutine(function* () {
            const query = 'UPDATE driver SET status=0 WHERE email=?';
            let result = yield dbHandler.dbHandlerPromise(query,email)
            resolve(result)
        })();
    })
}