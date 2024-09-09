// reportWebVitals.test.js

import reportWebVitals from './reportWebVitals';

// Mock des fonctions de web-vitals
jest.mock('web-vitals', () => ({
  getCLS: jest.fn(),
  getFID: jest.fn(),
  getFCP: jest.fn(),
  getLCP: jest.fn(),
  getTTFB: jest.fn(),
}));

describe('reportWebVitals', () => {
  const { getCLS, getFID, getFCP, getLCP, getTTFB } = require('web-vitals');

  beforeEach(() => {
    getCLS.mockClear();
    getFID.mockClear();
    getFCP.mockClear();
    getLCP.mockClear();
    getTTFB.mockClear();
  });

  it('should not call performance functions if onPerfEntry is not a function', async () => {
    const onPerfEntry = null;

    await reportWebVitals(onPerfEntry);

    expect(getCLS).not.toHaveBeenCalled();
    expect(getFID).not.toHaveBeenCalled();
    expect(getFCP).not.toHaveBeenCalled();
    expect(getLCP).not.toHaveBeenCalled();
    expect(getTTFB).not.toHaveBeenCalled();
  });
});