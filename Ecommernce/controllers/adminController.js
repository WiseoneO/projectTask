

// Delete a single user =>/api/v1/user/:id 
// exports.deleteUser = async(req, res)=>{
//     const id = req.params.id
//     try{
//         const deletedUser = await User.findByIdAndDelete({_id : id});

//         if(!deletedUser){
//             return  res.status(400).json({
//                 success : false,
//                 message : "Item not found"
//             });
//         }
    
//         res.status(200).json({
//             success : true,
//             message : "Data Deleted successfully",
//             data : deletedUser
//         });
//     }catch(errors){
//         next(errors);

//     }
    
// }


// Get all users from the databas => /api/v1/user/all
// exports.getAllUsers = async (req, res)=>{
//     try{
//             const users = await User.find({});

//         if(users.length === 0){
//             return res.status(200).json({
//                 success : true,
//                 message : "No merchant found!"
//             })
//         }

//         res.status(200).json({
//             success : true,
//             message : "All users retrived",
//             total : users.length,
//             data : users
//         });
//     }catch(errors){
//         next(errors);

//     }
    
// }

// // Getting a single User /api/v1/user/:id
// exports.getSingleUser = async (req, res, next)=>{
//     try{
//         const oneUser = await User.findOne({_id : req.params.id});

//         if(!oneUser){
//             return res.status(200).json({
//                 success : false,
//                 message : "No Merchant Found"
//             });
//         }
//         res.status(200).json({
//             success : true,
//             message : "successfully retrived data",
//             data : oneUser
//         });
//     }catch(errors){
//         next(errors);

//     } 
// }