import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { SaleService } from '../service/sale.service';

import { SaleComponent } from './sale.component';

describe('Sale Management Component', () => {
  let comp: SaleComponent;
  let fixture: ComponentFixture<SaleComponent>;
  let service: SaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SaleComponent],
    })
      .overrideTemplate(SaleComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SaleComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(SaleService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.sales?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
