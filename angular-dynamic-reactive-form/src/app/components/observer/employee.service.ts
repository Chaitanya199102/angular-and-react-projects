import { Injectable } from "@angular/core";
import { StatefulService } from "src/app/state";
import { EmployeeState } from "./employee.model";

export const initialState = {
    employee: undefined,
    loading: false
} as EmployeeState;

@Injectable({providedIn : 'root'})
export class EmployeeService extends StatefulService<EmployeeState> {
    constructor() {
        super(initialState);
    }
}