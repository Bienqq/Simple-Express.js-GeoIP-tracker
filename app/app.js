const Server = require("./server")
const PORT = 8090

const server = new Server(PORT)
server.init()

console.log(`Server is listening at http://localhost:${PORT}`)

