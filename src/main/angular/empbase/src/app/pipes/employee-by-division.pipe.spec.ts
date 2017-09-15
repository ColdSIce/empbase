import { EmployeeByDivisionPipe } from './employee-by-division.pipe';

describe('EmployeeByDivisionPipe', () => {
  it('create an instance', () => {
    const pipe = new EmployeeByDivisionPipe();
    expect(pipe).toBeTruthy();
  });
});
