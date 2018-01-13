import tl = require('vsts-task-lib/task');
import trm = require('vsts-task-lib/toolrunner');


async function run() {
    try {       
       
        const { WebClient  } = require('@slack/client');
        
        let tool: trm.ToolRunner;

        if (process.platform == "win32") {
            let cmdPath = tl.which('cmd');
            console.log(cmdPath);
            tool = tl.tool(cmdPath).arg('/c').arg('echo ' + tl.getInput('webhookurl', true));
        }

        let whUrl: string = tl.getInput("webhookurl", true);        
        let recipient: String = tl.getInput("target");
        let senderAlias: String = tl.getInput("sender");
        let messageBody: String = tl.getInput("messageBody");

        const { IncomingWebhook } = require('@slack/client');
        const webhook = new IncomingWebhook(whUrl);

        // Send simple text to the webhook channel
        let msg = {text: messageBody, username: senderAlias, channel: recipient }
        webhook.send(msg, function(err, res) {
            if (err) {
                console.log('Error:', err);
            } else {
                console.log('Message sent!!!');
            }
        });
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();