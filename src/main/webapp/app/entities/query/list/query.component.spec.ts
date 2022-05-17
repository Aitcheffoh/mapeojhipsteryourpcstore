import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { QueryService } from '../service/query.service';

import { QueryComponent } from './query.component';

describe('Query Management Component', () => {
  let comp: QueryComponent;
  let fixture: ComponentFixture<QueryComponent>;
  let service: QueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [QueryComponent],
    })
      .overrideTemplate(QueryComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(QueryComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(QueryService);

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
    expect(comp.queries?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
