const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {

    it("throws error if a name is NOT passed into the constructor as the first parameter",function(){
        expect(function(){new Message();}).toThrow(new Error('Name is required.'));
    });

    it("constructor sets name",function(){
        let testmessage = new Message("Test message with two commands");
        expect(testmessage).toHaveProperty('name',"Test message with two commands");
    });

    it("contains a commands array passed into the constructor as the 2nd argument",function(){
        const commandArray = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
        const messageObject = new Message("Test message with two commands",commandArray);
        // OPTION1: Check whether following is a correct way of running a test case
        // expect(messageObject).toHaveProperty('commands',commandArray);

        // OPTION2: Using hardcoded Command objects array
        // expect(messageObject).toHaveProperty('commands',[{commandType:'MODE_CHANGE',value:'LOW_POWER'},{commandType:'STATUS_CHECK'}]);

        // OPTION3: USING arrayContaining method
        expect(messageObject.commands).toEqual(
            expect.arrayContaining([
                expect.any(Command)
            ])
        )
    })


});
