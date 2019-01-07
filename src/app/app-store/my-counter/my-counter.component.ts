import { Component } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { Increment, Decrement, Reset } from '../counter/counter.actions';

@Component({
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html'
})
export class MyCounterComponent {
  count$: Observable<number>;

  constructor(private store: Store<{ count: number }>) {
    // this.count$ = store.pipe(select('count'));
    // same as:
    this.count$ = store.select('count');
  }

  increment() {
    this.store.dispatch(new Increment());
  }

  decrement() {
    this.store.dispatch(new Decrement());
  }

  reset() {
    this.store.dispatch(new Reset());
  }
}