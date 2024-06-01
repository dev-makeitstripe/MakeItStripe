import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    HeaderComponent,
    FooterComponent,
    GalleriaModule,
    ImageModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'MakeItStripe';
  isVisible = false;
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
