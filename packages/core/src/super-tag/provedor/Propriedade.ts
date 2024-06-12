export default interface Propriedade {
    descricao: string
    tipo: "texto" | "numero_inteiro" | "numero_real" | "checkbox" | "data"
    valor: any
}
