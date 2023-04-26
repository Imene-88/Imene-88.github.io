const express = require('express');
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
    /*socket.on("document:send", async (textId) => {
        // const document = await DocumentModel.findById(document_id);
        socket.join(textId);        
        //const content = document.content;
        //console.log(content);
        //socket.emit("document:receive", content);

        socket.on("changes:send", (delta) => {
            socket.broadcast.to(textId).emit("changes:receive", delta); // send the text changes to all the connected users
        }); 
    });

    socket.on("document:insertDB", async (data) => {
        try {
            const {document_id, userId, content} = data;
            await DocumentModel.findByIdAndUpdate(document_id, { owner_id: userId, content: content }, {upsert: true});
        }
        catch(error) {
            console.log(error);
        }
    });*/

    /*socket.on("document:send", async (data) => {
        const { document_id, userId } = data;
        //const document = documentController.getPostDocument(document_id, userId);
        const document = await findOrCreateDocument(document_id, userId);
    });*/

    socket.on("connectedUser:add", (userId) => {
        connectedUsersController.addNewConnectedUser(userId, socket.id);
    });

    

    //socket.on("document:share", async (participantId) => {
    //    const sharedWithUser = await connectedUsersController.getConnectedUser(participantId);
    //    socket.broadcast.to(sharedWithUser.socket_id).emit("document:shared", "hello");
    //});

    socket.on("document:send", async (document_id, userId, msg) => {
        const document = await findOrCreateDocument(document_id, userId);
        socket.join(document_id);
        socket.emit("document:receive", document.content, msg);
        
        socket.on("changes:send", (delta, msg) => {
            socket.broadcast.to(document_id).emit("changes:receive", delta, msg);
        });

        socket.on("document:saveChangesToDB", async (content) => {
            await DocumentModel.findByIdAndUpdate(document_id, {content: content});
        });

        socket.on("document:share", async ({senderId, receiverId, type}) => {
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
                type,
            })
        })

        socket.once("disconnect", () => {
            connectedUsersController.deleteConnectedUser(socket.id);
            console.log("disconnected");
        });      
    })

});

async function findOrCreateDocument(id, userId) {
    if (id == null) return
  
    const document = await DocumentModel.findById(id)
    if (document) return document
    return await DocumentModel.create({ _id: id, owner_id: userId, content: defaultValue })
  }
  

server.listen(3003, () => {
    console.log("listening on port 3003");
}); 