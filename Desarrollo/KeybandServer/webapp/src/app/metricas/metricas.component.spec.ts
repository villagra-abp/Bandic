/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MetricasComponent } from './metricas.component';

describe('MetricasComponent', () => {
  let component: MetricasComponent;
  let fixture: ComponentFixture<MetricasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
