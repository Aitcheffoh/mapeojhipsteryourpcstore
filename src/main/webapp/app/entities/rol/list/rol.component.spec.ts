import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { RolService } from '../service/rol.service';

import { RolComponent } from './rol.component';

describe('Rol Management Component', () => {
  let comp: RolComponent;
  let fixture: ComponentFixture<RolComponent>;
  let service: RolService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RolComponent],
    })
      .overrideTemplate(RolComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RolComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(RolService);

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
    expect(comp.rols?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
