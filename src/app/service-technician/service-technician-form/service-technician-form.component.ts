import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { TechnicianModel } from 'src/app/shared/models/technician.model';
import { TechnicianService } from 'src/app/shared/services/technician-service/technician.service';

@Component({
  selector: 'app-service-technician-form',
  templateUrl: './service-technician-form.component.html',
  styleUrls: ['./service-technician-form.component.css']
})
export class ServiceTechnicianFormComponent implements OnInit {

  private formGroup: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly notifierService: NotifierService,
    private readonly technicianService: TechnicianService
  ) { }

  get form(): FormGroup {
    return this.formGroup;
  }

  ngOnInit(): void {
    this.createFormGroup();
  }

  private createFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      idService: [null, Validators.required],
      tehnicianDocumentType: ['CC', Validators.required],
      tehnicianDocumentNumber: [null, Validators.required],
      idTechnician: [null],
      startDate: [null, Validators.required],
      finalDate: [null, Validators.required],
    });
    
    this.formGroup.get('idTechnician')?.disable();
  }

  validateTechnicianDocument() {
    console.log("VALIDANDO");
    
    const { tehnicianDocumentType, tehnicianDocumentNumber } = this.form.value;
    this.technicianService.queryByDocument(tehnicianDocumentType, tehnicianDocumentNumber).subscribe({
      next: (technician: TechnicianModel) => {
        console.log(technician);
      }
    });
  }

  onSubmitForm() {
    console.log("SUBMIT FORM");
    
    if(this.form.pending) {
      this.notifierService.notify('warning', 'Por favor espere a que se validen los datos ingresados.');
    } else if(this.form.invalid) {
      console.log(this.form);
      
      this.notifierService.notify('error', 'Por favor llene todos los campos requeridos.');
    } else {
      console.log("POR VALIDAR");
      
      this.validateTechnicianDocument();
    }

  }

}
