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



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    HeaderComponent,
    FooterComponent,
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
  additionalServicesShow =false;

  constructor(
    public dialogService: DialogService,
    public messageService: MessageService
  ) {

  }


  showAdditionalServices($event: any)
  {
    $event.preventDefault();
    this.additionalServicesShow = !this.additionalServicesShow;
  }

  ref: DynamicDialogRef | undefined;

  show() {
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
      alt: 'Cascading Style Sheet',
      title: 'CSS',
    },
    {
      previewImageSrc:
        '/assets/Gallery/Small/20240531_162322_resized_resized.jpg',
      thumbnailImageSrc:
        '/assets/Gallery/Large/20240531_162322_resized.jpg',
      alt: 'Cascading Style Sheet',
      title: 'CSS',
    },
    {
      previewImageSrc:
        '/assets/Gallery/Small/20240531_180211_resized_resized.jpg',
      thumbnailImageSrc:
        '/assets/Gallery/Large/20240531_180211_resized.jpg',
      alt: 'Cascading Style Sheet',
      title: 'CSS',
    },
    {
      previewImageSrc:
        '/assets/Gallery/Small/20240531_182722_resized_resized.jpg',
      thumbnailImageSrc:
        '/assets/Gallery/Large/20240531_182722_resized.jpg',
      alt: 'Cascading Style Sheet',
      title: 'CSS',
    },
    {
      previewImageSrc:
        '/assets/Gallery/Small/20240601_125013_resized_resized.jpg',
      thumbnailImageSrc:
        '/assets/Gallery/Large/20240601_125013_resized.jpg',
      alt: 'Cascading Style Sheet',
      title: 'CSS',
    },
    {
      previewImageSrc:
        '/assets/Gallery/Small/20240601_125017_resized_resized.jpg',
      thumbnailImageSrc:
        '/assets/Gallery/Large/20240601_125017_resized.jpg',
      alt: 'Cascading Style Sheet',
      title: 'CSS',
    },
    {
      previewImageSrc:
        '/assets/Gallery/Small/20240601_125019_resized_resized.jpg',
      thumbnailImageSrc:
        '/assets/Gallery/Large/20240601_125019_resized.jpg',
      alt: 'Cascading Style Sheet',
      title: 'CSS',
    },
  ];
}
