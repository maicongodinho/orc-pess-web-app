import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-buttons',
  templateUrl: './form-buttons.component.html',
  styleUrls: ['./form-buttons.component.scss'],
})
export class FormButtonsComponent {
  @Input() showCancelar = true;
  @Input() showExcluir = true;
  @Input() showEnviar = true;

  @Output() cancelarClick = new EventEmitter();
  @Output() excluirClick = new EventEmitter();
  @Output() enviarClick = new EventEmitter();

  constructor() {}
}
