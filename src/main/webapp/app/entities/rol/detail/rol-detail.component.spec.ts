import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RolDetailComponent } from './rol-detail.component';

describe('Rol Management Detail Component', () => {
  let comp: RolDetailComponent;
  let fixture: ComponentFixture<RolDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RolDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ rol: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(RolDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(RolDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load rol on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.rol).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
