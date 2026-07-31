import { Component, signal } from '@angular/core';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { CommonModule } from '@angular/common';

type TimeTab = 'pomodoro' | 'stopwatch';

@Component({
  selector: 'app-time',
  imports: [CommonModule, PomodoroComponent],
  templateUrl: './time.component.html',
  styleUrl: './time.component.css',
})
export class TimeComponent {
    activeTab = signal<TimeTab>('pomodoro');

    setTab(tab: TimeTab): void {
        this.activeTab.set(tab);
    }
}
