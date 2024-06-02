import { Component } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { DynamicDialogRef } from 'primeng/dynamicdialog'; 
import { DynamicDialogConfig } from 'primeng/dynamicdialog'; 



@Component({
  selector: 'app-contact',
  standalone:true,
  imports:[
    CommonModule,
    FormsModule, 
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {

  constructor( 
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig 
) { } 

ngOnInit() { } 

  contactForm: any;

  contactDetails = {
    first_name: '',
    last_name: '',
    middle_initial:'',
    phone_number:'',
    email: '',
    address: '',
   address2:'',
   zipcode:'',
    lawn_maintenance:false,
    landscaping:false,
    needs:'',
    how_did_you_hear:''
  };

  onSubmit() {
    console.log(JSON.stringify(this.contactDetails, undefined, 2));
  }
  
}
