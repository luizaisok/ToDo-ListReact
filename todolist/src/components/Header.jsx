import { MdChecklist } from "react-icons/md";

function Header() {
  const dataAtual = new Date();
  const dataFormatada = dataAtual.toLocaleDateString("pt-BR");

  return (
    <header className="flex justify-between items-center text-white bg-sky-950 px-6 py-4 shadow-lg">
      <h1 className="flex items-center gap-2 text-3xl font-bold"><MdChecklist /> To-Do List</h1>
      <span className="border-b">Data: {dataFormatada}</span>
    </header>
  );
}

export default Header;