import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MesService } from './../../../services/mes.service';
import { CategoriasService } from './../../../services/categorias.service';
import { ReservasService } from './../../../services/reservas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Mes } from './../../../models/Mes';
import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../../models/Categoria';

@Component({
  selector: 'app-nova-reserva',
  templateUrl: './nova-reserva.component.html',
  styleUrls: ['../listagem-reservas/listagem-reservas.component.css'],
})
export class NovaReservaComponent implements OnInit {
  formulario: any;
  categorias: Categoria[];
  meses: Mes[];
  usuarioId: string = localStorage.getItem('UsuarioId');
  erros: string[];

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private reservasService: ReservasService,
    private categoriasService: CategoriasService,
    private mesesService: MesService
  ) {}

  ngOnInit(): void {
    this.erros = [];

    this.categoriasService
      .FiltrarCategoriasReservas()
      .subscribe((resultado) => {
        this.categorias = resultado;
      });

    this.mesesService.ObterTodos().subscribe((resultado) => {
      this.meses = resultado;
    });

    this.formulario = new FormGroup({
      descricao: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
      ]),
      categoriaId: new FormControl(null, [Validators.required]),
      valor: new FormControl(null, [Validators.required]),
      dia: new FormControl(null, [Validators.required]),
      mesId: new FormControl(null, [Validators.required]),
      ano: new FormControl(null, [Validators.required]),
      usuarioId: new FormControl(this.usuarioId)
    });
  }

  get propriedade() {
    return this.formulario.controls;
  }

  VoltarListagem(): void {
    this.router.navigate(['/reservas/listagemreservas']);
  }

  EnviarFormulario(): void {
    const reserva = this.formulario.value;

    this.reservasService.NovaReserva(reserva).subscribe(
      (resultado) => {
        this.router.navigate(['/reservas/listagemreservas']);
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
}
