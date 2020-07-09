var chai = require('chai');
var hmsTime = require('./index.js');

describe('HMS Seconds', function () {
    it('Should convert seconds', function () {
        chai.assert.equal(hmsTime(0), '0:00:00.000');
        chai.assert.equal(hmsTime(1), '0:00:01.000');
        chai.assert.equal(hmsTime(2.83), '0:00:02.830');
        chai.assert.equal(hmsTime(15), '0:00:15.000');
    });

    it('Should convert minutes', function () {
        chai.assert.equal(hmsTime(60), '0:01:00.000');
        chai.assert.equal(hmsTime(61), '0:01:01.000');
        chai.assert.equal(hmsTime(61.1231), '0:01:01.123');
        chai.assert.equal(hmsTime(120), '0:02:00.000');
        chai.assert.equal(hmsTime(130), '0:02:10.000');
    });

    it('Should convert hours', function () {
        chai.assert.equal(hmsTime(3600), '1:00:00.000');
        chai.assert.equal(hmsTime(3601), '1:00:01.000');
        chai.assert.equal(hmsTime(3660), '1:01:00.000');
        chai.assert.equal(hmsTime(9000), '2:30:00.000');
        chai.assert.equal(hmsTime(9030), '2:30:30.000');
    });

    it('Should convert milliseconds', function () {
        chai.assert.equal(hmsTime(0.5), '0:00:00.500');
        chai.assert.equal(hmsTime(0.05), '0:00:00.050');
        chai.assert.equal(hmsTime(0.005), '0:00:00.005');
        chai.assert.equal(hmsTime(1800.005), '0:30:00.005');
        chai.assert.equal(hmsTime(9059.1), '2:30:59.100');
    });

    it('Should limit the time returned to 9:59:59:999', function () {
        chai.assert.equal(hmsTime(20000000), '9:59:59.999');
    });

    describe('With simple flag', function () {
        it('Should only show milliseconds if hours and minutes are zero', function () {
            chai.assert.equal(hmsTime(0.5, true), '00.500');
        });

        it('Should only show hours if not zero', function () {
            chai.assert.equal(hmsTime(3600, true), '1:00:00');
            chai.assert.equal(hmsTime(1800.005, true), '30:00');
        });
    });
});
