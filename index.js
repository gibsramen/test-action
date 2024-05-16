const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const memory = core.getInput('memory');
  console.log(`Memory: ${memory}!`);
  const slurm_command = "sbatch my_script.sh --mem=".concat(memory);
  core.setOutput("slurm_command", slurm_command);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
