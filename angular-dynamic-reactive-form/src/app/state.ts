import { BehaviorSubject, Observable } from "rxjs";

export class StatefulService<T> {
    private state: T;
    private initialState: T;
    private subject: BehaviorSubject<T>;

    constructor(initialState: T) {
        this.state = initialState;
        this.initialState = initialState;
        this.subject = new BehaviorSubject<T>(initialState);
    }

    mergeState(updatedState: T): void {
       let state = {...this.state, ...updatedState};
       this.subject.next(state);
    }

    resetState(): void {
        this.state = this.initialState;
        this.subject.next(this.state);
    }

    getValue(): T {
        return this.subject.getValue();
    }

    getState(): Observable<T> {
        return this.subject.asObservable();
    }
}