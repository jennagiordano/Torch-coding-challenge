# Torch Coding Assessment

Youtube Video Walkthrough:

## Getting started

1. Fork and clone this repo.
2. `npm install`.
3. Create `torch-project` and `torch-project-test` databases.
4. `npm run seed`.
5. Start the build process and the application with: `npm run start-dev`. If you're using Windows, you may need to execute `npm run start-server` and `npm run build-watch` separately (in their own terminal tabs).
6. Navigate to [localhost:1337](http://localhost:1337)

### The Premise

For this exercise, you can use any language, libraries, or frameworks that you like, and consult Google and any other on-line or off-line written resources you wish. While there is not a strict time limit, the exercise is sized so that it should take approximately two to three hours of your time.

We recommend you choose a language and (if applicable) framework that you’re comfortable with. We’ll want to see a realistic example of what you might write for a production application, even if the stack is different from what we use ourselves.

### Exercise

Your task is to create a modified interface to the NYC Subway status dashboard available online, with history information and the rudiments of a basic alerting feature.

In brief, https://new.mta.info/ includes a service status element, screenshotted below.

### Details

A line is considered delayed if the status is equal to “Delays” in the above table, and is considered not to be delayed if it has any other status. Note that this means that we’re ignoring distinctions among other statuses like “Planned Work” — for the purpose of this project, all statuses other than “Delays” are equivalent.

Your task is to create a small web service that does the following things:

- Continuously monitors the status of MTA service to see whether a line is delayed or not.

  - When a line transitions from not delayed → delayed, you should print the following message to console or to a logfile: “Line <line_name> is experiencing delays”.
  - Similarly, when a line transitions from delayed → not delayed, you should print the following message to console or to a logfile: “Line <line_name> is now recovered”.

- Exposes an endpoint called /status, which takes the name of a particular line as an argument and returns whether or not the line is currently delayed.
- Exposes an endpoint called /uptime, which also takes the name of a particular line as an argument and returns the fraction of time that it has not been delayed since inception.
  More concretely, “uptime” is defined as 1 - (total_time_delayed / total_time)

With the above in mind, you have wide latitude in deciding how your API works. If you think other arguments would be helpful for your API, you’re free to add them in addition to the arguments described above. Similarly, you can use whatever serialization format you’re comfortable with.
