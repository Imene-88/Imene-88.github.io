const express = require('express');
const session = require("express-session");
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const DocumentModel = require("./models/Document");
const documentController = require("./controllers/documentController");
const ConnectedUsers = require("./models/ConnectedUsers");
const connectedUsersController = require('./controllers/connectedUsersController');
const userController = require("./controllers/userController");

const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const likeRoute = require("./routes/likeRoutes");
const documentRoute = require("./routes/documents");
const userAuthenticationRoute = require("./routes/authentication");
const adminRoute = require("./routes/adminRoute");
const commentRoute = require("./routes/commentRoute");
const userInterestsRoute = require("./routes/userInterestsRoute");
const accessRightsRoute = require("./routes/accessRightsRoute");

dotenv.config();

/* Mongodb connection */
mongoose.connect(process.env.MONGO_URL);

app.use(express.json())
app.use(helmet());
app.use(morgan("common"));
app.use("/api/users", userRoute);
app.use("/api/user_authentication", userAuthenticationRoute);
app.use("/api/posts", postRoute);
app.use("/api/likes", likeRoute);
app.use("/api/documents", documentRoute);
app.use("/api/admin", adminRoute);
app.use("/api/comments", commentRoute);
app.use("/api/interests", userInterestsRoute);
app.use("/api/access_rights", accessRightsRoute);

/* ---------------- Socket ---------------- */

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
    transports: ['websocket', 'polling'],
});

const defaultValue = "";
let link;

// socket code
io.on('connection', (socket) => {

    socket.on("connectedUser:add", (userId) => {
        connectedUsersController.addNewConnectedUser(userId, socket.id);
    });

    socket.on("notification:send", async ({senderId, receiverId, postId, type}) => {
        const receiver = await connectedUsersController.getConnectedUser(receiverId);
        const sender = await userController.getSender(senderId);
        const senderFullName = sender.full_name;
        socket.broadcast.to(receiver.socket_id).emit("notification:receive", {
            senderFullName,
            postId,
            type
        })
    }); 

    socket.on("document:send", async (document_id, userId) => {
        const document = await findOrCreateDocument(document_id, userId);
        socket.join(document_id);
        socket.emit(`document:receive-${document_id}`, document.content);
        
        socket.on(`changes:send-${document_id}`, (delta) => {
            socket.broadcast.to(document_id).emit(`changes:receive-${document_id}`, delta);
        });

        socket.on(`title:change-${document_id}`, (title) => {
            socket.broadcast.to(document_id).emit(`title:receive-${document_id}`, title);
        });

        socket.on(`document:saveChangesToDB-${document_id}`, async (content) => {
            await DocumentModel.findByIdAndUpdate(document_id, {content: content});
        });

        socket.on(`document:share-${document_id}`, async ({senderId, receiverId, accessRight, type}) => {
            const receiver = await connectedUsersController.getConnectedUser(receiverId);
            const sender = await userController.getSender(senderId);
            const senderFullName = sender.full_name;
            if (type === "shareDoc") {
                link = "http://localhost:3000/documents/add_doc/" + document_id;
            }
            socket.broadcast.to(receiver.socket_id).emit("document:shared", {
                senderFullName,
                document_id,
                receiverId,
                link,
                accessRight,
                type,
            })
        });
        
        socket.on(`user:announce-${document_id}`, () => {
            socket.broadcast.to(document_id).emit(`user:announced-${document_id}`);
        })
    })

    socket.once("disconnect", () => {
        connectedUsersController.deleteConnectedUser(socket.id);
        console.log("disconnected");
    });   

});

async function findOrCreateDocument(document_id, userId) {
    if (document_id == null) return
  
    const document = await DocumentModel.findById(document_id)
    if (document) return document
    return await DocumentModel.create({ _id: document_id, owner_id: userId, content: defaultValue })
  }
  

server.listen(3003, () => {
    console.log("listening on port 3003");
}); 