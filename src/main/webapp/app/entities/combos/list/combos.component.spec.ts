import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CombosService } from '../service/combos.service';

import { CombosComponent } from './combos.component';

describe('Combos Management Component', () => {
  let comp: CombosComponent;
  let fixture: ComponentFixture<CombosComponent>;
  let service: CombosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CombosComponent],
    })
      .overrideTemplate(CombosComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CombosComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CombosService);

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
    expect(comp.combos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
