import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [callFetch, setCallFetch] = useState(0);

  // GET
    useEffect(() => {
        const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(url);
            const json = await res.json();
            setData(json);
            setError(null);
        } catch (err) {
            setError("Erro ao carregar os dados");
        }
        
        setLoading(false);
        };

        fetchData();
    }, [url, callFetch]);

  // POST
    const criarTarefa = async (tarefa) => {
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(tarefa),
            });
            const json = await res.json();
            setCallFetch((prev) => prev + 1);
            return json;
        } catch (err) {
            setError("Erro ao criar tarefa");
        }
    };

  // PUT / UPDATE
    const editarTarefa = async (tarefa) => {
        try {
            const res = await fetch(`${url}/${tarefa.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(tarefa),
            });
            const json = await res.json();
            setCallFetch((prev) => prev + 1);
            return json;
        } catch (err) {
            setError("Erro ao editar tarefa");
        }
    };

  // DELETE
    const deletarTarefa = async (id) => {
        try {
            const res = await fetch(`${url}/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify([id]),
            });

            const json = await res.json();
            setCallFetch((prev) => prev + 1);
            return json;
        } catch (err) {
            setError("Erro ao deletar tarefa");
        }
    };

  // Buscar por ID
    const buscarPorId = async (id) => {
        try {
            const res = await fetch(`${url}/${id}`);
            const json = await res.json();
            if (json.success) return json.tarefa;
            else throw new Error("Tarefa não encontrada");
        } catch (err) {
            console.error(err);
            return null;
        }
    };

  return {
    data, error, loading, criarTarefa, editarTarefa, deletarTarefa, buscarPorId,
  };
};

export default useFetch;