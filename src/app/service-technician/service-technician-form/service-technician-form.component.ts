import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceTechnicianModel } from '@app/shared/models/service-technician.model';
import { ServiceTechnicianServiceService } from '@app/shared/services/service-technician-service/service-technician-service.service';
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
  private idTechnician: bigint;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly notifierService: NotifierService,
    private readonly technicianService: TechnicianService,
    private readonly serviceTechnicianService: ServiceTechnicianServiceService
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
        this.idTechnician = technician.id;
        console.log(this.idTechnician);
      },
      error: (err: HttpErrorResponse)=>{
        console.log(err);
        if(err.status<200 || err.status>299){
          this.notifierService.notify('error', err.error.status);
        }
      }
    });
  }

  saveServiceTechnician() {
    const serviceTechnician : ServiceTechnicianModel = {
      idTechnician : this.idTechnician,
      idService : this.form.get('idService')?.value,
      startDate: this.form.get('startDate')?.value,
      finalDate: this.form.get('finalDate')?.value
    }
    console.log(serviceTechnician);
    this.serviceTechnicianService.saveServiceTechnician(serviceTechnician).subscribe({
      next: (serviceTech : ServiceTechnicianModel) => {
        console.log(serviceTech);
      },
      error: (err)=>{
        console.log(err);
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
      if(this.idTechnician > 0n){
        this.saveServiceTechnician();
      } else {
        this.notifierService.notify('error', 'El documento del tecnico no coincide con la base de datos.');
      }
      
      
      
    }

  }

}
