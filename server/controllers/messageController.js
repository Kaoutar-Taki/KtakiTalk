// Get all users except the logged in user
export const getUsersForSidebar = async (req,res) => {
    try{
        const userId = req.user._id;
        const filteredUsers = await User.find({
            _id:{$ne:userId}
        }).select("-password");

        // Count number of messages not seen
        
    }catch(error){
    }
};
