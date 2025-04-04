import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  imports: [ButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  standalone: true,
})
export class ButtonComponent {
  @Input() label: string = 'Click Me';
  @Input() icon: string = ''; // e.g., 'pi pi-check'
  @Input() iconPosition: 'left' | 'right' | 'top' | 'bottom' = 'left';
  @Input() severity:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warn'
    | 'help'
    | 'danger'
    | undefined;
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() styleClass: string = '';

  @Output() clicked = new EventEmitter<void>();
}
