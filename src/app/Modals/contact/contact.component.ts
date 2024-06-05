import { Component } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AddressType, Api, ReferalType } from '../../Services/MakeItStripeAPI';
import { Customer } from '../../Services/MakeItStripeAPI';
import { Address } from '../../Services/MakeItStripeAPI';
import { ContactFormEntitiesMakeItStripeResult } from '../../Services/MakeItStripeAPI';
import { Service } from '../../Services/MakeItStripeAPI';
import { environment } from '../../../environments/environment';
import { FormGroup, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';


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
  customerModel: Customer = {};
  address: Address = {};
  requestedServices: Service[] = [];
  selectedReferal: ReferalType = {};
  hasPhoneError: boolean = false;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private MakeItStripeAPI: Api<null>
  ) {

  }

  setup() {
    this.MakeItStripeAPI.baseUrl = environment.apiUrl;
  }

  getFormData() {
    new Promise((resolve, reject) => {
      this.MakeItStripeAPI.api.contactGetContactFormEntitiesList().then(
        result => {
          if (result.data.result != null) {
            if (result.data.result.referalTypes != null) {
              this.selectedReferal.referalID = -1;
              this.selectedReferal.referalName = "How did you hear about us?";
              result.data.result.referalTypes.push(this.selectedReferal)
            }
          }

          this.formData = result.data;
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

  onSubmit() {
    this.address.addressType = AddressType.Value1;
    this.customerModel.address?.push(this.address);
  }

}
