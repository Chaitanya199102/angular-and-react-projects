import { State } from "src/app/state.model";

export class Employee {
    name: string;
    company: string;
}

export class EmployeeState extends State {
    employee: Employee;
}