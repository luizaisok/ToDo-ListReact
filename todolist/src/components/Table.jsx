import useFetch from "../hooks/useFetch"
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

import { useNavigate } from "react-router-dom";

function Table({url}) {
    const { data, editarTarefa, deletarTarefa, loading, error } = useFetch(url);
    
    const items = data?.tarefas || [];

    const toggleStatus = async (tarefa) => {
        const novoStatus = tarefa.status === "Incompleta" ? "Concluída" : "Incompleta";

        try {
            await editarTarefa({...tarefa, status: novoStatus});
        } catch (error) {
            alert("Erro ao atualizar status");
            console.error(error);
        }
    };

    const formatarData = (dataStr) => {
        const [ano, mes, dia] = dataStr.split("-");
        return new Date(ano, mes - 1, dia).toLocaleDateString("pt-BR");
    };

    const navigate = useNavigate();
    
    if (loading) return <p className="text-center pt-10">Carregando tarefas...</p>;
    if (error) return <p  className="text-center pt-10 text-red-900">{error}</p>;
    return (
        <div className="py-10 px-4 mx-auto">
            <main>
                <h4 className="mb-5 ps-2 text-3xl border-s-3 border-white text-sky-950 font-bold">Minhas tarefas:</h4>
                {items.length > 0 ? (
                    <div className="overflow-hidden rounded-md border border-white">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white">
                                    <th className="px-3 py-2 border-r border-white text-sky-950">Status</th>
                                    <th className="text-sky-950">Título</th>
                                    <th className="text-sky-950">Descrição</th>
                                    <th className="text-sky-950">Prazo</th>
                                    <th className="pe-3 text-sky-950">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((task) => (
                                    <tr key={task.id}>
                                        <td className="text-white border-r cursor-pointer" onClick={() => toggleStatus(task)}>
                                            <div className="w-full flex justify-center items-center text-sky-950">
                                                {task.status === 'Incompleta' ? (
                                                <MdCheckBoxOutlineBlank className="align-middle" />
                                                ) : (
                                                <MdCheckBox className="align-middle" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-2">{task.titulo}</td>
                                        <td className="p-2">{task.descricao}</td>
                                        <td className="p-2">{formatarData(task.data_vencimento)}</td>
                                        <td className="p-2 pe-3">
                                            <div className="w-full flex justify-center items-center gap-2">
                                                <button
                                                    className="w-6 h-6 flex justify-center items-center cursor-pointer transition-colors text-teal-700 hover:text-teal-950"
                                                    onClick={() => navigate(`/form-tarefa/${task.id}`)}
                                                >
                                                    <FaEdit className="align-middle" />
                                                </button>
                                                <button
                                                    className="w-6 h-6 flex justify-center items-center cursor-pointer transition-colors text-red-400 hover:text-red-800"
                                                    onClick={() => deletarTarefa(task.id)}
                                                >
                                                    <FaRegTrashCan className="align-middle" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center p-2 mb-5 bg-white rounded-md shadow-lg">Nenhuma tarefa encontrada</div>
                )}
                <button
                    className="m-auto my-2 px-4 py-2 cursor-pointer flex justify-center items-center gap-2 bg-white rounded-md text-sm shadow-md transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg"
                    onClick={() => navigate("/form-tarefa")}>
                    <FaPlus className="text-xs"/>Adicionar tarefa
                </button>
            </main>
        </div>
    )
}

export default Table
