import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AddressType, Api, CustomerToService, ReferalType } from '../../Services/MakeItStripeAPI';
import { Customer } from '../../Services/MakeItStripeAPI';
import { Address } from '../../Services/MakeItStripeAPI';
import { ContactFormEntitiesMakeItStripeResult } from '../../Services/MakeItStripeAPI';
import { Service } from '../../Services/MakeItStripeAPI';
import { environment } from '../../../environments/environment';
import { FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [Api],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  formData: ContactFormEntitiesMakeItStripeResult = {};

  @ViewChild("message")
  MyProp!: ElementRef;

  contactModel: Customer = {
    descriptionOfNeeds: null,
    referalTypeID: -1
  };

  address: Address = {};
  requestedServices: Service[] = [];

  selectedReferal: number = -1

  customerToServices: CustomerToService[] = []
  hasPhoneError: boolean = false;
  contactSuccess: boolean = false;
  contactError: boolean = false;
  hasError: boolean = false;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private MakeItStripeAPI: Api<null>
  ) {

  }

  contactForm = new FormGroup({

  });

  setup() {
    this.MakeItStripeAPI.baseUrl = environment.apiUrl;
  }

  getFormData() {
    new Promise((resolve, reject) => {
      this.MakeItStripeAPI.api.contactGetContactFormEntitiesList().then(
        result => {
          this.formData = result.data;
          console.log(this.formData);
          resolve(this.formData);
        }).catch((err) => {
          console.log(err);
          reject(err);
        });
    })
  }

  ngOnInit() {
    this.setup();
    this.getFormData();
  }

  phoneNumberchange(val: string) {
    if (this.isValidPhoneNumber(val)) {
      console.log("valid");
      this.hasPhoneError = false;
    }
    else {
      console.log('invalid');
      this.hasPhoneError = true;
    }
  }

  phoneValidator(): ValidatorFn {
    return (control): ValidationErrors => {
      if (!this.isValidPhoneNumber(control.value)) {
        return {
          'invalidPhone': true
        }
      } else {
        return {
          'invalidPhone': false
        }
      }
    }
  }

  isValidPhoneNumber(phoneNumber: string) {
    return new RegExp(/\(?\d{3}\)?-? *\d{3}-? *-?\d{4}/).test(phoneNumber);
  }

  updateRequestedServices(item: Service) {
    var requested = this.requestedServices.find(x => x.serviceID == item.serviceID);

    if (requested != null) {
      this.requestedServices = this.requestedServices.filter(x => x.serviceID != item.serviceID);
    }
    else {
      this.requestedServices.push(item)
    }
  }

  closeModal($event: any) {
    $event.preventDefault();
    this.ref.close();
  }

  scrollToTop()
  {
    this.MyProp.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  onSubmit(form: any, $event: any) {

    $event.preventDefault();

    this.hasError = false;

    if (!form.valid) {
      console.log("Form is invalid");
      this.hasError = !this.hasError;
      return;
    }

    if (this.selectedReferal < 0) {
      console.log("Form is invalid");
      this.hasError = !this.hasError;
      return;
    }

    if (this.requestedServices.length <= 0) {
      console.log("Form is invalid");
      this.hasError = !this.hasError;
      return;
    }

    this.address.addressType = AddressType.Value1;

    if (this.contactModel.address == null) {
      this.contactModel.address = [];
    }

    this.contactModel.address?.push(this.address);

    if (this.requestedServices != null) {

      this.requestedServices.forEach(service => {

        type service = CustomerToService;
        service.serviceID = service.serviceID;

        this.customerToServices.push(service);
      });

      this.contactModel.services = this.customerToServices;
    }


    this.contactModel.referalTypeID = this.selectedReferal;


    new Promise((resolve, reject) => {
      this.MakeItStripeAPI.api.addContact(this.contactModel).then(
        result => {
          this.contactSuccess = true;
          this.scrollToTop();
          resolve([]);
        }).catch((err) => {
          this.contactError = true;
          this.scrollToTop();
          console.log(err);
          reject(err);
        });
    })
  }

}
