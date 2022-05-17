import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DealerService } from '../service/dealer.service';

import { DealerComponent } from './dealer.component';

describe('Dealer Management Component', () => {
  let comp: DealerComponent;
  let fixture: ComponentFixture<DealerComponent>;
  let service: DealerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DealerComponent],
    })
      .overrideTemplate(DealerComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DealerComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DealerService);

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
    expect(comp.dealers?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
