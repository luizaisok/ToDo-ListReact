import { useState, useEffect } from "react"

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [callFetch, setCallFetch] = useState(0)

    // GET
    useEffect(() => {
        const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(url)

            if (!res.ok) throw new Error("Erro ao carregar os dados")

            const json = await res.json()
            setData(json)
            setError(null)

        } catch (err) {
            setError("Erro ao carregar os dados: " + err.message)
        }
        
        setLoading(false);
        };

        fetchData();
    }, [url, callFetch]) // callFetch aqui para forçar o useEffect a refazer o GET quando alterado

    // POST
    const criarTarefa = async (tarefa) => {
        setLoading(true);
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(tarefa),
            });

            if(!res.ok) throw new Error("Erro ao criar tarefa")

            const json = await res.json()
            setCallFetch((prev) => prev + 1)
            return json
        } catch (err) {
            setError("Erro ao criar tarefa")
        }
        setLoading(false);
    }

    // PUT / UPDATE
    const editarTarefa = async (tarefa) => {
        setLoading(true);
        try {
            const res = await fetch(`${url}/${tarefa.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(tarefa),
            });

            if(!res.ok) throw new Error("Erro ao editar tarefa")

            const json = await res.json()
            setCallFetch((prev) => prev + 1)
            return json
        } catch (err) {
            setError("Erro ao editar tarefa")
        }
        setLoading(false);
    }

    // DELETE
    const deletarTarefa = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`${url}/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify([id]),
            });

            if (!res.ok) throw new Error("Erro ao deletar a tarefa")

            const json = await res.json();
            setCallFetch((prev) => prev + 1)
            return json;
        } catch (err) {
            setError("Erro ao deletar tarefa")
        }
        setLoading(false);
    }

    // Buscar por ID
    const buscarPorId = async (id) => {
        try {
            const res = await fetch(`${url}/${id}`);
            
            if(!res.ok) throw new Error("Tarefa não encontrada")
            
            const json = await res.json();
            return json
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    return {data, error, loading, criarTarefa, editarTarefa, deletarTarefa, buscarPorId}
};

export default useFetch;