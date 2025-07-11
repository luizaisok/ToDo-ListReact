const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { getTarefas, insertTarefa, editTarefa, deleteTarefa } = require("../models/DAO/tarefaDAO");

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// Listando todas as tarefas
app.get("/api/tarefa", async (req, res) => {
    const tarefas = await getTarefas();
    res.status(200).json({ success: true, tarefas });
});

// Obter tarefa por id
app.get("/api/tarefa/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const tarefas = await getTarefas();
    const tarefa = tarefas.find(t => t.id === id);
    if (tarefa) {
        res.status(200).json({ success: true, tarefa });
    } else {
        res.status(404).json({ success: false, message: "Tarefa não encontrada" });
    }
});

// Criar tarefa
app.post("/api/tarefa", async (req, res) => {
    const { titulo, descricao, data_vencimento, status } = req.body;
    const result = await insertTarefa(titulo, descricao, data_vencimento, status);
    if (result) {
        return res.status(201).json({ success: true, message: "Tarefa criada com sucesso" });
    }
    return res.status(400).json({ success: false, message: "Erro ao criar tarefa" });
});

// Atualizar tarefa (com id na URL)
app.put("/api/tarefa/:id", async (req, res) => {
    const id = req.params.id;
    const { titulo, descricao, data_vencimento, status } = req.body;
    const result = await editTarefa(id, titulo, descricao, data_vencimento, status);
    if (result) {
        return res.status(200).json({ success: true, message: "Tarefa atualizada com sucesso" });
    }
    return res.status(400).json({ success: false, message: "Erro ao atualizar tarefa" });
});

// Deletar tarefa
app.delete("/api/tarefa/:id", async (req, res) => {
    const id = req.params.id;
    const result = await deleteTarefa(id);
    if (result) {
        return res.status(200).json({ success: true, message: "Tarefa removida com sucesso" });
    }
    return res.status(400).json({ success: false, message: "Erro ao remover tarefa" });
});

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
app.listen(3000, 'localhost', () => {
    console.log("Servidor rodando na porta 3000");
});