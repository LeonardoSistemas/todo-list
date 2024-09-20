// src/controllers/tarefasController.js
const db = require('../models/db');

// Função para listar todas as tarefas
exports.getAllTarefas = async (req, res) => {
  console.log('Consultar tarefas!!')
  try {
    const [rows] = await db.query('SELECT * FROM tarefas');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar as tarefas', error });
  }
};

// Função para criar uma nova tarefa
exports.createTarefa = async (req, res) => {
  console.log('Criar tarefa tarefas!!', req.body)
  const { descricao } = req.body;

  try {
    const [result] = await db.execute('INSERT INTO tarefas (descricao) VALUES (?)', [descricao]);
    res.status(201).json({ message: 'Tarefa criada', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar a tarefa', error });
  }
};

// Função para atualizar uma tarefa
exports.updateTarefa = async (req, res) => {
  const { id } = req.params;
  const { descricao, concluida } = req.body;

  try {
    const [result] = await db.execute('UPDATE tarefas SET descricao = ?, concluida = ? WHERE id = ?', [descricao, concluida, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json({ message: `Tarefa ${id} atualizada` });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar a tarefa', error });
  }
};

// Função para excluir uma tarefa
exports.deleteTarefa = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute('DELETE FROM tarefas WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json({ message: `Tarefa ${id} excluída` });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir a tarefa', error });
  }
};
