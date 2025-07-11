import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <div className='fixed bottom-0 w-full' style={{fontFamily: "Source Code Pro"}}>
        <footer className='flex justify-center items-center gap-3 p-4'>
            <p>By luizaisok</p>
            <a href="https://github.com/luizaisok"><FaGithub/></a>
        </footer>
    </div>
  )
}

export default Footer