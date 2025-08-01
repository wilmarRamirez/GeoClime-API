import { AnomalyDetectorService } from '../../../src/domain/services/anomalyDetector.service';
import { describe, it } from 'node:test';
import assert from 'node:assert';
import { mockRecords, mockResponse } from '../../mock/record';

const testService = () => {
  const service = new AnomalyDetectorService();
  const dectet = service.detect(mockRecords);
  assert.deepStrictEqual(dectet, mockResponse);
};

describe('', () => {
  it('', testService);
});
