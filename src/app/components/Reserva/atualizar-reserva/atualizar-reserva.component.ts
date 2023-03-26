import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { MesService } from './../../../services/mes.service';
import { CategoriasService } from './../../../services/categorias.service';
import { ReservasService } from './../../../services/reservas.service';
import { Mes } from './../../../models/Mes';
import { Categoria } from '../../../models/Categoria';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Reserva } from 'src/app/models/Reserva';


@Component({
  selector: 'app-atualizar-reserva',
  templateUrl: './atualizar-reserva.component.html',
  styleUrls: ['../listagem-reservas/listagem-reservas.component.css'],
})
export class AtualizarReservaComponent implements OnInit {
  reserva: Observable<Reserva>;
  valor: number;
  formulario: any;
  categorias: Categoria[];
  meses: Mes[];
  erros: string[];
  reservaId: number;
  usuarioId: string = localStorage.getItem('UsuarioId');

  constructor(
    private reservasService: ReservasService,
    private categoriasService: CategoriasService,
    private mesesService: MesService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.erros = [];
    this.reservaId = this.route.snapshot.params.id;

    this.categoriasService
      .FiltrarCategoriasReservas()
      .subscribe((resultado) => {
        this.categorias = resultado;
      });

    this.mesesService.ObterTodos().subscribe((resultado) => {
      this.meses = resultado;
    });

    this.reservasService
      .ObterReservaPeloId(this.reservaId)
      .subscribe((resultado) => {
        this.valor = resultado.valor;

        this.formulario = new FormGroup({
          reservaId: new FormControl(resultado.reservaId),
          descricao: new FormControl(resultado.descricao, [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(50),
          ]),
          categoriaId: new FormControl(resultado.categoriaId, [
            Validators.required,
          ]),
          valor: new FormControl(resultado.valor, [Validators.required]),
          dia: new FormControl(resultado.dia, [Validators.required]),
          mesId: new FormControl(resultado.mesId, [Validators.required]),
          ano: new FormControl(resultado.ano, [Validators.required]),
          usuarioId: new FormControl(resultado.usuarioId),
        });
      });
  }

  get propriedade() {
    return this.formulario.controls;
  }

  EnviarFormulario(): void {
    this.erros = [];
    const reserva = this.formulario.value;
    this.reservasService.AtualizarReserva(this.reservaId, reserva).subscribe(
      (resultado) => {
        this.router.navigate(['reservas/listagemreservas']);
        this.snackBar.open(resultado.mensagem, null, {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
      (err) => {
        if (err.status === 400) {
          for (const campo in err.error.errors) {
            if (err.error.errors.hasOwnProperty(campo)) {
              this.erros.push(err.error.errors[campo]);
            }
          }
        }
      }
    );
  }

  VoltarListagem(): void {
    this.router.navigate(['reservas/listagemreservas']);
  }
}
