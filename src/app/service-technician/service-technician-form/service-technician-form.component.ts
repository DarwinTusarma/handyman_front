import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceValidator } from '@shared/validators/service.validator';
import { TechnicianDocumentValidator } from '@shared/validators/technician-document.validator';
import { NotifierService } from 'angular-notifier';
import { TechnicianService } from '@shared/services/technician-service/technician.service';

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
    private readonly technicianDocumentValidator: TechnicianDocumentValidator, 
    private readonly technicianService: TechnicianService,
    private readonly serviceValidator: ServiceValidator
  ) { }

  get form(): FormGroup {
    return this.formGroup;
  }

  get technicianDocumentGroup(): FormGroup {
    return this.form.get("technicianDocument") as FormGroup;
  }

  get hasInvalidTechnicianDocument(): boolean {
    return this.technicianDocumentGroup.getError('notFoundDocument');
  }

  get technicianDocumentTypeControl(): FormControl {
    return this.form.get('technicianDocument')?.get('type') as FormControl;
  }
  
  get technicianDocumentNumberControl(): FormControl {
    return this.form.get('technicianDocument')?.get('number') as FormControl;
  }

  get hasInvalidIdService(): boolean {
    return this.form.get('idService')?.getError('notFoundService');
  }

  ngOnInit(): void {
    this.createFormGroup();
  }

  hasError(form: FormGroup, control: string) {
    return (form.get(control)?.invalid && (form.get(control)?.dirty || !form.get(control)?.untouched));
  }

  private createFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      idService: [null, {validators: [Validators.required], asyncValidators: [this.serviceValidator.validate.bind(this.serviceValidator)], updateOn: 'blur' }],
      technicianDocument: this.formBuilder.group({
        type:  ['CC', Validators.required],
        number: [null, Validators.required]
      }, { asyncValidators: [this.technicianDocumentValidator], updateOn: 'blur' }),
      idTechnician: [null],
      startDate: [null, Validators.required],
      finalDate: [null, Validators.required],
    }
    );
    
    this.formGroup.get('idTechnician')?.disable();
  }

  private setIdTechnician(): void {
    const { type, number } = this.form.value.technicianDocument;
    const currentTechnician = this.technicianService.currentTechnicianValue;
    if(currentTechnician && currentTechnician.documentType === type && currentTechnician.documentNumber === number) {
      this.form.patchValue({
        idTechnician: currentTechnician.id
      });
    }
  }

  onSubmitForm(): void {
    console.log("SUBMIT FORM");
    console.log(this.form);
    
    if(this.form.pending) {
      this.notifierService.notify('warning', 'Por favor espere a que se validen los datos ingresados.');
    } else if(this.hasInvalidTechnicianDocument){
      this.notifierService.notify('error', 'El documento del técnico ingresado no es válido.');
    } else if(this.hasInvalidIdService){
      this.notifierService.notify('error', 'El Identificador del servicio ingresado no es válido.');
    } else if(this.form.invalid) {
      this.notifierService.notify('error', 'Por favor llene todos los campos requeridos.');
    } else {
      this.setIdTechnician();
      
    }

  }

}
