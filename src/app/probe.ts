import {Injectable, effect, signal, untracked} from '@angular/core';

@Injectable({providedIn: 'root'})
export class Probe {
  readonly trigger = signal(false);
  readonly other = signal(0);
  readonly siblingRuns = signal(0);

  constructor() {
    // Root effect #1: throws once `trigger` is set.
    effect(() => {
      if (this.trigger()) {
        throw new Error('boom');
      }
    });
    // Root effect #2: sibling registered after it, reads a different signal.
    effect(() => {
      this.other();
      untracked(() => this.siblingRuns.update((n) => n + 1));
    });
  }
}
