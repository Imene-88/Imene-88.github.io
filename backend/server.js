const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const DocumentModel = require("./models/Document");
const documentController = require("./controllers/documentController");

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
    }
});

// socket code
io.on('connection', (socket) => {
    socket.on("document:send", async (textId) => {
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
    });
});

server.listen(3003, () => {
    console.log("listening on port 3003");
}); 