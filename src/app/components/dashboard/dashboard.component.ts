import { FocusMonitor } from '@angular/cdk/a11y';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  
  constructor(private observer: BreakpointObserver,
              private cdref: ChangeDetectorRef,
              private focusMonitor: FocusMonitor) {
    
  }
  ngAfterViewInit(){
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
    this.focusMonitor.stopMonitoring(document.getElementById('menu-button')!);
    this.focusMonitor.stopMonitoring(document.getElementById('menu-open-icon')!);

    this.cdref.detectChanges();
  }
  
  ngOnInit(): void {
    
  }

  toggleSideNav(): void {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.toggle();
        this.focusMonitor.stopMonitoring(document.getElementById('menu-button')!);
        this.focusMonitor.stopMonitoring(document.getElementById('menu-open-icon')!);
        
      } else {

      }
    });
    this.cdref.detectChanges();
  }

}
