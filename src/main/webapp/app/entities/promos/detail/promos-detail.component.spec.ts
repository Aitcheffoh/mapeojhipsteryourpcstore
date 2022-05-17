import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PromosDetailComponent } from './promos-detail.component';

describe('Promos Management Detail Component', () => {
  let comp: PromosDetailComponent;
  let fixture: ComponentFixture<PromosDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromosDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ promos: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PromosDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PromosDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load promos on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.promos).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
