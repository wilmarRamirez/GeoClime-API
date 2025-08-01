import { SummaryZoneService } from '../../../src/domain/services/summaryZone.service';
import { describe, it } from 'node:test';
import assert from 'node:assert';
import { mockRecords } from '../../mock/record';

const testService = () => {
  const summaryZoneService = new SummaryZoneService();

  const summaryZone = summaryZoneService.summary(mockRecords);

  assert.deepStrictEqual(summaryZone, {
    zone: 'A',
    averageTemperature: 24.028571428571432,
    minTemperature: 20,
    maxTemperature: 28.3,
    recordsCount: 7,
  });
};

const testServiceNull = () => {
  const summaryZoneService = new SummaryZoneService();

  const summaryZone = summaryZoneService.summary([]);

  assert.strictEqual(summaryZone, null);
};

describe('- test Summary Zone Service', () => {
  it('-- should return correct summary for valid records', () => {
    testService();
  });

  it('-- should return null for empty records array', () => {
    testServiceNull();
  });
});
