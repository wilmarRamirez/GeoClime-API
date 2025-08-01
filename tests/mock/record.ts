export const mockRecords = [
  { timestamp: new Date('2023-01-01T01:00:00Z'), temperature: 21.6, zone: 'A' },
  { timestamp: new Date('2023-01-01T00:00:00Z'), temperature: 20, zone: 'A' },
  { timestamp: new Date('2023-01-01T02:00:00Z'), temperature: 23.3, zone: 'A' },
  { timestamp: new Date('2023-01-01T03:00:00Z'), temperature: 23.4, zone: 'A' },
  { timestamp: new Date('2023-01-01T04:00:00Z'), temperature: 25.0, zone: 'A' },
  { timestamp: new Date('2023-01-01T05:00:00Z'), temperature: 26.6, zone: 'A' },
  { timestamp: new Date('2023-01-01T06:00:00Z'), temperature: 28.3, zone: 'A' },
];

export const mockResponse = [
  [
    {
      timestamp: new Date('2023-01-01T00:00:00.000Z'),
      temperature: 20,
      zone: 'A',
    },
    {
      timestamp: new Date('2023-01-01T01:00:00.000Z'),
      temperature: 21.6,
      zone: 'A',
    },
    {
      timestamp: new Date('2023-01-01T02:00:00.000Z'),
      temperature: 23.3,
      zone: 'A',
    },
  ],
  [
    {
      timestamp: new Date('2023-01-01T03:00:00.000Z'),
      temperature: 23.4,
      zone: 'A',
    },
    {
      timestamp: new Date('2023-01-01T04:00:00.000Z'),
      temperature: 25,
      zone: 'A',
    },
    {
      timestamp: new Date('2023-01-01T05:00:00.000Z'),
      temperature: 26.6,
      zone: 'A',
    },
    {
      timestamp: new Date('2023-01-01T06:00:00.000Z'),
      temperature: 28.3,
      zone: 'A',
    },
  ],
];
