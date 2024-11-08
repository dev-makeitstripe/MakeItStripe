import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ContactComponent } from './Modals/contact/contact.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    HeaderComponent,
    FooterComponent,
    TestimonialsComponent,
    GalleriaModule,
    ImageModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DialogService, MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  title = 'MakeItStripe';
  isVisible = false;
  additionalServicesShow = false;

  constructor(
    public dialogService: DialogService,
    public messageService: MessageService
  ) {

  }


  showAdditionalServices($event: any) {
    $event.preventDefault();
    this.additionalServicesShow = !this.additionalServicesShow;
  }

  ref: DynamicDialogRef | undefined;

  show($event: any) {
    $event.preventDefault();
    this.ref = this.dialogService.open(ContactComponent, {
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      position: "top-right",
      closable: false,
      dismissableMask: true
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  images: any[] = [
    {
      previewImageSrc:
        '/assets/Gallery/Large/20240512_115730_resized.jpg',
      thumbnailImageSrc:
        '/assets/Gallery/Small/20240512_115730_resized_resized.jpg',
      alt: 'Stripes in the front yard, after the first cut',
      title: 'Beautiful Stripes in the front yard, after the first cut',
    },
    {
      previewImageSrc:
        '/assets/Gallery/Small/20240531_162322_resized_resized.jpg',
      thumbnailImageSrc:
        '/assets/Gallery/Large/20240531_162322_resized.jpg',
      alt: 'Make It Stripe Lawn Tractor "Big Stripe" ',
      title: 'Make It Stripe Lawn Tractor "Big Stripe" ',
    },
    {
      previewImageSrc:
        '/assets/Gallery/Small/20240531_180211_resized_resized.jpg',
      thumbnailImageSrc:
        '/assets/Gallery/Large/20240531_180211_resized.jpg',
      alt: 'Backyard Stripes, compliments of "Big Stripe" ',
      title: 'Backyard Stripes, compliments of "Big Stripe" ',
    },
    {
      previewImageSrc:
        '/assets/Gallery/Small/20240531_182722_resized_resized.jpg',
      thumbnailImageSrc:
        '/assets/Gallery/Large/20240531_182722_resized.jpg',
      alt: '"Big Stripe" at rest with bagging system',
      title: '"Big Stripe" at rest with bagging system',
    },
    {
      previewImageSrc:
        '/assets/Gallery/Small/20240601_125013_resized_resized.jpg',
      thumbnailImageSrc:
        '/assets/Gallery/Large/20240601_125013_resized.jpg',
      alt: 'Beatufiul back yard with crispy stripes',
      title: 'Beatufiul back yard with crispy stripes',
    },
    {
      previewImageSrc:
        '/assets/Gallery/Small/20240601_125017_resized_resized.jpg',
      thumbnailImageSrc:
        '/assets/Gallery/Large/20240601_125017_resized.jpg',
        alt: 'Beatufiul back yard with crispy stripes',
        title: 'Beatufiul back yard with crispy stripes',
    },
    {
      previewImageSrc:
        '/assets/Gallery/Small/20240601_125019_resized_resized.jpg',
      thumbnailImageSrc:
        '/assets/Gallery/Large/20240601_125019_resized.jpg',
        alt: 'Beatufiul back yard with crispy stripes',
        title: 'Beatufiul back yard with crispy stripes',
    },
    {
      previewImageSrc:
        '/assets/Gallery/Small/20240607_125018.jpg_resized.jpg',
      thumbnailImageSrc:
        '/assets/Gallery/Large/20240607_125018.jpg_resized.jpg',
      alt: 'Begging of Backyard clean up, has not been mowed all season',
      title: 'Begging of Backyard clean up, has not been mowed all season',
    },
    {
      previewImageSrc:
        '/assets/Gallery/Small/20240607_142422.jpg_resized.jpg',
      thumbnailImageSrc:
        '/assets/Gallery/Large/20240607_142422.jpg_resized.jpg',
        alt: 'After clean up of the backyard',
        title: 'After clean up of the backyard',
    },
    {
      previewImageSrc:
        '/assets/Gallery/Small/20240607_142422.jpg_resized.jpg',
      thumbnailImageSrc:
        '/assets/Gallery/Large/20240607_142422.jpg_resized.jpg',
      alt: 'Before Hedge trimming',
      title: 'Before Hedge trimming',
    },
    {
      previewImageSrc:
        '/assets/Gallery/Small/20240607_142513.jpg_resized.jpg',
      thumbnailImageSrc:
        '/assets/Gallery/Large/20240607_142513.jpg_resized.jpg',
        alt: 'Before Hedge trimming',
        title: 'Before Hedge trimming',
    },
    {
      previewImageSrc:
        '/assets/Gallery/Small/20240607_142518.jpg_resized.jpg',
      thumbnailImageSrc:
        '/assets/Gallery/Large/20240607_142518.jpg_resized.jpg',
      alt: 'Cascading Style Sheet',
      title: 'CSS',
    },
    {
      previewImageSrc:
        '/assets/Gallery/Small/20240607_142527.jpg_resized.jpg',
      thumbnailImageSrc:
        '/assets/Gallery/Large/20240607_142527.jpg_resized.jpg',
        alt: 'Before Hedge trimming',
        title: 'Before Hedge trimming',
    },
    {
      previewImageSrc:
        '/assets/Gallery/Small/20240607_150346.jpg_resized.jpg',
      thumbnailImageSrc:
        '/assets/Gallery/Large/20240607_150346.jpg_resized.jpg',
        alt: 'After Hedge trimming',
        title: 'After Hedge trimming',
    },
    {
      previewImageSrc:
        '/assets/Gallery/Small/20240607_150352.jpg_resized.jpg',
      thumbnailImageSrc:
        '/assets/Gallery/Large/20240607_150352.jpg_resized.jpg',
        alt: 'After Hedge trimming',
        title: 'After Hedge trimming',
    },
    {
      previewImageSrc:
        '/assets/Gallery/Small/20240607_150358.jpg_resized.jpg',
      thumbnailImageSrc:
        '/assets/Gallery/Large/20240607_150358.jpg_resized.jpg',
        alt: 'After Hedge trimming',
        title: 'After Hedge trimming',
    },
  ];
}
