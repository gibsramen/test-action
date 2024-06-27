const core = require('@actions/core');
const github = require('@actions/github');

try {
    const bruno_user = core.getInput('bruno_user');
    const url = core.getInput('url');
    const repository = core.getInput('repository');
    const org_regex = /czbiohub-sf\//

    const command = (
        'ssh -i ~/.ssh/gh_action '
            + bruno_user + '@' + url
            + ' submit_runner '
            + repository.replace(org_regex, '')
    );
    core.setOutput("command", command);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`Repo name: ${payload.repository.name}`);
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}
