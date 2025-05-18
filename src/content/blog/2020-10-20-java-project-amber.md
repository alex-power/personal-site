---
title: "Java Project Amber: A Look at the Future of Java"
date: "2020-10-20T00:00:00.000Z"
excerpt: "Explore the exciting features coming to Java through Project Amber, including pattern matching and record classes."
tags: ["Java", "Programming", "Language Features"]
image: "/assets/project_amber.webp"
---

#### The new Java features in Project Amber are going to change the way you write Java.

Perhaps the most cited reason for not using Java for development is that it's too verbose. Developers complain that there's too much boilerplate and that no new features for Java developers have been released in a long time. The idea that Java is not growing and changing is flatly false. Although it's true that other languages built on the JVM have gained significant traction, especially [Kotlin](https://medium.com/javarevisited/top-5-courses-to-learn-kotlin-in-2020-dfc3fa7706d8?source=---------16------------------), Java is certainly fighting back. These new Java features are coming… and fast.

Since Oracle has split JDK into a Commercial Oracle JDK and OpenJDK, the development and release cycle for the JDK has increased at an alarming rate. [On OpenJDK's website](http://openjdk.java.net/projects/jdk/), you can see the last 5 versions of the OpenJDK have all been released since 2018. The first 9 versions of Java SE were released over the course of 18 years.

### Project Amber

The goal of Project Amber is to add productivity-oriented features to the Java language. Project Amber is taking huge steps forward in the developer experience in [Java](https://www.java67.com/2018/08/top-10-free-java-courses-for-beginners-experienced-developers.html). As someone with a habit of furtively eyeing other languages, I felt a sense of relief and excitement knowing the direction OpenJDK was taking Java. Here are the main goals of project Amber, per the OpenJDK Website.

Delivered:

1.  [JEP 286](http://openjdk.java.net/jeps/286) Local-Variable Type Inference (`var`) _(JDK 10)_
2.  [JEP 323](http://openjdk.java.net/jeps/323) Local-Variable Syntax for Lambda Parameters _(JDK 11)_
3.  [JEP 361](http://openjdk.java.net/jeps/361) Switch Expressions _(JDK 14)_

Currently in progress:

1.  [JEP 360](http://openjdk.java.net/jeps/360) Sealed Types (Preview)
2.  [JEP 359](http://openjdk.java.net/jeps/359) Records (Second preview)
3.  [JEP 368](http://openjdk.java.net/jeps/368) Text Blocks (Second Preview)
4.  [JEP 375](http://openjdk.java.net/jeps/375) Pattern Matching for `instanceof` (Second Preview)

Quite a few features, and each and every one represents a _significant_ change to the way you will write Java code in the future.

### The `var` Keyword (JDK 10)

The `var` keyword is a new way to declare variables using type inference. `var` allows you to declare a variable without specifying it's type. In Java, this goes against the grain of always having to define the type of a variable. There is some dissent among professionals if `var` should be embraced or avoided due to conventional Java's insistence on type specification.In the right environment, I think a style guide which includes the use of `var`, where appropriate, would allow for significant readability improvements. The `var` keyword performs best in small, self-explanatory methods where types can be omitted without losing clarity of what a variable is.

{% highlight java %}
var myNumber = 23;
var strings = new ArrayList<String>();
var stringsArray = new String[1];
{% endhighlight %}
##### Declaring variables with `var`

OpenJDK provides principles and [Style Guidelines](http://openjdk.java.net/projects/amber/LVTIstyle.html) to help you determine when to use `var`:

1.  Reading code is more important than writing code.
2.  Code should be clear from local reasoning.
3.  Code readability shouldn't depend on IDEs.
4.  Explicit types are a tradeoff.

If your code is aligned with these principles when `var` is used, then you can safely use it. If not, you should default back to explicitly typing your variables. Keep in mind that `var` is only available for local variables.

[_JEP 323_](http://openjdk.java.net/jeps/323)_, Local-Variable Syntax for Lambda Parameters (JDK 11)_ is an extension of the `var` keyword to also be usable in Lambda parameters.

{% highlight java %}
// BEFORE
BiConsumer<String, List<String>> consumer = (x, y) -> System.out.println(x);
BiConsumer<String, List<String>> explicityConsumer = (String x, List<String> y) -> System.out.println(x);
// AFTER
BiConsumer<String, List<String>> varConsumer = (var x, var y) -> System.out.println(x);
BiConsumer<String, List<String>> varWithAnnotations = (@NonNull var x, @NonNull var y) -> System.out.println(x);
// COMPILE ERROR
BiConsumer<String, List<String>> annotations = (@NonNull x, @NonNull y) -> System.out.println(x);
{% endhighlight %}
##### var keyword in lambda parameters.

This simply enables you to use annotations with [lambda parameters](https://medium.com/javarevisited/7-best-java-tutorials-and-books-to-learn-lambda-expression-and-stream-api-and-other-features-3083e6038e14?source=---------14------------------) without requiring you to explicitly define the type of the lambda parameter.

### `switch` Expressions (JDK 14)

The `switch` expression is a new type of `switch` which allows you to easily assign the result of the switch computation to a variable.

switch expression.

This alleviates the requirement of having to use `return` or `break` to exit a switch statement. This also allows for simpler variable assignment, without having to repeat `result = x + y; break;`, `result = x * y; break;`, etc.

In short, `switch` expressions make `switch` es shorter, easier to read, and less error-prone.

### Pattern Matching for `instanceof` (JDK 15, Second Preview)

[JEP 375](http://openjdk.java.net/jeps/375) will give Java's `instanceof` test some much-needed love. Every Java programmer is familiar with the following for checking the type of an object, and then retrieving the value of a field from it.

Standard instanceof check, cast, and use of an unknown Object.

The above is verbose and unnecessary. Most of the time you do an `instanceof` test, you will be casting the object to that type and performing some type-specific operation on it. Pattern matching will make this more concise and remove the cast entirely.

Pattern Matching implementation of the above.

This becomes especially annoying when you need to test for multiple different types, as in the below example by Gavin Bierman and Brian Goetz.

Credit: [Pattern Matching in Java](https://cr.openjdk.java.net/~briangoetz/amber/pattern-match.html) by Brian Goetz and Gavin Bierman

Using pattern matching and `switch` expressions together, the above 17 lines of code, which is 50% boilerplate, could be simplified to just 8 lines.

Credit: [Pattern Matching in Java](https://cr.openjdk.java.net/~briangoetz/amber/pattern-match.html) by Brian Goetz and Gavin Bierman

The ability to use pattern matching with `switch` is not planned for the same release as the regular pattern matching, but I couldn't help but include it. The clarity and brevity of the above code are impressive - especially for Java!

### Text Blocks (JDK 15, Second Preview)

Text blocks are a simple quality of life enhancement for writing longer strings in Java. Whether you want to embed a block of code from another language, an HTML snippet, or a JSON payload, text blocks will simplify this:

HTML encoded in a String.

To this:

HTML encoded in a String using triple-quote Text Block.

Text blocks support standard escape sequences and are `java.lang.String` s.

### Records (JDK 15, Second Preview)

Java Records are immutable classes that can be specified using special, compact syntax. If you are familiar with [Lombok](https://projectlombok.org/), records are similar to classes annotated with `@Value`, they are data holders that have the following properties (modified for readability from [JEP 359](http://openjdk.java.net/jeps/359)):

1.  A private final field for each component of the state description;
2.  A public getter for each field in the state description;
3.  A public constructor which initializes each field from the corresponding argument;
4.  Implementations of `equals` and `hashCode` that say two records are equal if they are of the same type and contain the same state; and
5.  An implementation of `toString` that includes the string representation of all the record components, with their names.

Like `enum`, `record`s are created using the keyword `record` and a straightforward constructor-like syntax called a "state description". Once the state description is defined, we get all 5 features above for free. It is possible to add validation in the constructor and still not be required to specify the constructor arguments or fields they will be assigned to. Instance methods are also supported. Setters are not provided, the generated fields `x` and `y` below are `final`.

Creating and exercising Records.

Records are by far the most exciting new Java feature of the bunch. Records will change the way we interact with data holder classes on a day-to-day basis. I suspect that [Java programmers](https://medium.com/javarevisited/5-essential-frameworks-every-java-developer-should-learn-6ed83315f1fb), once beginning to use `record`, will wonder how we ever did this before.

### Sealed Types (JDK 15, Preview)

A _sealed type_ is a type with restrictions placed on what can subclass it. The restrictions are defined in the type definition. My first question with this feature was, why? Why not always allow for a type to be subclassed? This was explained best in JEP 360:

> _In Java, a class hierarchy enables the reuse of code via inheritance: The methods of a superclass can be inherited (and thus reused) by many subclasses. However, the purpose of a class hierarchy is not always to reuse code. Sometimes, its purpose is to model the various possibilities that exist in a domain, such as the kinds of shapes supported by a graphics library or the kinds of loans supported by a financial application. When the class hierarchy is used in this way, restricting the set of subclasses can streamline the modeling._

> _Brian Goetz,_ [_JEP 360_](https://openjdk.java.net/jeps/360)_, 2020_

Sealed types allow you to specify not just what the _supertype_ is, but also what the _subtypes_ can be. As mentioned above, sealing allows for a special kind of semantic to be defined in a _supertype._ Another benefit is that the compiler is subsequently allowed to make assumptions about the subtypes, such as in our pattern matching switch expression example above — if the supertype is a sealed type, then the compiler could allow you to omit the `default` clause in a `switch`, as in the below example from [Data Classes and Sealed Types for Java, by Brian Goetz (2019)](https://cr.openjdk.java.net/~briangoetz/amber/datum.html).

Sealed types `switch` expression example from [Data Classes and Sealed Types for Java, by Brian Goetz (2019)](https://cr.openjdk.java.net/~briangoetz/amber/datum.html)

### Contribute to OpenJDK

With all the new Java features coming to the JDK in the near future, I am excited to see what the OpenJDK team dreams up next. Clearly, the developer experience is at the forefront of the great minds working on the JDK. As [Java developers](https://medium.com/javarevisited/10-books-java-developers-should-read-in-2020-e6222f25cc72), we are all part of the ecosystem that sustains and improves Java. If you have an interest in contributing or providing feedback on the preview features, become a contributor to OpenJDK [here](https://openjdk.java.net/contribute/).

----------

_Originally published at_ [_https://alexpower.me_](https://alexpower.me) _| Join my_ [_Email List_](https://follow.it/alexpower?action=follow)