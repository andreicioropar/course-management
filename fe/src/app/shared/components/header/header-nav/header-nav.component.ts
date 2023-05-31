import { Component, OnInit } from '@angular/core';

interface NavLink {
  routerLink: string;
  matIcon: string;
  labelKey: string;
  shouldShow: () => boolean;
}

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent implements OnInit {

  navLinks: NavLink[] = [];

  constructor() { }

  ngOnInit(): void {
    this.initNavLinks();
  }

  initNavLinks() {
    this.navLinks = [
      {
        routerLink: '/dashboard',
        matIcon: 'dashboard',
        labelKey: 'Dashboard',
        shouldShow: () => true,
      },
      {
        routerLink: '/courses',
        matIcon: 'book',
        labelKey: 'Courses',
        shouldShow: () => true,
      },
      {
        routerLink: '/settings',
        matIcon: 'settings',
        labelKey: 'Settings',
        shouldShow: () => true,
      }
    ]
  }
}
