import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import {mypipe} from "./ngfor.pipe";
import {mypipe3} from "./ngfilter.pipe";

@NgModule({
  declarations:[mypipe, mypipe3],
  imports:[CommonModule],
  exports:[mypipe, mypipe3]
})

export class MainPipe{}