"use client"
import { useRouter } from "next/navigation"
import useAutenticacao from "@/data/hooks/useAutenticacao"
import useFormAutenticacao from "@/data/hooks/useFormAutenticacao"
import Mensagens from "@/components/shared/Mensagens"

interface TextInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "default" | "subtle";
  className?: string;
}

export default function Autenticacao() {
  const router = useRouter()
  const { usuario, modo, alterarUsuario, alternarModo } = useFormAutenticacao()
  const { usuarioAutenticado, registrar, login } = useAutenticacao()

  function alterarAtributo(atributo: string) {
    return (e: any) => {
      alterarUsuario({
        ...usuario,
        [atributo]: e?.target?.value ?? e,
      })
    }
  }

  if (usuarioAutenticado) {
    router.push("/inicio")
    return null
  }

  return (
    <div className=" min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/background.png')" }}>
      <div className="flex flex-col justify-center items-center gap-5 h-screen ">
        <h1 className="text-3xl font-black self-center text-white">
          {modo === "login" ? "Entre com a sua conta" : "Cadastre-se na plataforma"}
        </h1>

        <div className="flex flex-col gap-1 w-96 bg-neutral-900 p-9 rounded-md border border-zinc-700">
          {modo === "registro" && (
            <TextInput
              label="Nome"
              value={usuario.nome ?? ""}
              onChange={alterarAtributo("nome")}
            />
          )}
          <TextInput
            label="Email"
            value={usuario.email ?? ""}
            onChange={alterarAtributo("email")}
          />
          <TextInput
            label="Senha"
            type="password"
            value={usuario.senha ?? ""}
            onChange={alterarAtributo("senha")}
          />
          <div className="flex-1 flex flex-col gap-3 mt-5">
            <Button
              onClick={() =>
                modo === "registro" ? registrar(usuario) : login(usuario)
              }
            >
              {modo === "registro" ? "Registrar" : "Login"}
            </Button>
            <Button onClick={alternarModo} variant="subtle" className="text-white">
              {modo === "registro" ? "Já possui conta?" : "Deseja se registrar?"}
            </Button>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <Mensagens />
        </div>
      </div>
    </div >
  )
}

function TextInput({ label, type = "text", value, onChange }: TextInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-white">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="px-4 py-2 rounded-md bg-black text-white border border-stone-800"
      />
    </div>
  )
}

function Button({ onClick, children, variant = "default", className = "" }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md ${variant === "default" ? "bg-violet-900 border border-gray-400" : "bg-transparent border border-stone-800"
        } text-white ${className}`}
    >
      {children}
    </button>
  )
}