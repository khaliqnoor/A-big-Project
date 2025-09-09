// the below one is of the promises 
// const asyncHandler = (requestHandler) => {}
//     return (req, res, next) => {
//     Promise.resolve(requestHandler(req,res,next)).catch((err)=> next(err))
//    }
// there is an error in this and i will have to lok at this and the thing is that you acan search it on teh chatgpt for rrhe helop and alaso the thing is that i dont like that i have  a l;ots of stuffs and a lots of errors in my code and want it to be more clean and organized 

export { asyncHandler }



// in the async function you can also use the curly bracket but for now we have removed it and also the thing is that it returns another function and the thing is that if your concepts are not cleared then you can search for it in the google too 

//the above code is off the try and catch  

const asyncHandler = (fn)=> async (req, res, next)=>{
    try {
        await fn(req,res,next)
    } catch (error) {
        res.status(err.code || 500).json({
            success: false,
            message: err.message
        })
    }
}