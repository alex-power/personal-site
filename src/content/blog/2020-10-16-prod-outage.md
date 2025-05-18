---
title: "How to Handle a Production Outage Like a Pro"
date: "2020-10-16T00:00:00.000Z"
excerpt: "Learn a fool-proof way to handle production outages with confidence and professionalism."
tags: ["DevOps", "Incident Response", "Best Practices"]
image: "/assets/prod_outage.webp"
imageCaption: "Image by www_slon_pics from Pixabay"
---

#### Handling production outages is a difficult task for even a seasoned developer. This is a fool-proof way to handle it like a pro.

This past Sunday I received an urgent call from my boss. The release was on Friday, but the operations team had just discovered a critical issue with the application.

I sighed, briefly complained to my wife, and logged in.

It's unusual for a developer to be in a position where the uncertainty and pressure are so high. As you climb the ranks of seniority, it happens more and more often. I've had the benefit of knowledgeable mentors to teach me a fool-proof way to handle any production outage.

Production outages will happen. They can be broken down into 3 phases: Discovery, Mitigation, and Follow-ups. Each phase has a distinct set of responsibilities and action steps for the developer.

### Discovery Phase

So I had just logged in and immediately hopped on a zoom call with my boss and a few support team members involved with the escalation of the issue. Immediately, the expectations are on me because I am the technical expert on the call. I must determine the root cause of the issue. My boss kindly summarized the issue for me.

> _The report generation is failing. There's a NullPointerException being thrown. This is the line of code and class where it's being thrown from._

> _- My Boss_

Hundreds of thoughts immediately cross my mind. Is this related to the release two days ago? What changed between when it was working shortly after the release and now? None of the code changes touched that component. What is the upstream dependency for that component? Is it user error?

> _You may immediately feel that you have a reputation to protect, but prematurely placing blame will leave your reputation in tatters._

Here is the first critical piece of advice: _During a production outage, always assume that the user is right, and there really is a big problem._ It is easy to immediately guess that the problem does not lie in your application. **This is a mistake.** You are the representative of your team. Don't start pointing fingers unless you are looking to make enemies. It could easily blowback on the rest of your team — and your performance review.

### Humility

**You must stay humble.** You may immediately feel that you have a reputation to protect, but prematurely placing blame will leave your reputation in tatters. Listen first, listen some more, and do your own investigation before you ever make a claim about the root cause of the issue.

Don't be afraid to ask for help at this phase. At this point, most of the non-technical people on the call are twiddling their thumbs, waiting for the issue to be resolved. Including them in the investigation will not only help you get to the root cause faster but also build up a sense of camaraderie.

It may be helpful to recommend splintering the call into different groups for deep-dive investigations, or calling a different subject matter expert on your team.

Once you are reasonably certain of the root cause, explain it to the other participants. Use simple language and try not to draw any conclusions about why the root cause occurred. Once I got confirmation from another team member that my root cause analysis was correct I was ready to move on to the next phase.

### Mitigation Phase

I discovered the root cause and explained it to the stakeholders on the issue call, it's time to have a brainstorming session. It immediately occurs to me how the issue could be mitigated. I briefly consider proposing it to the wider group.

Depending on your specific circumstances, it might make sense to take immediate action to restore service to users and discuss further mitigation afterward. More likely, however, is that there are a number of ways to mitigate the issue with their own pros and cons. Different stakeholders will have a different view on the relative priority of each of the pros and cons. Restoring service may not even be the immediate concern. It's important to take input from all stakeholders on potential solutions and their implications.

Ultimately, you will probably not be the final decision-maker. But it is your job to propose and explain various solutions, potential impacts, and recovery times. Staying open-minded will allow others to voice their valuable opinions and ideas. This will produce the best results.

You must not be afraid to voice your own opinion. Your unique experience and perspective will form an integral part of the solution, whether or not your exact idea is what eventually mitigates the issue. It's also important to be assertive and veto anything that simply will not work.

Once the mitigation strategy has been determined, perform any necessary technical actions to enact the strategy. Once mitigation is complete, you should move on to the final, most important phase — the post mortem email and follow-ups.

### Post-Mortem and Follow-Ups

I could see the sun peeking through my window, lifting the weight of stress off my shoulders. I was proud to have been able to resolve the issue before any business impact occurred.

My work not yet done. It's not enough to be able to resolve issues quickly. More important than resolving issues is preventing them from occurring in the first place. This is where the Post-Mortem email and follow-ups come in.

Your Post-Mortem email should contain:

1.  The issue reported.
2.  The issue's root cause.
3.  What you did to mitigate the issue.
4.  What you will do to prevent the issue in the future.

We have already determined #1–3 during the previous phases. Write them up clearly using a bulleted list and a rough timeline.

To instill a sense of peace in your stakeholders, you should write up exactly how this particular issue made its way into production. You should state the facts about how it was missed at each tollgate.

### Tollgates and Prevention

A tollgate is what it sounds like, a "stop and check" step. Tollgates catch bugs before they get to prod. There should be a factual explanation for how this bug got through each tollgate. Also include a follow-up item for each tollgate, where possible.

The unit testing suite did not cover this case because...  
1. An external dependency is not modeled correctly in the test cases.  
2. The unit tests didn't catch the boundary between components x and y.  
3. This case was not considered and therefore not tested.

The UAT tests did not catch the issue because...  
1. The UAT environment was not similar enough to prod.  
2. The test was not completed.  
3. The test failed but was written off as a (user error, environment issue, data quality issue)

The prod post-release checkouts did not catch the issue because...  
1. This issue was impossible to replicate in prod.  
2. The checkouts did not cover this scenario.

These are just a few examples. Make sure you stick to the facts. Allow your audience to reach their own conclusions. This reflects ownership in your product and a recognition that you don't have all the answers. Humility is your friend and will build trust with your stakeholders.

Assign a ticket to each missed tollgate and make sure your team knows about the ticket so it can be prioritized appropriately. In order to prevent this issue from occurring again, you must follow through on the changes you laid out above.

It's possible that the issue could come up prior to completing the required changes. In that case, it will save your skin to already have a ticket explaining how your team is going to keep it from happening again. This shows that you didn't forget to follow-up, rather you simply haven't been able to complete the follow-up.

If, on the other hand, you fail to create appropriate follow-ups, your stakeholders' trust in your application will nosedive. The application will permanently be branded as one that has "problems." Your team, incompetent. It's understandable to make a mistake once. If you and your team fail to learn from it, there will irreparably damage your reputation.

### Conclusion and Takeaways

A production issue can be broken down into three distinct phases: Discovery, Mitigation, and Post-Mortem. Each phase requires you as the technologist to:

1.  Have a cool head in the face of pressure.
2.  Have humility when under fire.
3.  Speak clearly and simply when explaining technical issues.
4.  Assert yourself and have confidence in your own knowledge and ideas.
5.  Take ownership of your team's mistakes.
6.  Follow-up on the issue appropriately.

----------
