const ConnectedUsers = require('../models/ConnectedUsers');

exports.addNewConnectedUser = async (userId, socketId) => {
    const connectedUser = await ConnectedUsers.findOne({user_id: userId});
    if (connectedUser) {
        return await connectedUser.updateOne({ socket_id: socketId }, {new: true});
    } else {
        return await ConnectedUsers.create({user_id: userId, socket_id: socketId});
    }
}

exports.deleteConnectedUser = async (socketId) => {
    await ConnectedUsers.deleteOne({socket_id: socketId});
}

exports.getConnectedUser = async (userId) => {
    try {
        const connectedUser = await ConnectedUsers.findOne({user_id: userId});
        return connectedUser;
    }
    catch(error) {
        console.log(error);
    }
    
}