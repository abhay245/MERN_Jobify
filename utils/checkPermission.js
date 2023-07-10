const checkPermission = (requestUser, resourceUserId) => {
  console.log(`RequestUser is ${requestUser.userId} and resourceUserId is ${resourceUserId}`)
    if (requestUser.userId === resourceUserId.toString()) {
      return; 
    }
    throw new Error('Not authorized to access this route');
  };
  
  module.exports = { checkPermission };
  