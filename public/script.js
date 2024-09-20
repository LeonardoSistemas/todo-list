document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list').querySelector('tbody');

    // Função para buscar todas as tarefas do backend
    async function fetchTasks() {
        try {
            const response = await fetch('http://localhost:3000/api/tarefas');
            const tasks = await response.json();

            taskList.innerHTML = '';  // Limpa a tabela antes de exibir as tarefas

            tasks.forEach(task => {
                addTaskToDOM(task.id, task.descricao);
            });
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error);
        }
    }

    const taskForm = document.getElementById('task-form');
    const taskDesc = document.getElementById('task-desc');

    // Função para adicionar uma nova tarefa
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();  // Previne o recarregamento da página

        const descricao = taskDesc.value;

        if (descricao) {
            try {
                const response = await fetch('http://localhost:3000/api/tarefas', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ descricao })  // Enviando a descrição ao backend
                });

                const newTask = await response.json();
                addTaskToDOM(newTask.id, descricao);  // Adiciona a nova tarefa na interface

                taskDesc.value = '';  // Limpa o campo de descrição após adicionar a tarefa
            } catch (error) {
                console.error('Erro ao adicionar tarefa:', error);
            }
        } else {
            alert('Por favor, preencha a descrição da tarefa.');
        }
    });

    // Função para adicionar uma tarefa ao DOM (interface do usuário)
    function addTaskToDOM(id, descricao) {
        const row = document.createElement('tr');
        row.setAttribute('data-id', id);  // Armazena o ID da tarefa na linha

        const descCol = document.createElement('td');
        const actionCol = document.createElement('td');

        descCol.textContent = descricao;

        // Botão de excluir
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.classList.add('btn', 'btn-danger', 'me-2');

        // Botão de editar
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Editar';
        editBtn.classList.add('btn', 'btn-warning');

        actionCol.appendChild(deleteBtn);
        actionCol.appendChild(editBtn);

        row.appendChild(descCol);
        row.appendChild(actionCol);
        taskList.appendChild(row);

        // Funções para excluir e editar a tarefa
        deleteBtn.addEventListener('click', () => deleteTask(id, row));
        editBtn.addEventListener('click', () => editTask(id, descricao));
    }

    async function deleteTask(id, row) {
        try {
            await fetch(`http://localhost:3000/api/tarefas/${id}`, {
                method: 'DELETE'
            });

            row.remove();  // Remove a linha da tabela
        } catch (error) {
            console.error('Erro ao excluir tarefa:', error);
        }
    }
    const editTaskModal = new bootstrap.Modal(document.getElementById('editTaskModal'));
    const editTaskDesc = document.getElementById('edit-task-desc');
    let currentTaskId = null;  // Variável para armazenar o ID da tarefa a ser editada

    // Função para abrir o modal de edição
    function editTask(id, descricao) {
        currentTaskId = id;  // Armazena o ID da tarefa a ser editada
        editTaskDesc.value = descricao;  // Preenche o modal com a descrição atual

        editTaskModal.show();  // Exibe o modal de edição
    }

    // Função para salvar as alterações no modal
    document.getElementById('save-edit-btn').addEventListener('click', async () => {
        const updatedDescription = editTaskDesc.value;

        if (updatedDescription) {
            try {
                await fetch(`http://localhost:3000/api/tarefas/${currentTaskId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ descricao: updatedDescription })
                });

                // Atualiza a descrição na tabela sem recarregar a página
                const taskRows = document.querySelectorAll('#task-list tbody tr');
                taskRows.forEach(row => {
                    if (row.getAttribute('data-id') == currentTaskId) {
                        row.children[0].textContent = updatedDescription;
                    }
                });

                editTaskModal.hide();  // Fecha o modal após a atualização
            } catch (error) {
                console.error('Erro ao atualizar tarefa:', error);
            }
        } else {
            alert('Por favor, preencha a descrição da tarefa.');
        }
    });


    // Carregar as tarefas quando a página for carregada
    fetchTasks();
});
