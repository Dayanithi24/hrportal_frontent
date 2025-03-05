import { AfterViewInit, ChangeDetectorRef, Component, OnInit, signal, ViewChild } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import Swal from 'sweetalert2';
import { LeaveService } from '../../services/leave/leave.service';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Subscription } from 'rxjs';
import { UserDataService } from '../../services/user-data/user-data.service';

@Component({
  selector: 'app-leave-calender',
  standalone: false,
  templateUrl: './leave-calender.component.html',
  styleUrl: './leave-calender.component.css'
})
export class LeaveCalendarComponent {
  userData: any;
  subscription!: Subscription;

  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  events: any[] = []; 

  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    events: [],
    editable: true,
    selectable: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    datesSet: this.loadEvents.bind(this),
  };

  constructor(
    private changeDetector: ChangeDetectorRef, 
    private leaveService: LeaveService,
    private userDataService: UserDataService
  ) {}

  ngOnInit() {
    this.loadEvents();
    this.subscription = this.userDataService.currentUser.subscribe((data) => {
      this.userData = data;
    })
  }

  loadEvents() {
    if (!this.calendarComponent) {
      return;
    }
    const calendarApi = this.calendarComponent.getApi(); 
    const view = calendarApi.view;
    const currentYear = view.currentStart.getFullYear();
    const currentMonth = view.currentStart.getMonth() + 1; 
    this.leaveService.getEvents(currentYear, currentMonth).subscribe((events : any) => {
      this.events = events.map((event: any) => ({
        ...event,
        start: new Date(event.start).toISOString(),  
        end: new Date(event.end).toISOString()
      }));
      this.calendarOptions.events = [...this.events]; 
      this.changeDetector.detectChanges();
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    Swal.fire({
      title: 'Enter event title',
      input: 'text',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        const newEvent = {
          title: result.value,
          start: new Date(selectInfo.startStr).toISOString(),
          end: new Date(selectInfo.endStr).toISOString(),
          allDay: selectInfo.allDay,
          createdBy: this.userData.id
        };

        this.leaveService.addEvent(newEvent).subscribe((data) => {
          this.events.push(data);
          this.calendarOptions.events = [...this.events]; 
          this.changeDetector.detectChanges();
        });
      }
    });
  }

  handleEventClick(clickInfo: EventClickArg) {
    Swal.fire({
      title: `Delete '${clickInfo.event.title}'?`,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      icon: 'warning'
    }).then((result) => {
      if (result.isConfirmed) {
        this.leaveService.deleteEvent(clickInfo.event.id).subscribe(() => {
          clickInfo.event.remove();
          this.loadEvents(); 
        });
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
