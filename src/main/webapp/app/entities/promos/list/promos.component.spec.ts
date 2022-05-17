import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PromosService } from '../service/promos.service';

import { PromosComponent } from './promos.component';

describe('Promos Management Component', () => {
  let comp: PromosComponent;
  let fixture: ComponentFixture<PromosComponent>;
  let service: PromosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PromosComponent],
    })
      .overrideTemplate(PromosComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PromosComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PromosService);

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
    expect(comp.promos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
