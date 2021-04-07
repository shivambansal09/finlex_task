import { Component, TemplateRef } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  employeeData: any;
  modalRef: BsModalRef;
  clientData: any = [];
  employeeDetail: any = [];
  operationName: string;
  tempEmployee: any;
  searchText:any;
  registerForm: FormGroup;
  submitted = false;
  addedRecord: any;
  constructor(private apiService: ApiServiceService, private modalService: BsModalService, private formBuilder: FormBuilder) { }
  title = 'task';
  
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      age: ['', [Validators.required, Validators.maxLength(3), Validators.pattern("^[0-9]*$")]],
      salary: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
  });
    this.getEmployees();
  }
  get f() { return this.registerForm.controls; }
  // get all employee data
  getEmployees() {
    this.apiService.get().subscribe((data) => {
      this.addedRecord = data;
      console.log(data);
      this.clientData.push(...this.addedRecord.data);
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    }
    if(this.operationName === 'Save'){
      this.apiService.post(this.registerForm.value).subscribe((data) => {
        console.log(data);
        let newEmploye = {id:0,employee_name:"", employee_age:0,employee_salary: 0};
        newEmploye.id = data.data.id;
        newEmploye.employee_name = data.data.name;
        newEmploye.employee_age = data.data.age;
        newEmploye.employee_salary = data.data.salary;
        this.clientData.push(newEmploye);
      });
     // this.clientData.push(JSON.stringify(this.registerForm.value));
    }
    this.clientData.forEach((client:any) => {
      if(client.id == this.tempEmployee.id){
        client.employee_name = this.tempEmployee.employee_name;
        client.employee_age = this.tempEmployee.employee_age;
        client.employee_salary = this.tempEmployee.employee_salary;
      }
      
    });
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
}
// view Modal
  openModal(template: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(template, {
      animated: true,
      backdrop: 'static'
    });
   this.clientData.forEach((client:any) => {
     if(client.id == id){
       this.employeeDetail = client;
     }
   });
  }
// add and update modal
  openModal2(update: TemplateRef<any>, id: number, operation: string) {
    this.tempEmployee = {};
    if(operation === "Add"){
      this.operationName = 'Save';
    }
    else{
      this.operationName = 'Update';
      this.clientData.forEach((client:any) => {
        if(client.id == id){
          this.tempEmployee.id = client.id;
          this.tempEmployee.employee_name = client.employee_name;
          this.tempEmployee.employee_age = client.employee_age;
          this.tempEmployee.employee_salary = client.employee_salary;
        }
      });
    }
    this.modalRef = this.modalService.show(update, {
      animated: true,
      backdrop: 'static'
    });
  }
  // delete records
  delete(id: number) {
    console.log(id);
    this.apiService.delete(id).subscribe((data) => {
      this.clientData = this.clientData.filter((item: any) => item.id !== id);
      console.log(data);
    });
  }
}
