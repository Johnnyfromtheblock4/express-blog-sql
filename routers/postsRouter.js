// importo express
const express = require("express");

// definisco l'oggetto router
const router = express.Router();

// importo il controller per i post
const postController = require("../controllers/postsController");

// definisco le rotte per i post
// index
router.get("/", postController.index);

// show
router.get("/:id", postController.show);

// store
router.post("/", postController.store);

// update
router.put("/:id", postController.update);

// modify
router.patch("/:id", postController.modify);

// destroy
router.delete("/:id", postController.destroy);

// esporto il router
module.exports = router;
