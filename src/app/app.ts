import {Component, inject} from '@angular/core';
import {Probe} from './probe';

@Component({
  selector: 'app-root',
  template: `
    <h1>Root effect probe</h1>
    <p>sibling effect runs: <b id="runs">{{ probe.siblingRuns() }}</b></p>
    <p>other: <b id="other">{{ probe.other() }}</b> | trigger: <b id="trigger">{{ probe.trigger() }}</b></p>
    <button id="break" (click)="breakAndBump()">Break first effect + bump other</button>
    <button id="bump" (click)="probe.other.set(probe.other() + 1)">Bump other</button>
  `,
})
export class App {
  protected readonly probe = inject(Probe);

  protected breakAndBump(): void {
    this.probe.trigger.set(true);
    this.probe.other.set(this.probe.other() + 1);
  }
}
