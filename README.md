# Mozaïk value widgets

Value widget for the [Mozaïk](https://www.npmjs.com/package/mozaik) dashboard framework.

## Preview

![value](http://i.imgur.com/95wSLY8.png)

## Value Widget Configuration

### Api Configuration

```javascript
api: {
    jirarestapi: {
        credentials: process.env.JIRA_CREDENTIALS
    }
},
```

### Environment variables

key                 | required | description                                                                  |example
--------------------|----------|------------------------------------------------------------------------------|-----------------------------
`credentials`       | yes      | *Your Jira Credentials in the format username:password*                      | "bill:mypassword"

### Dashboard Configuration example

```javascript
{

  title: "Latest Release in Development",
  columns: 1,
  rows:    4,
  widgets: [
    {
        type:               'jira.advancedissues',
        title:              'Latest Release in Development',
        baseurl:            'https://jira.example.co.uk',
        projectSlug:        'PRJ',
        displayVersion:     1, 
        columns: 1, rows: 3,
        x: 0, y: 0 
    },
    {
        type:               'jira.advancedprogress',
        title:              'Lastest Release Progress',
        baseurl:            'https://jira.example.co.uk',
        projectSlug:        'PRJ',
        graphID:            'graph3',
        graphHeight:        "147px",  
        displayVersion:     1, 
        columns: 1, rows: 1,
        x: 0, y: 3 
    },
    {
        type:               'jira.count',
        baseurl:            'https://jira.example.co.uk',
        projectSlug:        'PPW',
        display:            'Confirmed',
        displayVersion:     1, 
        columns: 1, rows: 1,
        x: 1, y: 0
    },
  ]
},
```

### Running tests

The tests require an environment variable, to set this run the following command to run tests with an environment variable:

```javascript
npm test
```

### Parameters for jira.advancedissues

key                 | required | description                                                                  |example
--------------------|----------|------------------------------------------------------------------------------|-----------------------------
`title`             | yes      | *The widget title*                                                           | "Lastest development version"
`baseurl`           | yes      | *Your Jira Base URL*                                                         | "https://jira.example.co.uk"
`projectSlug`       | yes      | *Your Jira Project ID/Slug*                                                  | "PRJ"
`displayVersion`    | yes      | *Choose which release version you want to display which 1 being the latest * | 1

### Parameters for jira.advancedprogress

key                 | required | description                                                                  |example
--------------------|----------|------------------------------------------------------------------------------|------------------------------
`title`             | yes      | *The widget title*                                                           |"Lastest development version progress"
`baseurl`           | yes      | *Your Jira Base URL*                                                         |"https://jira.example.co.uk"
`projectSlug`       | yes      | *Your Jira Project ID/Slug*                                                  |"PRJ"
`displayVersion`    | yes      | *Choose which release version you want to display which 1 being the latest * |1
`graphID`           | yes      | *Choose a unique ID for your graph*                                          |"projectGraph"
`graphHeight`       | no       | *Choose the height of your graph, default being 300px*                       |"250px"

### Parameters for jira.count

key                 | required | description                                                                  |example
--------------------|----------|------------------------------------------------------------------------------|------------------------------
`title`             | yes      | *The widget title*                                                           |"Lastest development version progress"
`baseurl`           | yes      | *Your Jira Base URL*                                                         |"https://jira.example.co.uk"
`projectSlug`       | yes      | *Your Jira Project ID/Slug*                                                  |"PRJ"
`displayVersion`    | yes      | *Choose which release version you want to display which 1 being the latest * |1
`display`           | yes      | *The status of which you want to display the number of tasks*                |"Confirmed"