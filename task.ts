import tl = require('vsts-task-lib/task');
import trm = require('vsts-task-lib/toolrunner');
import slack = require('slack');

async function run() {
    try {        
        let tool: trm.ToolRunner;

        if (process.platform == "win32") {
            tl.setResult(tl.TaskResult.Failed, "Task not supported");
            return;
        }

        let webhookurl: string = tl.getInput("webhookurl");
        let recipient: String = tl.getInput("target");
        let senderAlias: String = tl.getInput("sender");
        let messageBody: String = tl.getInput("messageBody");
        
        console.log('Task done! ');
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();