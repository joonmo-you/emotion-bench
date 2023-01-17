import { Subject, Observable } from 'rxjs';

export interface Event {}

class EventBusInternal {
  private bus: Subject<Event> = new Subject<Event>();

  public post(t: Event): void {
    if (this.bus.observers.length > 0) {
      this.bus.next(t);
    }
  }

  public toObservable(): Observable<Event> {
    return this.bus.asObservable();
  }
}

export const EventBus = new EventBusInternal();
