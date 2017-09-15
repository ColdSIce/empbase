import { EmployeeByFioPipe } from './employee-by-fio.pipe';

describe('EmployeeByFioPipe', () => {
  it('create an instance', () => {
    const pipe = new EmployeeByFioPipe();
    expect(pipe).toBeTruthy();
  });
});
