import app from "./src/app.js";


const PORT = 3001;

function HOST(){
    console.log(`\napp listening in port ${PORT}\nlocalhost:3001\n`)
}

app.listen(PORT, HOST);