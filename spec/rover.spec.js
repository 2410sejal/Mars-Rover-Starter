const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts",function(){
    const roverObject = new Rover(1234);
    expect(roverObject.position).toEqual(1234);
    expect(roverObject.mode).toEqual("NORMAL");
    expect(roverObject.generatorWatts).toEqual(110);
    expect(roverObject).toEqual(
      expect.objectContaining({
        position:1234,
        mode:"NORMAL",
        generatorWatts:110
      })
    );
  });

  it("response returned by receiveMessage contains the name of the message",function(){
    const roverObject = new Rover(1234);
    const messageObject = new Message("MSG1");
    const response = roverObject.receiveMessage(messageObject);
    expect(response.message).toEqual("MSG1");
    // expect(response).toHaveProperty('message',"MSG1");
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message",function(){
    const roverObject = new Rover(121212);
    const commandArray = [
      new Command('MODE_CHANGE', 'LOW_POWER'), 
      new Command('STATUS_CHECK')
    ];
    const messageObject = new Message('MSG2', commandArray);
    const response = roverObject.receiveMessage(messageObject);
    expect(response.results).toHaveLength(2);
    // expect(response.results.length).toBe(2);
  });

  it("responds correctly to the status check command",function(){
    const roverObject = new Rover(98382);
    const commandArray = [
      new Command('STATUS_CHECK')
    ];
    const messageObject = new Message('MSG3', commandArray);
    const response = roverObject.receiveMessage(messageObject);

    expect(response.results[0].completed).toBe(true);
    expect(response.results[0].roverStatus).toEqual({
      mode: 'NORMAL',
      generatorWatts: 110,
      position: 98382
    });

    // expect(response.results).toEqual(
    //   expect.arrayContaining([
    //       expect.objectContaining({
    //         completed: true, 
    //         roverStatus: { mode: 'LOW_POWER', generatorWatts: 110, position: 98382 }
    //       })
    //   ])
    // );
  })

  it("responds correctly to the mode change command",function(){
    const roverObject = new Rover(100);
    const messageObject = new Message('MSG4', [new Command('MODE_CHANGE', 'LOW_POWER')]);
    const response = roverObject.receiveMessage(messageObject);
  
    expect(response.results[0].completed).toBe(true);
    expect(roverObject.mode).toEqual('LOW_POWER');
  });

  it('responds with a false completed value when attempting to move in LOW_POWER mode', () => {
    const roverObject = new Rover(100); 
    roverObject.mode = 'LOW_POWER'; // Set the mode to LOW_POWER
    const messageObject = new Message('MSG5', [new Command('MOVE', 200)]);
    const response = roverObject.receiveMessage(messageObject);
  
    expect(response.results[0].completed).toBe(false);
    expect(roverObject.position).toEqual(100); // Position should not be updated
  });

  it('responds with the position for the move command', () => {
    const roverObject = new Rover(100);
    const messageObject = new Message('TestMessage', [new Command('MOVE', 200)]);
    const response = roverObject.receiveMessage(messageObject);
  
    expect(response.results[0].completed).toBe(true);
    expect(roverObject.position).toEqual(200);
  });
   
});
