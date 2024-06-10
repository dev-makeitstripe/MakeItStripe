import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  showMobileNav: boolean = false

  showNav($event: any) {
    $event.preventDefault();
    this.closeMobileNav();
  }

  closeMobileNav()
  {
    this.showMobileNav = !this.showMobileNav;
  }
}
