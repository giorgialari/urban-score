import { TestBed } from '@angular/core/testing';


import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;
    let fakeApi = 'abc123'


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  it("should add a error message", () => {
    const message = "Error message test";
    service.add(message);
    expect(service.messages.length).toBeGreaterThanOrEqual(1);
  });
  it("should remove a error message", () => {
    service.add("Error message test");
    service.clear();
    expect(service.messages.length).toBeLessThan(1);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
