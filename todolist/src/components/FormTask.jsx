import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

import './FormTask.css'

function FormTask({ url }) {
    const navigate = useNavigate();
    const { id } = useParams();

    const { criarTarefa, editarTarefa, buscarPorId, loading } = useFetch(url);

    const [tarefa, setTarefa] = useState({
      titulo: "",
      descricao: "",
      data_vencimento: "",
      status: "Incompleta",
    });

    useEffect(() => {
      if (!id) return;

      const carregarTarefa = async () => {
        const resposta = await buscarPorId(id)
        if (resposta && resposta.success && resposta.tarefa){
          setTarefa(resposta.tarefa)
        } else {
          alert("Tarefa não encontrada");
          navigate("/");
        }
      };

      carregarTarefa();
    }, [id]);

    function handleChange(e) {
      const { name, value } = e.target;
      setTarefa((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
      e.preventDefault();

      try {
        if (id) {
          await editarTarefa({ id: parseInt(id), ...tarefa });
          alert("Tarefa editada com sucesso!");
        } else {
          await criarTarefa(tarefa);
          alert("Tarefa criada com sucesso!");
        }
        navigate("/");
      } catch (error) {
        alert("Erro ao salvar tarefa");
        console.error(error);
      }
    }

    const inputStyle = "w-full border rounded px-3 py-2 outline-none focus:shadow-md"; // repetindo muito e no css fica mais complicado

    if (loading && id) return <p className="text-center pt-10">Carregando tarefa...</p>;
    if (loading && !id) return <p className="text-center pt-10">Aguarde...</p>;

    return (
      <div className="p-6 max-w-lg mx-auto">
        <h2 className="text-3xl mb-4 border-b text-sky-950 border-white">{id ? "Editar tarefa" : "Nova tarefa"}</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="mb-1 font-bold">Título</label>
            <input
              type="text"
              name="titulo"
              value={tarefa.titulo}
              onChange={handleChange}
              required
              className={inputStyle}/>
            <label className="mb-1 font-bold">Descrição</label>
            <textarea
              name="descricao"
              value={tarefa.descricao}
              onChange={handleChange}
              required
              className={inputStyle}/>
            <label className="mb-1 font-bold">Prazo</label>
            <input
              type="date"
              name="data_vencimento"
              value={tarefa.data_vencimento}
              onChange={handleChange}
              required
              className={inputStyle}/>
            <label className="mb-1 font-bold">Status</label>
            <select
              name="status"
              value={tarefa.status}
              onChange={handleChange}
              className={inputStyle}>
              <option value="Incompleta">Incompleta</option>
              <option value="Concluída">Concluída</option>
            </select>
          <button
            type="submit"
            className="bg-cyan-950 text-white px-4 py-2 rounded hover:bg-cyan-900 shadow-md transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg">
            {id ? "Salvar alterações" : "Criar tarefa"}
          </button>
        </form>
      </div>
    );
  }

export default FormTask;