import { Infestation } from './../js/infestation.js';

describe('infestation', function() {
  let infestation;
  beforeEach(function() {
    infestation = new Infestation("tiny velociraptors", "Downtown");
  });

  it('initalizes cure to false', function () {
    expect(infestation.cured).toEqual(false);
  });
  
});
