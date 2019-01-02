import convict from 'convict';

const config = convict({
    jirarestapi: {
        credentials: {
            doc: 'Your jira credentials in the format of username:password',
            default: '',
            format: String,
            env: 'JIRA_CREDS'
        }
    }
});

export default config;
