const express = require("express")
const { router: userRouter } = require("./routes/user")
const { router: contactRouter } = require("./routes/contact")

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.send("Olá mundo")
})

server.use("/v1", userRouter);
server.use("/v1", contactRouter);

const port = 3000;
server.listen(port, () => {
    console.log(`Servidor rodando no http://localhost:${port}`);
})