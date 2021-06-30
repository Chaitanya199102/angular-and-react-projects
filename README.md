"# angular-projects" 

"# Angular 2, 4, 6 & 8 Important notes"
The Angular CLI creates, manages, builds and test your Angular projects. It's built on top of the Angular DevKit. 
https://github.com/angular/angular-cli

Data Binding
String Interpolation {{<?>}} ?-what goes in here? Data and function calls resulting to String; block code not allowed
One-way and Two-way Data Binding {{data}} or Property Binding [property] = "data"
Event Binding (click) = "onclickHandler"
Two way Databinding [(ngModel)] = "dataAttribute"

For Two-Way-Binding (covered in the next lecture) to work, you need to enable the ngModel  directive. This is done by adding the FormsModule  to the imports[]  array in the AppModule. You then also need to add the import from @angular/forms  in the app.module.ts file:
import { FormsModule } from '@angular/forms'; 

Directives
Attribute Directives - Affects the elements properties 
Structural Directives - Affects the DOM or surrounding DOM.  The * Indicates Structural Directives

*ngIf , ngSwitch with *ngSwitchCase & *ngFor Structural Directives, there are other directives which modify attributes of the elements.
//….ngFor="let item of items; let i = index" //…
< …. *ngIf="booleanAttribute; else gotTo" … >
//… If else example
<ng-template #goTo> … </ng-template>

<ng-template [ng-If] ="!booleanIdicator"></ng-template> //this is behind the scenes
Other Directives ngStyle, ngClass etc.

Creatin custom directive - basic-highlight-directive.ts (Attribute Directive)
@Directive({
  selector: '[appbasicHighlight]'
})
export class BasicHighlight implements OnInit { //Add directive name under @NgModule --> declarations [.., BasicHighlight ]
	
	constructor(private elementRef: ElementRef) {}
	ngOnInit() {
		this.elementRef.style.backgroundColor = '#F2F2F2';
	}
	
	//..or use renderer which is better practice of accessing DOM, more in here https://angular.io/api/core/Renderer2
	
	constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
	ngOnInit() {
		this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', '#F2F2F2')
	}
	@HostListner('mouseenter') targetMosueHover(event: Event) { //Reacting to events inside Directives
		this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', '#F2F2F2');
	}
	
	//..binding to any property of Host Component
	
	@HostBinding('style.backgroundColor') backgroundColor: string = transparent; // binding the properties of the host
	@HostListner('mouseenter') targetMosueHover(event: Event) { //Reacting to events inside Directives
		this.backgroundColor = '#F2F2F2';
	}
	
	//reading from host
	@Input defaultColor: string = 'transparent'
	@Input highlightColor: string = 'blue'
	//example <app-comp appBasicHighlight [defaultColor]="yellow" [highlightColor]="red"/>
}

Passing Model or Data from Parent to Child Component
Similar to props in React we have @Input directive used to indicate we are passing props
<app-child [element]="element"/>
In app-child component 
@Input("element") element: Element = // …

EventEmitter emits events from child to parent, this is similar to passing functions using props in React, but we need to refer the emitter in child by giving it @Output decorator before its reference.
<app-child [element]="element" (customEvent)={custoomEventHandler($eventData)}/>
In app-child component
@Output("customEvent) customEvent: any  new EventEmitter<Type>();

View Encapsulation
Reference https://angular.io/guide/view-encapsulation. Default Emulated strategy of Angular separates all the component views by adding ng attribute (example _ng_content_c40)
xyz-compoenent.html
<h3 _ng_conent_c40>//….This won't be Red
abc-component.html
<h3 _ng_conent_c40>//….This will become Red
abc-component.css
h3 { color: red}          //…CSS is scoped to respective view

Can we disable view encapsulation behavior? Yes
@Component({
//…
Encapsulation: ViewEncapsulation.None //default is Emnulated other option is ShadowDom (by browser)

Local References
<input //….  #elementReference/>
<button //… (click)="eventHandler(elementReference)" />

View Child Reference, set static to true if Element Reference is being used in ngOnInit else false
@ViewChild('elementReference', {static: true}) InputElement: ElementRef; //elementReference acts as selector
Alternatively @ContentChild can be used for accessing element inside the ngOnInit

ng-content as special directive lets us add mark-up content inside component start and end.
It projects the content added into the component
Example
<xyz-compoenent>
<h3> //This usually gets skipped without ng-content
</xyz-compoenent>

xyz-compoenent.html
<div>
  <ng-content></ng-content>//…<h3 comes here
</div>

Component Lifecycle methods
When a new selector is found, instance of the component is created then angular goes through couple of life cycle phases these are called Life Cycle Phases, we can hook into those phases using Life cycle hooks or methods.

ngOnchanges	When new component is created and when @Input property changes
ngOnInit	Called once the component is initialized called after the constructor call. View not displayed yet
ngDoCheck	Called during every change detection run. This is executed when change detection runs, change detection runs when something changes on template. Usually called many times.
	Used to do something on every change detection cycle
ngAfterContentInit	Called after ng-content is projected into view, parent view is ready
ngAfterContentChecked	Called every-time projected content has been checked
ngAfterViewInit	Called after every components view (and child view) has been initialized
ngAfterViewChecked	Called every-time every components view (and child view) has been checked
ngOnDestroy	Called once the component is about to be destroyed

Methods are called in above order of rows provided

What are Services?
Central Business Unit, reusability, helps communicating between components
We can instaintiate the service object using new operator but angular does it using ngModule or modules registry in providers (example providers: [LoggingService]).
By providing in module we share same instance of service everywhere.
//We don’t add Injectable; new versions of angular is recommending to add @Injecable on all services
export class LoggingService {

@Injectable() // This tells angular that something can be injected, added to service where something gets injected
export class BusinessService {
	constructor(private logService: LoggingService) //LogService will be injected

Cross-Component communication
Cross component communication can be done using services and EventEmitter
export class AccountService {
	//…
	statusUpdatedEvent = new EventEmitter<string>();
	
export class AccountComponent {
	constructor(private accountService: AccountsService..){}
	//…
	accountService.statusUpdatedEvent.emit('Added)
	
export class AccountsComponent {
	constructor(private accountService: AccountsService..){
		this.accountService.statusUpdatedEvent.subscribe((status: string) => alert('new status'))}) //acts as observable
	}
Services in Angular 6+
@Injectable({providedIn: 'root'}) // can register into modules using decorator, no need to manual add in providers of NgModule 

Angular Routing
Angular ships with own router which helps exchange the pages in browser using URL.

In app.module.ts 
const routes: Routes = [ // Setup routes
	{ path: 'users/:id', component: UsesComponent },
	{ path: 'servers', component: ServersComponent }
	{ path: 'home', component: HomeComponent }
];
@NgModule({
	//…
	Imports: [
		//…
		RouterModule.forRoot(routes) //we bind routes or make angular aware of routes
Place the router-outlet in app.component.html
	<div>
		<router-outlet><router-outlet>
	</div>
How to navigate using Router Link
<a …. routerLink="/servers" />
<a …. [routerLink]="['/servers', '<id>']" /> //allows to construct more complex paths
Similar to / we can use ./ and ../ while adding path (relatively like folder navigation)

<Li //…. routerLinkActive="activeCssClass" [routerLinkActiveOptions]="{exact:true}" ..>

Calling Route from Typescript file
constructor(private router: Router
	Private route: ActivatedRoute //Current Active Route )
	
onClickHandler() {
	//.. this.router.navigate(['/users', '<id>']);
	this.router.navigate(['servers', {relativeTo: this.route} ]);
}

Fetching route Parameters using ActivatedRoute
	//…
	id: this.route.snapshot.params['id']
	
Fetching Route Parameter Reactively
this.route.params.subscribe((params: Params) => {
	this.user.id = params['id];
});

Subscriptions always live in memory even after the components are destroyed
ngOnDestroy() {
	this.paramsSubscritpion.unsubscribe();
}

Passing Query Parameters and Fragments
<a …. [routerLink]="['/servers', '<id>']" [queryParams]="{show: true}" fragment="loading"/> //After clicking this becomes /serves/1?show:true#loading

this.router.navigate(['/servers', id], {queryParams: {show: 'true'}}, fragment: 'loading') //this becomes /serves/1?show:true#loading

Retrieving Query Parameters and Fragments
this.route.queryParams.subscribe();
this.route.fragment.subscribe();

Setting up Child Routing
const appRoutes:Routes  = [
	{path: 'servers', component: ServerComponent, children: [
		{path: ':id', component: ServerComponent},
		{path: ':id'/edit, component: ServerComponent}
	]}
]
Child or nested routes need other outlet
In ServerComponent.html add <router-outlet></router-outlet>

Path Redirection using redirectTo: '<path>', pathMatch: 'full'

Protecting Routes using Guards
@Injectabe({providedIn: 'root'})
Export class AuthService {
	loggedIn = false;
	
	isAuthenticated() {
		Const promise = new Promise( (resolve, reject) => setTimeout(() => resolve(this.loggedIn), 800));
	}
	
	Login() {this.loggedIn = true;
	loggedOut() {this.loggedOut = false;}
}

//Add AuthGaurd  to Providers array
export class AuthGaurd implements CanActivate {
	constructor(private router: Router. private authService: authService) {}

	canActivate(route: ActivatedRouteSnapshot, 
		state RouterStateSnapshot): Observable<boolean> | Promise<boolean> |boolean {
		this.authService.isAuthenticated().then((authenticated: boolean) => {
			If(authenticated) return true;
			else router.navigate(['/notfound']);
	}
}

Protecting child routes using canActivateChild by implementing CanActivateChild
Controlling navigating using canDeactivate
Passing static and dynamic content to Route using data attribute and Dynamic data using Resolver
{path: 'servers', component: ServerComponent, data: {'message': 'This is sample message'}, resolve: {server: ServerResolver} }
Location Strategy {usehash: true}


Using Observables
Observables can be considered as data-source (Events, HTTP Requests, Triggered In Code,…)
And then we have an Observer
In between we have a stream of events or data packets emitted by Observable
Observer cam handle data, error and completion; this is the code we handle
Note: Observable can never complete so we usually unsubscribe then In ngOnDestroy
This is the different alterative to handle asynchronous operations

We find them in rxjs package of Angular
Observable.create(observer => 
	//…
	observer.next();
	//..
}
Operators in rxjs library visit http://rxjs.io
Subjects (both Observable and Observer)

@Injectable({providedIn: 'root'})
export class UserService {
	activatedEmitter = new Subject<boolean>();
}

Useful Resources:
	• Official Docs: https://rxjs-dev.firebaseapp.com/
	• RxJS Series: https://academind.com/learn/javascript/understanding-rxjs/
	• Updating to RxJS 6: https://academind.com/learn/javascript/rxjs-6-what-changed/

Forms
Angular ships with powerful tools while handling forms.
Angular builds Java Script Object notation of the form elements or input elements.
This helps to work with the elements in typescript code easy.
Even Form is represented as an object to work with the states of the form and validation.

Template - Driven - Angular infers the Form Object from the DOM
Reactive - Form is created programmatically and synced with DOM

Template Driven Forms
To Begin with add Forms Module in to root module

<form (ngSubmit)="onSubmitHandler(FormReference)" #FormReference="ngForm"/>
	<input //.. ngModel name="username"/>
	<input //.. ngModel name="email"/>
</form>

onSubmitHandler(form: NgForm) {
	//…
	Console.log(form); //please see value, here we find key value pairs of input element
}

Each element is created as control has properties like
dirty: false if form is unchanged, true if changed
disabled, valid, pristine, touched (If you touch its true), etc.

We can access the form using @ViewChild
Validations
Required Directive- <input //…. required>
Email Directive- <input //…. email> //valid is false on Form level and Control level if invalid email
<input //.. ng-invalid ng-dirty ng-touched /> // angular adds all these classes

Check out the Validators class: https://angular.io/api/forms/Validators - these are all built-in validators, though that are the methods which actually get 
executed (and which you later can add when using the reactive approach). For the template-driven approach, you need the directives. 
You can find out their names, by searching for "validator" in the official docs: https://angular.io/api?type=directive - everything marked with "D"
is a directive and can be added to your template. Additionally, you might also want to enable HTML5 validation (by default, Angular disables it). 
You can do so by adding the ngNativeValidate  to a control in your template.

Disabling the form if not valid
<button //.. [disabled]="!form.valid"/>

<input //… #email="ngModel"/>
<p *ngIf="!email.valid && email.touched" class="warning">Please add valid email </p>

//Taking advantage of angular classes (Form State) which are added to represent he form status
input.ng-invalid.ng-touched {
	border: 1px solid red;
}

Data Binding
<input //… [ngModel]="defaultValue"> //property binding; one-way binding
<input //… [(ngModel)]="defaultValue"> //two-way binding

Grouping controls
<form //…
<div outgroup="ngModelGroup">  // In Form under controls you can now see new control outgroup;  under outgroup we have following input
	<input //… [ngModel]="defaultValue"> 
	//…

Setting and Patching Form Values
this.signupform.form.patchValue(
	{
	outgroup: {username: 'sample'},
	//…
	}); //Set Entire Form
this.signupform.form.patchValue({outgroup: {username: 'sample'}}); //Update parts of form data

Using Form Data
onSubmit() {
	this.email = this.signUpForm.value.email;
	this.username = this.signupForm.outGroup.username;
}

Resetting Forms
This.signupForm.reset(); //resets all form metadata

Reactive Forms
We need to add ReactiveFormsModule in root module imports
//… ts code
signupForm: FormGroup;

ngOnInit() { //Setup Signup Form before view is checked
	this.signupForm = new FormGroup({
		'username': new FormControl('Default Username', Validators.required),
		'email': new FormControl(null, [Validators.email, Validators.email]),
	});
}

//… html code
<form [formGroup]="signupForm">
	<input //.. formControlName='username'/>
	<input //.. formControlName="email"/>
	//..
</>

Reading and using values same as Template Driven approach
let email = this.signupForm.value.email;

Form Group using: 
	<div formControlName="<groupName>">
		//…input controls
	</div>

Form Array
this.signupForm = new FormGroup({
	'username': new FormControl('Default Username', Validators.required),
	'email': new FormControl(null, [Validators.email, Validators.email]),
	'hobbies' new FormArray([])
});

onAddHobby(){
	Const control = new FormControl(null, Validators.Required);
	(<FormArray> this.signupForm.get('hobbies')).push(control);
}

<div *ngFor="let hobby of signupForm.get('hobbies').controls;let i=index">
	<input type='text' class='form-control' [formControlName]="i">
</div>

Creating custom Validators and Asynchronous Validator Refer Online
Using Error Codes this.signupform.get('email').errors['required']

Reacting to the Status or Value changes
this.signupform.valueChanges.subscribe((value)=>console.log());
this.signupform.statusChanges.subscribe((status)=>console.log());

Setting and Patching Reactive Form Values same as Template Driven

Making HTTP Requests
Import HttpClientModule
constructor(private  httpClient: HttpClient){ }
//…
this.http.post(url, payload)
.pipe(map(response => transForm(response))
.subscribe((respone) => {
	
});

Same as React
Refer Online

Showing Loading Indicator


File Upload and File Download References
https://bezkoder.com/angular-10-multiple-files-upload/
https://github.com/bezkoder/spring-boot-upload-file-database
https://github.com/bezkoder/angular-10-multiple-files-upload/blob/master/package.json

![image](https://user-images.githubusercontent.com/12813677/124002464-65046800-d9f3-11eb-9794-098a00013434.png)
