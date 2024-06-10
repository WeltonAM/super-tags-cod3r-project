export default interface Propriedade {
    nome: string
    tipo: "texto" | "numero_inteiro" | "numero_real" | "checkbox" | "data" | "superTag"
    valor: any
}
