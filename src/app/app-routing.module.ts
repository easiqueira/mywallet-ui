import { IndexComponent } from './components/Dashboard/index/index.component';
import { NovaDespesaComponent } from './components/Despesa/nova-despesa/nova-despesa.component';
import { ListagemCartoesComponent } from './components/Cartao/listagem-cartoes/listagem-cartoes.component';
import { NovoCartaoComponent } from './components/Cartao/novo-cartao/novo-cartao.component';
import { AuthGuardService } from './services/auth-guard.service';
import { DashboardComponent } from './components/Dashboard/dashboard/dashboard.component';
import { LoginUsuarioComponent } from './components/Usuario/Login/login-usuario/login-usuario.component';
import { RegistrarUsuarioComponent } from './components/Usuario/Registro/registrar-usuario/registrar-usuario.component';
import { NovaFuncaoComponent } from './components/Funcao/nova-funcao/nova-funcao.component';
import { ListagemFuncoesComponent } from './components/Funcao/listagem-funcoes/listagem-funcoes.component';
import { AtualizarCategoriaComponent } from './components/Categoria/atualizar-categoria/atualizar-categoria.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListagemCategoriasComponent } from './components/Categoria/listagem-categorias/listagem-categorias.component';
import { NovaCategoriaComponent } from './components/Categoria/nova-categoria/nova-categoria.component';
import { AtualizarFuncaoComponent } from './components/Funcao/atualizar-funcao/atualizar-funcao.component';
import { AtualizarCartaoComponent } from './components/Cartao/atualizar-cartao/atualizar-cartao.component';
import { ListagemDespesasComponent } from './components/Despesa/listagem-despesas/listagem-despesas.component';
import { AtualizarDespesaComponent } from './components/Despesa/atualizar-despesa/atualizar-despesa.component';
import { NovoGanhoComponent } from './components/Ganho/novo-ganho/novo-ganho.component';
import { ListagemGanhosComponent } from './components/Ganho/listagem-ganhos/listagem-ganhos.component';
import { AtualizarGanhoComponent } from './components/Ganho/atualizar-ganho/atualizar-ganho.component';
import { AtualizarUsuarioComponent } from './components/Usuario/atualizar-usuario/atualizar-usuario.component';
import { ListagemReservasComponent } from './components/Reserva/listagem-reservas/listagem-reservas.component';
import { NovaReservaComponent } from './components/Reserva/nova-reserva/nova-reserva.component';
import { AtualizarReservaComponent } from './components/Reserva/atualizar-reserva/atualizar-reserva.component';
import { ListagemTiposComponent } from './components/Tipo/listagem-tipos/listagem-tipos.component';
import { NovoTipoComponent } from './components/Tipo/novo-tipo/novo-tipo.component';
import { AtualizarTipoComponent } from './components/Tipo/atualizar-tipo/atualizar-tipo.component';
import { ListagemMetasComponent } from './components/Meta/listagem-metas/listagem-metas.component';
import { NovaMetaComponent } from './components/Meta/nova-meta/nova-meta.component';
import { AtualizarMetaComponent } from './components/Meta/atualizar-meta/atualizar-meta.component';
import { ListagemUsuariosComponent } from './components/Usuario/listagem-usuarios/listagem-usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'categorias/listagemcategorias',
        component: ListagemCategoriasComponent,
      },

      {
        path: 'categorias/novacategoria',
        component: NovaCategoriaComponent,
      },

      {
        path: 'categorias/atualizarcategoria/:id',
        component: AtualizarCategoriaComponent,
      },

      {
        path: 'funcoes/listagemfuncoes',
        component: ListagemFuncoesComponent,
      },

      {
        path: 'funcoes/novafuncao',
        component: NovaFuncaoComponent,
      },

      {
        path: 'funcoes/atualizarfuncao/:id',
        component: AtualizarFuncaoComponent,
      },

      {
        path: 'cartoes/listagemcartoes',
        component: ListagemCartoesComponent,
      },

      {
        path: 'cartoes/novocartao',
        component: NovoCartaoComponent,
      },

      {
        path: 'cartoes/atualizarcartao/:id',
        component: AtualizarCartaoComponent,
      },

      {
        path: 'despesas/listagemdespesas',
        component: ListagemDespesasComponent,
      },

      {
        path: 'despesas/novadespesa',
        component: NovaDespesaComponent,
      },

      {
        path: 'despesas/atualizardespesa/:id',
        component: AtualizarDespesaComponent,
      },

      {
        path: 'reservas/listagemreservas',
        component: ListagemReservasComponent,
      },

      {
        path: 'reservas/novareserva',
        component: NovaReservaComponent,
      },

      {
        path: 'reservas/atualizarreserva/:id',
        component: AtualizarReservaComponent,
      },

      {
        path: 'ganhos/listagemganhos',
        component: ListagemGanhosComponent,
      },

      {
        path: 'ganhos/novoganho',
        component: NovoGanhoComponent,
      },

      {
        path: 'ganhos/atualizarganho/:id',
        component: AtualizarGanhoComponent,
      },

      {
        path: 'metas/listagemmetas',
        component: ListagemMetasComponent,
      },

      {
        path: 'metas/novameta',
        component: NovaMetaComponent,
      },

      {
        path: 'metas/atualizarmeta/:id',
        component: AtualizarMetaComponent,
      },

      {
        path: 'tipos/listagemtipos',
        component: ListagemTiposComponent,
      },

      {
        path: 'tipos/novotipo',
        component: NovoTipoComponent,
      },

      {
        path: 'tipos/atualizartipo/:id',
        component: AtualizarTipoComponent,
      },

      {
        path: 'usuarios/atualizarusuario',
        component: AtualizarUsuarioComponent,
      },

      {
        path: 'dashboard/index',
        component: IndexComponent,
      },

      {
        path: 'usuarios/listagemusuarios',
        component: ListagemUsuariosComponent,
      },
    ],
  },

  {
    path: 'usuarios/registrarusuario',
    component: RegistrarUsuarioComponent,
  },

  {
    path: 'usuarios/loginusuario',
    component: LoginUsuarioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
