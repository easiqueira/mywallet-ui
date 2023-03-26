import { Tipo } from './Tipo';
export class Meta {
    idMeta: number;
    descricao: string;
    idTipoMovimentacao: number;
    tipo: Tipo;
    valor: number;
    atingida: boolean;
    usuarioId: number;
}