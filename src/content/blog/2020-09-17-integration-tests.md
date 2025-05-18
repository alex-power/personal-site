---
title: "Integration Tests: The Key to Reliable Software"
date: "2020-09-17T00:00:00.000Z"
excerpt: "Learn how integration tests can help you build more reliable software and catch issues before they reach production."
tags: ["Testing", "Software Development", "Best Practices"]
image: "/assets/kelly-sikkema-YK0HPwWDJ1I-unsplash.webp"
imageCaption: "Photo by Kelly Sikkema on Unsplash"
---

#### Testing from a high-level will improve your awareness of the feature, and keep you focused on the end goal.

In my consulting work for investment banks, I have been creating a set of microservices running on an internal private cloud. This application is critical to the build-out plan of a new product that has recently gone live with our first client. Prior to go-live, we had been performing Production releases as frequently as twice a week. The cause and issues with that is a topic for its own post -integration testing how we managed to support frequent Production releases as a small 5 person dev team. I've become a much better programmer thanks to the ordeal.

# What is an Integration Test?

Integration testing (sometimes called integration and testing, abbreviated I&T) is the phase in software testing in which individual software modules are combined and tested as a group. Integration testing is conducted to evaluate the compliance of a system or component with specified functional requirements.
-Wikipedia, Integration Testing

The key takeaway is that integration testing validates that your application does the right thing.
This is as opposed to Unit Testing, which tests that a particular component does the thing right.
Okay sure, but shouldn't those be the same thing?

Unfortunately, no. Let's walk through an example.

Say your application is responsible for keeping track of a customer's account balance. When a transaction occurs, the account balance should change to by the amount of the transaction, and be available for a query via RESTful API. This is our feature.
You might create a few components:
* A REST controller to expose an endpoint to process a transaction event
* A data access object to store and retrieve the transaction
* A service to calculate the account balance based upon the transaction(s)
* A REST controller to expose the account balance

Your Unit tests will validate that each individual component functions as expected - it does the thing right. However, it is clear that none of these tests validate that the feature has been implemented per the specification.

# Enter: The Integration Test

An integration test would test your application at the feature level. It tests that the integration of your components has the functionality that is expected. I've heard integration tests referred to as functional tests or regression tests as well. Let's look at an example in pseudo-code:
{% highlight java %}
fun test() { 
  app.start() 
  assert GET /TEST_USER/balance is 0 
  POST /TEST_USER/transaction {... "quantity": 42 ...} 
  assert GET /TEST_USER/balance is 42 
}
{% endhighlight %}

This test validates our feature does what we said it would. This kind of test lends itself to brevity.
Integration Tests Ensure You Test What Matters: The Feature

It's easy to spend your dev time focused on writing clean, modular components. We all feel the itch to create something beautiful, even if no one will ever see it. Writing beautiful code without purpose is vanity. The process of writing a true integration test will require you to engage with the application in the context of the feature, rather than the technology.

Focusing on the feature will streamline the development process by keeping you focused on the end goal. After all, Stephen Covey's second habit is "Begin with the end in mind." This will also discourage developers from writing code that "might be needed later." Disclaimer: you should still write clean, modular components.

# Integration Testing In Practice

There are many ways to perform integration testing. The most obvious is to simply validate the functionality manually, in a lower order (non-Production) environment. Don't rely on this!

Not only will less effort go into validating all test cases for a feature, but the test will almost certainly not be repeated in future releases. Anyway, what kind of software engineers would we be if it wasn't automated? Integration tests should be:
* Automated in your CI/CD build pipeline
* Easy to run and edit during development
* Supported by a framework of fit-for-purpose code that makes writing and reading tests easier

# Example Integration Test Framework in Java

Across our micro-services, we have been using an abstract parent class IntegrationTest.java which uses Spring Boot's @SpringBootTest to start the application and handles mocking of all external dependencies. For external HTTP resources, we use Wiremock, databases use an in-memory DB like H2. We've gone so far as to write a custom implementation of AMPS message layer for tests.

We also write several custom factories for generating requests and test data, easy to use APIs for interacting with mocks, and canonical defaults for reference data. This significantly lowers the barrier to entry for writing tests.

All a developer needs to do is create a new class, extend the parent IntegrationTest.java, and start writing JUnit tests. Spring Boot will re-use the application's context where possible to lower the time spent running the tests.

Each test class represents a single feature. Tests within the test class outline real-world use cases and validate the actual output of the application, running in a test environment.

# Integration Tests Encode Features Into Your Application

As much as I love writing documentation, it doesn't always get done. Documentation is prone to being out of date (lying) as well. Well written integration tests are a living document of your features and make your application:
Clearer as to what code supports which features (which makes it easier for new developers to understand).
Safer to change because impacted features will need changes to their tests.

This is along the lines of what Behavior-Driven Development (BDD) is all about, but without all the Gherkin' around. Jokes aside, having non-technical stakeholders involved in writing tests is fantastic - but it also seems like a pipe dream. Ultimately, the responsibility to understand the needs of the user falls to the engineer.
When integration tests are the primary testing method developers use, Unit Tests are not needed as much. If all of your application's features are encoded in tests, all of your code should be covered. Better yet, all of your components will be tested in the context of the feature. Any components or branches not covered by an integration test are extraneous.
# Key Takeaways

Integration tests test that your application does the right thing.
You should test what counts: the feature.
Features should be encoded in your integration test framework.
Integration tests should be easy to write, update, and have some method of enforcement via automation.
Integration tests should make your application clearer and safer.