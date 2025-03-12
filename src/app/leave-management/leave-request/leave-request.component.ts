import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import Swal from 'sweetalert2';
import { LeaveService } from '../../services/leave/leave.service';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-leave-request',
  standalone: false,
  templateUrl: './leave-request.component.html',
  styleUrl: './leave-request.component.css',
})
export class LeaveRequestComponent {
  leaveForm!: FormGroup;
  isSameDate = false;
  leavePolicy: any;
  leaveDuration: number = 0;
  isDurationVisible: boolean = false;
  today!: string;
  @Output() closeEvent = new EventEmitter();

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
    datesSet: this.loadEvents.bind(this),
  };

  constructor(
    private formBuider: FormBuilder, 
    private leaveService: LeaveService,
    private changeDetector: ChangeDetectorRef, 
  ) {
    this.leaveForm = this.formBuider.group({
      leaveType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      duration: [''],
      session: [''],
      startDuration: [''],
      endDuration: [''],
      supportText: [''],
    });
  }

  ngOnInit() {
    this.leavePolicy = history.state.leavePolicy;
    this.loadEvents();
    this.today = new Date().toISOString().split('T')[0];
    this.leaveForm
      .get('startDate')
      ?.valueChanges.subscribe(() => this.checkDateCondition());
    this.leaveForm
      .get('endDate')
      ?.valueChanges.subscribe(() => this.checkDateCondition());
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

  onStartChange() {
    this.leaveForm.get('endDate')?.setValue('');
    this.leaveDuration = 0;
    this.isDurationVisible = false;
  }

  checkDateCondition() {
    const startDate = this.leaveForm.get('startDate')?.value;
    const endDate = this.leaveForm.get('endDate')?.value;

    if (!startDate && endDate) {
      setTimeout(() => {
        this.leaveForm.get('endDate')?.setValue('');
        this.isDurationVisible = false;
        this.leaveDuration = 0;
      }, 0);
      Swal.fire('Warning', 'Fill the Starting Date First', 'warning');
      return;
    }
    this.isDurationVisible = true;

    this.isSameDate = startDate === endDate;

    if (this.isSameDate) {
      this.leaveForm.get('duration')?.setValidators([Validators.required]);

      this.leaveForm.get('duration')?.valueChanges.subscribe(() => {
        if(this.leaveForm.get('duration')?.value === 'Half Day')
          this.leaveDuration = 0.5;
        else if(this.leaveForm.get('duration')?.value === 'Full Day') 
          this.leaveDuration = 1;
      })

      this.leaveForm.get('session')?.clearValidators();
      this.leaveForm.get('startDuration')?.reset();
      this.leaveForm.get('endDuration')?.reset();
      this.leaveForm.get('startDuration')?.clearValidators();
      this.leaveForm.get('endDuration')?.clearValidators();
    } else {
      this.leaveForm.get('startDuration')?.setValidators([Validators.required]);
      this.leaveForm.get('endDuration')?.setValidators([Validators.required]);

      this.leaveForm.get('startDuration')?.valueChanges.subscribe(() => this.calculateDuration());
      this.leaveForm.get('endDuration')?.valueChanges.subscribe(() => this.calculateDuration());

      this.leaveForm.get('duration')?.reset();
      this.leaveForm.get('session')?.reset();
      this.leaveForm.get('duration')?.clearValidators();
      this.leaveForm.get('session')?.clearValidators();
    }

    this.leaveForm.get('duration')?.updateValueAndValidity();
    this.leaveForm.get('session')?.updateValueAndValidity();
    this.leaveForm.get('startDuration')?.updateValueAndValidity();
    this.leaveForm.get('endDuration')?.updateValueAndValidity();
  }

  calculateDuration() {
    const start = new Date(this.leaveForm.get('startDate')?.value);
    const end = new Date(this.leaveForm.get('endDate')?.value);
    let duration =  (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
    if(this.leaveForm.get('startDuration')?.value === 'Half Day') duration -= 0.5;
    if(this.leaveForm.get('endDuration')?.value === 'Half Day') duration -= 0.5;
    if(!Number.isNaN(duration)) {
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        duration -= this.checkLeaveConflict(d, start, end)
      }
      this.leaveDuration = duration + 1;
    }
  }

  checkLeaveConflict(date: Date, start: Date, end: Date) {
    const calendarApi = this.calendarComponent.getApi();
    const events = calendarApi.getEvents();

    for (const event of events) {
      const eventStart = new Date(event.startStr);
      let eventEnd = event.end ? new Date(event.endStr) : eventStart;
      if(event.allDay){
        eventEnd = new Date(eventEnd.getTime() - 1000);
      }
      if (date >= eventStart && date <= eventEnd) {
        if(date.getDate() === start.getDate() && this.leaveForm.get('startDuration')?.value === 'Half Day') return 0.5;
        if(date.getDate() === end.getDate() && this.leaveForm.get('endDuration')?.value === 'Half Day') return 0.5;
        return 1;
      }
    }
    return 0;
  }
  

  isHalfDay() {
    if (this.leaveForm.get('duration')?.value === 'Half Day') {
      this.leaveForm.get('session')?.setValidators([Validators.required]);
    } else {
      this.leaveForm.get('session')?.reset();
      this.leaveForm.get('session')?.clearValidators();
    }

    this.leaveForm.get('session')?.updateValueAndValidity();
  }

  onClose() {
    this.closeEvent.emit();
  }

  onSubmit() {
    if (this.leaveForm.invalid) {
      Swal.fire('Error', 'Please fill all required fields', 'error');
      return;
    }
  }
}
