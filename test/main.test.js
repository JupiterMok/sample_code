import assert from 'assert';
import '../src/common/extend.js';

describe('main test', function () {
  describe('test sample', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });

  describe('test date', function () {
    it('date Test', function () {
      const datestrue = [
        { sdate: '2023-08-09T00:00:00.000', edate: '2023-08-09T01:00:00.000' }, //  오류 시간 역행
        // { sdate: null, edate: '2023-08-09T00:00:00.000' }, //  오류 시간 null
        { sdate: '2023-08-09T00:00:00.000', edate: null } //  오류 시간 null
      ];
      const datesfalse = [
        { sdate: '2023-08-09T00:00:00.000', edate: '2023-08-09T00:00:00.000' }, //  오류 시간 동일
        { sdate: '2023-08-09T01:00:00.000', edate: '2023-08-09T00:00:00.000' } //  오류 시간 역행
      ];

      let datetype = '2023-08-209T00:00:00.000';
      datetype = new Date(datetype);
      assert.ok(!datetype.isValid(), 'sdate.isValid');

      for (const data of datestrue) {
        const currentDate = new Date();
        const fifteenDaysInMillis = 365 * 24 * 60 * 60 * 1000; // 15일 전
        const fifteenDaysAgo = new Date(currentDate.getTime() - fifteenDaysInMillis);

        const sdate = (data.sdate || null) === null ? fifteenDaysAgo : new Date(data.sdate);
        const edate = (data.edate || null) === null ? new Date() : new Date(data.edate);

        assert.ok(sdate.isValid(), 'assert.ok sdate.isValid');
        assert.ok(edate.isValid(), 'assert.ok edate.isValid');
        assert.ok(sdate.getTime() < edate.getTime(), 'assert.ok sdate < edate');
      }

      for (const data of datesfalse) {
        const currentDate = new Date();
        const fifteenDaysInMillis = 365 * 24 * 60 * 60 * 1000; // 15일 전
        const fifteenDaysAgo = new Date(currentDate.getTime() - fifteenDaysInMillis);

        const sdate = (data.sdate || null) === null ? fifteenDaysAgo : new Date(data.sdate);
        const edate = (data.edate || null) === null ? new Date() : new Date(data.edate);

        assert.ok(!(sdate.getTime() < edate.getTime()), 'assert.notok sdate < edate');
      }
    });
  });
});
