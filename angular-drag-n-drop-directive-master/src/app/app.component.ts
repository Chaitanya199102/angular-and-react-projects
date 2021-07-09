import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import fileDownload from 'js-file-download';
import { Trie } from "./trie.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  files: any[] = [];
  trie: Trie;

  constructor(private window: Window){
    this.trie = new Trie();
  }

  ngOnInit(){
    console.log('filedonwload', fileDownload);
    this.navigateToLink();
  }

  clickHandler() {
    //fileDownload(this.files[0], this.files[0].name);
    this.customFileDownload(this.files[0], this.files[0].name);
  }

  customFileDownload(file: File | Blob, filename: string) {
    console.log("In the new method");
    var a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
    setTimeout(() => a.remove(), 300);
  }

  navigateToLink() {
    //let popup: Window = this.window.open("http://localhost:8000", "myWindow");    
    this.window.addEventListener("message", (event) => {
      console.log('event data', event.data, event);
      console.log('event source', event.source);
      console.log('event origin', event.origin);
      event.source.dispatchEvent(new CustomEvent('tmt-post', { detail: {id: 'string'} }));
  }, true);
  }
  
  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      console.log("Upload in progress.");
      return;
    }
    this.trie.remove(this.files[index].name);
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);

      let resolvedName = this.resolveNameCollision(item.name);
      Object.defineProperty(item, 'name', {
        writable: true,
        value: resolvedName
      });
      this.trie.insert(resolvedName);
    }
    this.fileDropEl.nativeElement.value = "";
    this.uploadFilesSimulator(0);
  }

  resolveNameCollision(name: string): string {
    let count: number = 1;
    while(this.trie.find(name)) 
      name = name.split("_version")[0]+ "_version" +count++;
    return name;
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
}
