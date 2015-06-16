var chai = require('chai');
var expect = chai.expect;
var loanStore =require('../../src/static/js/modules/loan-comparison/stores/loan-store.js');
// var  $ = require('jquery');
var  sinon = require('sinon');
//


describe('Loan store validation', function() {
 var $;
  before(function () {
    $ = require('jquery');
  });
 
  describe('loan store', function() {   
   it('should change downpayment percentage', function(){
    //given
    var loan = {'downpayment-percent': 0},
      prop = 'price';

      var fakePercentFunction = {"downpayment-percent":function(loan){return 25;}}
      var mortgageCalculations = sinon.mock(fakePercentFunction);

    //when
    loanStore.updateDependencies(loan, prop);

    expect(loan['downpayment-percent']).to.equal(25);
    //then
   });    
  });
  
  describe('loan type validation', function() {
    
    xit('Positive test - should return an error for a VA ARM loan', function() {
      expect(loanStore.validators['loan-type']({'rate-structure': 'arm', 'loan-type': 'va'})).to.exist()
    });
    
    xit('Positive test - should change FHA ARM loan to conventional', function() {
      var loan = {'rate-structure': 'arm', 'loan-type': 'fha'};
      loanStore.validators['loan-type'](loan);
      expect(loan['loan-type']).to.equal('conf')
    });
    
    xit('Negative test - should not return an error for a conventional ARM loan', function() {
      expect(loanStore.validators['loan-type']({'rate-structure': 'arm', 'loan-type': 'conf'})).not.to.exist();
    });
    
  });


});

