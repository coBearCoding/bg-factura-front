import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-fileupload',
  imports: [FileUploadModule],
  templateUrl: './fileupload.component.html',
  styleUrl: './fileupload.component.css',
  standalone: true,
})
export class FileuploadComponent {
  // mode="basic"
  // name="demo[]"
  // chooseIcon="pi pi-upload"
  // accept="image/*"
  // maxFileSize="1000000"
  // (onUpload)="onBasicUploadAuto.emit()"
  // chooseLabel="Seleccionar logo"

  @Input() name: string = 'demo[]';
  @Input() chooseIcon: string = 'pi pi-upload';
  @Input() accept: string = 'image/*';
  @Input() maxFileSize: string = '1000000';
  @Input() chooseLabel: string = 'Seleccionar logo';
  @Input() mode: 'advanced' | 'basic' | undefined = 'basic';

  @Output() onBasicUploadAuto = new EventEmitter<void>();
}
