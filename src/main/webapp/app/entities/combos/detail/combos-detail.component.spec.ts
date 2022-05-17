import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CombosDetailComponent } from './combos-detail.component';

describe('Combos Management Detail Component', () => {
  let comp: CombosDetailComponent;
  let fixture: ComponentFixture<CombosDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CombosDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ combos: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CombosDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CombosDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load combos on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.combos).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
