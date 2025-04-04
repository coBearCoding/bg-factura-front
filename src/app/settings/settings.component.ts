import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonComponent } from '../components/button/button.component';
import { FileuploadComponent } from '../components/fileupload/fileupload.component';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-settings',
  imports: [
    InputTextModule,
    FileuploadComponent,
    ToastModule,
    ReactiveFormsModule,
    FloatLabelModule,
    ButtonComponent,
  ],
  providers: [MessageService],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  standalone: true,
})
export class SettingsComponent {
  constructor(private messageService: MessageService) {}

  onBasicUploadAuto(event: any) {
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded with Auto Mode',
    });
  }
}
