import config from './config';
import axios from 'axios';

require('superagent-bluebird-promise');

/**
 * @param {Mozaik} mozaik
 */
const advancedClient = mozaik => {
    mozaik.loadApiConfig(config);

    const methods = {
        advancedissues(params) {
            const {
                baseurl,
                projectSlug,
                displayVersion
            } = params;

            const credentials = config.get('jirarestapi.credentials');

            if(!credentials){
                throw ("JIRA_CREDS is required in .env.");
            }
            if(!baseurl){
                throw("baseurl is required in config.js.");
            }
            if(!projectSlug){
                throw("projectslug is required in config.js.");
            }
            if(!displayVersion){
                throw("displayVersion is required in config.js.");
            }

            const base64 = new Buffer(credentials).toString('base64');

            const headers = {
                headers: {
                    "Authorization": "Basic " + base64,
                    "Content-Type": "application/json"
                }
            };

            return axios.all([
                axios.get(baseurl + '/rest/api/2/project/'+ projectSlug +'/versions', headers),
                axios.get(baseurl + '/rest/api/2/project/' + projectSlug, headers)
            ])
                .then(axios.spread(function(response1, response2) {
                    const versionID = response1.data.map(function(version){
                        const vId = version.id;

                        return vId;
                    });

                    const int = '-' + displayVersion;

                    const verID = versionID.slice(int)[0];

                    const projectID = response2.data.id;

                    return axios.all([
                        axios.get(baseurl + '/rest/api/2/search?jql=project = ' + projectID + ' AND fixVersion = ' + verID + ' ORDER BY priority DESC, key ASC', headers),
                        axios.get(baseurl + '/rest/api/2/search?jql=status IN ("New") AND project = ' + projectID + ' AND fixVersion = ' + verID + ' ORDER BY priority DESC, key ASC', headers),
                        axios.get(baseurl + '/rest/api/2/search?jql=status IN ("ready") AND project = ' + projectID + ' AND fixVersion = ' + verID + ' ORDER BY priority DESC, key ASC', headers),
                        axios.get(baseurl + '/rest/api/2/search?jql=status IN ("TO-BE-PREPARED") AND project = ' + projectID + ' AND fixVersion = ' + verID + ' ORDER BY priority DESC, key ASC', headers),
                        axios.get(baseurl + '/rest/api/2/search?jql=status IN ("READY-FOR-ESTIMATION") AND project = ' + projectID + ' AND fixVersion = ' + verID + ' ORDER BY priority DESC, key ASC', headers),
                        axios.get(baseurl + '/rest/api/2/search?jql=status IN ("Development") AND project = ' + projectID + ' AND fixVersion = ' + verID + ' ORDER BY priority DESC, key ASC', headers),
                        axios.get(baseurl + '/rest/api/2/search?jql=status IN ("Code review") AND project = ' + projectID + ' AND fixVersion = ' + verID + ' ORDER BY priority DESC, key ASC', headers),
                        axios.get(baseurl + '/rest/api/2/search?jql=status IN ("Blocked") AND project = ' + projectID + ' AND fixVersion = ' + verID + ' ORDER BY priority DESC, key ASC', headers),
                        axios.get(baseurl + '/rest/api/2/search?jql=status IN ("Deployed to dev") AND project = ' + projectID + ' AND fixVersion = ' + verID + ' ORDER BY priority DESC, key ASC', headers),
                        axios.get(baseurl + '/rest/api/2/search?jql=status IN ("TestedbyPO") AND project = ' + projectID + ' AND fixVersion = ' + verID + ' ORDER BY priority DESC, key ASC', headers),
                        axios.get(baseurl + '/rest/api/2/search?jql=status IN ("done") AND project = ' + projectID + ' AND fixVersion = ' + verID + ' ORDER BY priority DESC, key ASC', headers),
                        axios.get(baseurl + '/rest/api/2/search?jql=status IN ("deployed to staging") AND project = ' + projectID + ' AND fixVersion = ' + verID + ' ORDER BY priority DESC, key ASC', headers),
                        axios.get(baseurl + '/rest/api/2/project/'+ projectSlug +'/version', headers)
                    ])
                        .then(axios.spread(function (response1, response2, response3, response4, response5, response6, response7, response8, response9, response10, response11, response12, response13) {
                            const iInVersion = response1.data.issues.map(function(issues){
                                const arrayConstructor = "{" + '"Issues In Version": "' + issues.key + '", "Issues New" : "", "Issues Ready": "", "Issues To be prepare": "", "Issues Ready to estimation": "", "Issues In Developement": "", "Issues In Code Review": "", "Issues Blocked": "", "Issues Deployed to dev": "", "Issues TestedbyPO": "", "Issues Done": "", "Issues deployed to staging": ""}';

                                return arrayConstructor
                            });

                            const iReported = response2.data.issues.map(function(issues){
                                const arrayConstructor = "{" + '"Issues In Version": "", "Issues New" : "' + issues.key + '", "Issues Ready": "", "Issues To be prepare": "", "Issues Ready to estimation": "", "Issues In Developement": "", "Issues In Code Review": "", "Issues Blocked": "", "Issues Deployed to dev": "", "Issues TestedbyPO": "", "Issues Done": "", "Issues deployed to staging": ""}';

                                return arrayConstructor
                            });

                            const iConfirmed = response3.data.issues.map(function(issues){
                                const arrayConstructor = "{" + '"Issues In Version": "", "Issues New" : "", "Issues Ready": "' + issues.key + '", "Issues To be prepare": "", "Issues Ready to estimation": "", "Issues In Developement": "", "Issues In Code Review": "", "Issues Blocked": "", "Issues Deployed to dev": "", "Issues TestedbyPO": "", "Issues Done": "", "Issues deployed to staging": ""}';

                                return arrayConstructor
                            });

                            const iToDo = response4.data.issues.map(function(issues){
                                const arrayConstructor = "{" + '"Issues In Version": "", "Issues New" : "", "Issues Ready": "", "Issues To be prepare": "' + issues.key + '", "Issues Ready to estimation": "", "Issues In Developement": "", "Issues In Code Review": "", "Issues Blocked": "", "Issues Deployed to dev": "", "Issues TestedbyPO": "", "Issues Done": "", "Issues deployed to staging": ""}';

                                return arrayConstructor
                            });

                            const iInProgress = response5.data.issues.map(function(issues){
                                const arrayConstructor = "{" + '"Issues In Version": "", "Issues New" : "", "Issues Ready": "", "Issues To be prepare": "", "Issues Ready to estimation": "' + issues.key + '", "Issues In Developement": "", "Issues In Code Review": "", "Issues Blocked": "", "Issues Deployed to dev": "", "Issues TestedbyPO": "", "Issues Done": "", "Issues deployed to staging": ""}';

                                return arrayConstructor
                            });

                            const iInCodeReview = response6.data.issues.map(function(issues){
                                const arrayConstructor = "{" + '"Issues In Version": "", "Issues New" : "", "Issues Ready": "", "Issues To be prepare": "", "Issues Ready to estimation": "", "Issues In Developement": "' + issues.key + '", "Issues In Code Review": "", "Issues Blocked": "", "Issues Deployed to dev": "", "Issues TestedbyPO": "", "Issues Done": "", "Issues deployed to staging": ""}';

                                return arrayConstructor
                            });

                            const iMerged = response7.data.issues.map(function(issues){
                                const arrayConstructor = "{" + '"Issues In Version": "", "Issues New" : "", "Issues Ready": "", "Issues To be prepare": "", "Issues Ready to estimation": "", "Issues In Developement": "", "Issues In Code Review": "' + issues.key + '", "Issues Blocked": "", "Issues Deployed to dev": "", "Issues TestedbyPO": "", "Issues Done": "", "Issues deployed to staging": ""}';

                                return arrayConstructor
                            });

                            const iReadyForTesting = response8.data.issues.map(function(issues){
                                const arrayConstructor = "{" + '"Issues In Version": "", "Issues New" : "", "Issues Ready": "", "Issues To be prepare": "", "Issues Ready to estimation": "", "Issues In Developement": "", "Issues In Code Review": "", "Issues Blocked": "' + issues.key + '", "Issues Deployed to dev": "", "Issues TestedbyPO": "", "Issues Done": "", "Issues deployed to staging": ""}';

                                return arrayConstructor
                            });

                            const iInTesting = response9.data.issues.map(function(issues){
                                const arrayConstructor = "{" + '"Issues In Version": "", "Issues New" : "", "Issues Ready": "", "Issues To be prepare": "", "Issues Ready to estimation": "", "Issues In Developement": "", "Issues In Code Review": "", "Issues Blocked": "", "Issues Deployed to dev": "' + issues.key + '", "Issues TestedbyPO": "", "Issues Done": "", "Issues deployed to staging": ""}';

                                return arrayConstructor
                            });

                            const iPassedTesting = response10.data.issues.map(function(issues){
                                const arrayConstructor = "{" + '"Issues In Version": "", "Issues New" : "", "Issues Ready": "", "Issues To be prepare": "", "Issues Ready to estimation": "", "Issues In Developement": "", "Issues In Code Review": "", "Issues Blocked": "", "Issues Deployed to dev": "", "Issues TestedbyPO": "' + issues.key + '", "Issues Done": "", "Issues deployed to staging": ""}';

                                return arrayConstructor
                            });

                            const iFailedTesting = response11.data.issues.map(function(issues){
                                const arrayConstructor = "{" + '"Issues In Version": "", "Issues New" : "", "Issues Ready": "", "Issues To be prepare": "", "Issues Ready to estimation": "", "Issues In Developement": "", "Issues In Code Review": "", "Issues Blocked": "", "Issues Deployed to dev": "", "Issues TestedbyPO": "", "Issues Done": "' + issues.key + '", "Issues deployed to staging": ""}';

                                return arrayConstructor
                            });

                            const iDone = response12.data.issues.map(function(issues){
                                const arrayConstructor = "{" + '"Issues In Version": "", "Issues New" : "", "Issues Ready": "", "Issues To be prepare": "", "Issues Ready to estimation": "", "Issues In Developement": "", "Issues In Code Review": "", "Issues Blocked": "", "Issues Deployed to dev": "", "Issues TestedbyPO": "", "Issues Done": "", "Issues deployed to staging": "' + issues.key + '"}';

                                return arrayConstructor
                            });

                            const version = response13.data.values.map(function(values){
                                const versions = values.name;

                                return versions
                            });

                            const cVersion = version.slice(int)[0];

                            const iInVersionToString = iInVersion.toString();

                            const iReportedToString = iReported.toString();

                            const iConfirmedToString = iConfirmed.toString();

                            const iToDoToString = iToDo.toString();

                            const iInProgressToString = iInProgress.toString();

                            const iInCodeReviewToString = iInCodeReview.toString();

                            const iMergedToString = iMerged.toString();

                            const iReadyForTestingToString = iReadyForTesting.toString();

                            const iInTestingToString = iInTesting.toString();

                            const iPassedTestingToString = iPassedTesting.toString();

                            const iFailedTestingToString = iFailedTesting.toString();

                            const iDoneToString = iDone.toString();

                            const a1 = JSON.parse("[" + iInVersionToString + "]"),
                                a2 = JSON.parse("[" + iReportedToString + "]"),
                                a3 = JSON.parse("[" + iConfirmedToString + "]"),
                                a4 = JSON.parse("[" + iToDoToString + "]"),
                                a5 = JSON.parse("[" + iInProgressToString + "]"),
                                a6 = JSON.parse("[" + iInCodeReviewToString + "]"),
                                a7 = JSON.parse("[" + iMergedToString + "]"),
                                a8 = JSON.parse("[" + iReadyForTestingToString + "]"),
                                a9 = JSON.parse("[" + iInTestingToString + "]"),
                                a10 = JSON.parse("[" + iPassedTestingToString + "]"),
                                a11 = JSON.parse("[" + iFailedTestingToString + "]"),
                                a12 = JSON.parse("[" + iDoneToString + "]"),
                                a13 = JSON.parse("[" + iDoneToString + "]");

                            const advancedTable = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12].reduce((r, a) => (a.forEach((o, i) => {
                                r[i] = r[i] || {};
                                Object.keys(o).forEach(k => r[i][k] = r[i][k] || o[k] || '');
                            }), r), []);


                            return {
                                advancedTable,
                                cVersion
                            };
                        }))
                        .catch(err => {
                            console.error(err, err.stack);
                        });


                }))
                .catch(err => {
                    if(err.response && err.response.status){
                        if(err.response.status === 404){
                            console.log("ERROR: A http 404 error occured, please check your configuration.");
                            const error = 404;
                            return{
                                error
                            };
                        }
                    }
                    if(err.code){
                        if(err.code === 'ETIMEDOUT'){
                            console.log("ERROR: A ETIMEDOUT error occured, please check your configuration.");
                            const error = 'ETIMEDOUT';
                            return{
                                error
                            };
                        }
                    }
                    else
                    {
                        if(err.response.code === 'ETIMEDOUT'){
                            console.log("ERROR: A ETIMEDOUT error occured, please check your configuration.");
                            const error = 'ETIMEDOUT';
                            return{
                                error
                            };
                        }
                    }
                });

        },
        count(params) {
            const {
                baseurl,
                projectSlug,
                displayVersion,
                display
            } = params;

            const credentials = config.get('jirarestapi.credentials');

            if (!credentials) {
                throw ("JIRA_CREDS is required in .env.");
            }
            if (!baseurl) {
                throw("baseurl is required in config.js.");
            }
            if (!projectSlug) {
                throw("projectslug is required in config.js.");
            }
            if (!displayVersion) {
                throw("displayVersion is required in config.js.");
            }
            if (!display) {
                throw("display is required in config.js.");
            }

            const base64 = new Buffer(credentials).toString('base64');

            const headers = {
                headers: {
                    "Authorization": "Basic " + base64,
                    "Content-Type": "application/json"
                }
            };

            return axios.all([
                axios.get(baseurl + '/rest/api/2/project/' + projectSlug + '/versions', headers),
                axios.get(baseurl + '/rest/api/2/project/' + projectSlug, headers)
            ])
                .then(axios.spread(function (res1, res2) {
                    const versionID = res1.data.map(function (version) {
                        const vId = version.id;

                        return vId;
                    });

                    const int = '-' + displayVersion;

                    const verID = versionID.slice(int)[0];

                    const projectID = res2.data.id;

                    if (display === "version") {
                        return axios.get(baseurl + '/rest/api/2/project/' + projectSlug + '/version', headers)
                            .then(function (res) {
                                const version = res.data.values.map(function (values) {
                                    const versions = values.name;

                                    return versions
                                });

                                const int = '-' + displayVersion;

                                const count = version.slice(int)[0];

                                return {
                                    count,
                                    display
                                };
                            })
                            .catch(err => {
                                console.error(err, err.stack);
                            });
                    }

                    if (display === "In Version") {
                        return axios.get(baseurl + '/rest/api/2/search?jql=project = ' + projectID + ' AND fixVersion = ' + verID + ' ORDER BY priority DESC, key ASC', headers)
                            .then(function (res) {
                                const count = res.data.total;

                                return {
                                    count,
                                    display
                                };
                            })
                            .catch(err => {
                                console.error(err, err.stack);
                            });
                    } else {
                        if (display === "New" || display === "In Progress" || display === "Done") {
                            return axios.get(baseurl + '/rest/api/2/search?jql=statusCategory = "' + display + '" AND project = ' + projectID + ' AND fixVersion = ' + verID + ' ORDER BY priority DESC, key ASC', headers)
                                .then(function (res) {
                                    const count = res.data.total;

                                    return {
                                        count,
                                        display
                                    };
                                })
                                .catch(err => {
                                    if (err.response && err.response.status) {
                                        if (err.response.status === 404) {
                                            console.log("ERROR: A http 404 error occured, please check your configuration.");
                                            const error = 404;
                                            return {
                                                error
                                            };
                                        }
                                        if (err.response.status === 400) {
                                            console.log("ERROR: A http 400 error occured, please check your configuration.");
                                            const error = 400;
                                            return {
                                                error
                                            };
                                        }
                                    }
                                    if (err.code === 'ETIMEDOUT') {
                                        console.log("ERROR: A ETIMEDOUT error occured, please check your configuration.");
                                        const error = 'ETIMEDOUT';
                                        return {
                                            error
                                        };
                                    }
                                });
                        } else {
                            return axios.get(baseurl + '/rest/api/2/search?jql=status = "' + display + '" AND project = ' + projectID + ' AND fixVersion = ' + verID + ' ORDER BY priority DESC, key ASC', headers)
                                .then(function (res) {
                                    const count = res.data.total;

                                    return {
                                        count,
                                        display
                                    };
                                })
                                .catch(err => {
                                    if (err.response && err.response.status) {
                                        if (err.response.status === 404) {
                                            console.log("ERROR: A http 404 error occured, please check your configuration.");
                                            const error = 404;
                                            return {
                                                error
                                            };
                                        }
                                        if (err.response.status === 400) {
                                            console.log("ERROR: A http 400 error occured, please check your configuration.");
                                            const error = 400;
                                            return {
                                                error
                                            };
                                        }
                                    }
                                    if (err.code === 'ETIMEDOUT') {
                                        console.log("ERROR: A ETIMEDOUT error occured, please check your configuration.");
                                        const error = 'ETIMEDOUT';
                                        return {
                                            error
                                        };
                                    }
                                });
                        }
                    }

                }))
                .catch(err => {
                    if (err.response && err.response.status) {
                        if (err.response.status === 404) {
                            console.log("ERROR: A http 404 error occured, please check your configuration.");
                            const error = 404;
                            return {
                                error
                            };
                        }
                    }
                    if (err.code) {
                        if (err.code === 'ETIMEDOUT') {
                            console.log("ERROR: A ETIMEDOUT error occured, please check your configuration.");
                            const error = 'ETIMEDOUT';
                            return {
                                error
                            };
                        }
                    } else {
                        if (err.response.code === 'ETIMEDOUT') {
                            console.log("ERROR: A ETIMEDOUT error occured, please check your configuration.");
                            const error = 'ETIMEDOUT';
                            return {
                                error
                            };
                        }
                    }
                });
        }

    };

    return methods;
};

export default advancedClient;