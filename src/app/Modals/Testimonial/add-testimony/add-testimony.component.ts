import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Testimony, Api } from '../../../Services/MakeItStripeAPI';

import { environment } from '../../../../environments/environment';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';


@Component({
  selector: 'app-add-testimony',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,],
  providers: [Api],
  templateUrl: './add-testimony.component.html',
  styleUrl: './add-testimony.component.css'
})
export class AddTestimonyComponent {

  @ViewChild("message")
  MyProp!: ElementRef;

  testimonyForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    testimonialMessage: new FormControl(''),
    rating: new FormControl(''),
  });

  testimonySubmitted = false;
  testimonySuccess = false;
  testimonyError = false;

  get f(): { [key: string]: AbstractControl } {
    return this.testimonyForm.controls;
  }

  testimonyModel: Testimony = {
    name: null,
    email: null,
    testimonialMessage: null,
    testimonySource: 'Website',
    rating: 0
  };

  setRating($event: any, rating: number) {
    $event.preventDefault();
    this.testimonyModel.rating = (rating + 1);
  }

  maxRating = 5;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private MakeItStripeAPI: Api<null>,
    private formBuilder: FormBuilder
  ) {

  }
  ngOnInit(): void {
    this.MakeItStripeAPI.baseUrl = environment.apiUrl;

    this.testimonyForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        testimonialMessage: ['', [Validators.required, Validators.minLength(10)]],
        rating: ['', [Validators.required, Validators.min(1)]]
      });

  }

  scrollToTop() {
    this.MyProp.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  createTestimony($event: any): void {
    $event.preventDefault();

    this.testimonySubmitted = true;

    if (this.testimonyForm.invalid) {
      return;
    }

    new Promise((resolve, reject) => {
      this.MakeItStripeAPI.api.addTestimony(this.testimonyModel).then(
        result => {
          this.testimonySuccess = true;
          this.scrollToTop();
          resolve([]);
        }).catch((err) => {
          this.testimonyError = true;
          this.scrollToTop();
          console.log(err);
          reject(err);
        });
    })
  }

}
