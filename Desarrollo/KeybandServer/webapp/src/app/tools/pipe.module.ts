import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import {mypipe} from "./ngfor.pipe";

@NgModule({
  declarations:[mypipe],
  imports:[CommonModule],
  exports:[mypipe]
})

export class MainPipe{}