const errorHandlerMiddleware = (err,req, res,next) => {
  err.name==='ValidationError'? statusCode=404:500
  errMessage = Object.values(err.errors).map((item)=> item.message).join(',')
  if(err.code && err.code===11000){
    statusCode=404;
    errMessage=`${Object.keys(err.keyValue)} field has to be unique`
  }
  res.status(statusCode).json({errMessage})
};  
module.exports = errorHandlerMiddleware;
  