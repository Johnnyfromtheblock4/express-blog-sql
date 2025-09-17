// importo express
const express = require("express");

// definisco app che contiene express
const app = express();

// definisco la porta
const port = 3000;

// importo il middleware errorsHandler
const errorsHandler = require("./middlewares/errorsHandler.js");

// importo il middleware notFound
const notFound = require("./middlewares/notFound.js");

//importo il file router dei post
const postRouter = require("./routers/postsRouter");

//inserisco il middleware per i file statici
app.use(express.static("public"));

// utilizzo il body parser json per recuperare le informazioni del body di una richiesta
app.use(express.json());

// definisco la rotta base
app.get("/", (req, res) => {
  res.send("Benvenuti nel mio blog");
});

// definisco la rotta posts
app.use("/posts", postRouter);

// utilizzo globalmente l'errorsHandler
app.use(errorsHandler);

// utlizzi globalmente il notFound
app.use(notFound);

// server in ascolto sulla porta 3000
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
