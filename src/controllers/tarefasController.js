
const db = require('../models/db')
// Função para listar todas as tarefas
class TarefasController {

    static getAllTarefas = async (req, res) => {
        try {
            const [rows] = await db.query('SELECT * FROM tarefas');
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar as tarefas', error });
        }

    };

    // Função para criar uma nova tarefa
    static createTarefa = async (req, res) => {
        const { descricao } = req.body;

        try {
            const [result] = await db.execute('INSERT INTO tarefas (descricao) VALUES (?)', [descricao]);
            res.status(201).json({ message: 'Tarefa criada', id: result.insertId });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar a tarefa', error });
        }

    }
    // Função para atualizar uma tarefa
    static updateTarefa = async (req, res) => {
        const { id } = req.params;
        const { descricao } = req.body;
        
        try {
            const [result] = await db.execute('UPDATE tarefas SET descricao = ? WHERE id = ?', [descricao, id]);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Tarefa não encontrada' });
            }
            res.status(200).json({ message: `Tarefa ${id} atualizada` });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar a tarefa', error });
        }

    };

    // Função para excluir uma tarefa
    static deleteTarefa = async (req, res) => {
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
}

module.exports = TarefasController;

