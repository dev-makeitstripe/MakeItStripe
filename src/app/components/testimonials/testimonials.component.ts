import { Component } from '@angular/core';
import { Api, TestimonyIEnumerableMakeItStripeResult } from '../../Services/MakeItStripeAPI';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  providers: [Api],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent {
  formData: TestimonyIEnumerableMakeItStripeResult = {};

  constructor(private MakeItStripeAPI: Api<null>) { }

  ngOnInit() {
    this.setup();
    this.getFormData();
  }

  setup() {
    this.MakeItStripeAPI.baseUrl = environment.apiUrl;
  }


  getFormData() {
    new Promise((resolve, reject) => {
      this.MakeItStripeAPI.api.getTestimonies().then(
        result => {
          this.formData = result.data;

          if(this.formData.result == null)
            {
              reject([]);
            }

          resolve(this.formData);
        }).catch((err) => {
          console.log(err);
          reject(err);
        });
    })
  }
}
