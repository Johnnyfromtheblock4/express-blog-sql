// importo l'array dei posts
const connection = require("../data/db.js");

// INDEX
const index = (req, res) => {
  // definisco la query da eseguire
  const sql = "SELECT * FROM posts";

  connection.query(sql, (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Errore durante l'esecuzione della query: " + err });
    res.json(results);
  });
};

// SHOW
const show = (req, res) => {
  // recupero il parametro passato nell'indirizzo e lo converto in numero
  const { id } = req.params;

  // imposto la query
  const sql = "SELECT * from posts WHERE id = ?";

  // eseguo la query
  connection.query(sql, [id], (err, results) => {
    // controllo che non ci siamo errori
    if (err)
      return res
        .status(500)
        .json({ error: "Errore durante l'esecuzione della query: " + err });
    // controllo che la query effettivamente mi restituisca un array NON vuoto
    if (results.length === 0)
      return res.status(404).json({ error: "Pizza non trovata" });

    res.json(results[0]);
  });
};

// STORE
const store = (req, res) => {
  // genero un nuovo id per la nuova pizza
  const newId = posts[posts.length - 1].id + 1; // prendo l'id dell'ultimo elemento + 1 per crearne uno nuovo

  // destrutturo il body della richiesta
  const { title, content, image, tags } = req.body;

  // creo un nuovo oggetto post
  const newPost = {
    id: newId,
    title: title,
    content: content,
    image: image,
    tags: tags,
  };

  // pusho l'oggetto appena creato nell'array menu
  posts.push(newPost);

  // restituisco stato 201 (created), per far capire che l'operazione è andata a buon fine
  res.status(201).json(newPost);
};

// UPDATE
const update = (req, res) => {
  // recupero l'id desiderato
  const id = parseInt(req.params.id);

  // recupero il post da modificare
  const post = posts.find((item) => item.id === id);

  // controllo se il post esiste
  if (post === undefined) {
    return res.status(404).json({
      error: "Not Found",
      message: "Pizza non trovata",
    });
  }

  // applico le modifiche
  post.title = req.body.title;
  post.content = req.body.content;
  post.image = req.body.image;
  post.tags = req.body.tags;

  res.json(post);
};

// MODIFY
const modify = (req, res) => {
  const id = parseInt(req.params.id);

  // recupero il post dell'array
  const post = posts.find((item) => item.id === id);

  // controllo se il post esiste
  if (post === undefined) {
    return res.status(404).json({
      error: "Not Found",
      message: "Pizza non trovata",
    });
  }

  // modifico i tags
  post.tags = req.body.tags;

  res.json(post);
};

// DESTROY (delete)
const destroy = (req, res) => {
  // recupero il parametro passato nell'indirizzo e lo converto in numero
  const { id } = req.params;

  // per eliminare la pizza dal menu: instauro la connesione ed eseguo la query
  const sql = "DELETE FROM posts WHERE id = ?";

  connection.query(sql, [id], (err) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Errore nella esecuzione della query" + err });
    res.sendStatus(204);
  });
};

// esporto le rotte
module.exports = {
  index,
  show,
  store,
  update,
  modify,
  destroy,
};
