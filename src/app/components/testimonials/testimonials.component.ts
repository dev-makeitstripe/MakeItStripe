import { Component } from '@angular/core';
import { Api, TestimonyIEnumerableMakeItStripeResult } from '../../Services/MakeItStripeAPI';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddTestimonyComponent } from '../../Modals/Testimonial/add-testimony/add-testimony.component';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  providers: [Api, DialogService, MessageService],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent {
  formData: TestimonyIEnumerableMakeItStripeResult = {};

  constructor(private MakeItStripeAPI: Api<null>, public dialogService: DialogService,
    public messageService: MessageService) { }

  ref: DynamicDialogRef | undefined;

  ngOnInit() {
    this.setup();
    this.getFormData();
  }

  setup() {
    this.MakeItStripeAPI.baseUrl = environment.apiUrl;
  }

  addTestimony($event: any) {
    $event.preventDefault();
    this.ref = this.dialogService.open(AddTestimonyComponent, {
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      position: "top-right",
      closable: false,
      dismissableMask: true
    });
  }
  
  getFormData() {
    new Promise((resolve, reject) => {
      this.MakeItStripeAPI.api.getTestimonies().then(
        result => {
          this.formData = result.data;

          if (this.formData.result == null) {
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
