// importo l'array dei posts
const posts = require("../data/posts");

// INDEX
const index = (req, res) => {
  //recuperiamo i parametri passati da query string
  const tag = req.query.tag;

  // definiamo un array da restituire
  let filteredPosts = posts;

  //verifico se post non esiste
  if (filteredPosts === undefined) {
    return res.status(404).json({
      error: "404 Pagino non trovata",
      message: "Il post non è presente",
    });
  }

  // controlliamo il valore di title: se diverso da undefined eseguo il filtraggio
  if (tag) {
    filteredPosts = posts.filter((item) => {
      const lowerTags = item.tags.map((tag) => tag.toLowerCase());

      return lowerTags.includes(tag.toLowerCase());
    });
  }
  res.json(filteredPosts);
};

// SHOW
const show = (req, res) => {
  const id = parseInt(req.params.id);

  //recupero il post con l'id passato come parametro
  const post = posts.find((item) => item.id === id);

  //verifico se post non esiste
  if (!post) {
    return res.status(404).json({
      error: "404 Pagino non trovata",
      message: "Il post non è presente",
    });
  }

  res.json(post);
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

// DESTROY
const destroy = (req, res) => {
  const id = parseInt(req.params.id);

  // recupero il post
  const post = posts.find((item) => item.id === id);

  // verifico se post non esiste
  if (!post) {
    return res.status(404).json({
      error: "404 Pagino non trovata",
      message: "Il post non è presente",
    });
  }

  // cancello il post dall'array
  posts.splice(posts.indexOf(post), 1);

  // restituisco lo status 204 per aver cancellato con successo il post dall'array
  res.sendStatus(204);
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
