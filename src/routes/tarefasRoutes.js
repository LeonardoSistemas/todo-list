const express = require('express');
const router = express.Router();
const tarefasController = require('../controllers/tarefasController');

// Definindo as rotas para CRUD das tarefas
router.get('/', tarefasController.getAllTarefas);
router.post('/', tarefasController.createTarefa);
router.put('/:id', tarefasController.updateTarefa);
router.delete('/:id', tarefasController.deleteTarefa);

module.exports = router;
