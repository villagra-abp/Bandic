/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewRolComponent } from './new-rol.component';

describe('NewRolComponent', () => {
  let component: NewRolComponent;
  let fixture: ComponentFixture<NewRolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
