---
title: "Interesting and helpful Java Enum patterns"
date: "2020-09-27T00:00:00.000Z"
excerpt: "Discover advanced techniques for using Java enums to write more maintainable and type-safe code."
tags: ["Java", "Programming", "Best Practices"]
image: "/assets/java enums.webp"
---
#### Java's enum is more powerful than you think. It's a first-class citizen in Java and even supports functional programming.

Frequently, I find myself using enums in Java to represent a set of potential values for something. The ability to determine at compile-time what values a type can have is a powerful capability, it gives structure and meaning to your code. When I first learned about enums, I thought they were merely a tool to give a name to a constant and could be just as easily replaced by `static constant String ENUM_VAL_NAME`.

Well, I was wrong. It turns out that [Java Enums](https://javarevisited.blogspot.com/2011/08/enum-in-java-example-tutorial.html) have pretty advanced features that make your code clean, less prone to error, and functional.

Let's take a look at some of the [advanced enum features in Java](http://www.java67.com/2018/07/java-enum-tutorial-10-things-java-devs.html) and how to leverage them to make your code simpler and more readable.

# Enums are Classes!

In Java, Enums are a subclass of `Object`. Let's take a look at the base class of all enums, `Enum<E>` (modified for brevity).

```java
public abstract class Enum<E extends Enum<E>>
      implements Constable, Comparable<E>, Serializable {
    private final String name;

    public final String name() {
        return name;
    }

    private final int ordinal;

    public final int ordinal() {
        return ordinal;
    }

    protected Enum(String name, int ordinal) {
        this.name = name;
        this.ordinal = ordinal;
    }

    public String toString() {
        return name;
    }

    public final boolean equals(Object other) {
        return this==other;
    }

    public final int hashCode() {
        return super.hashCode();
    }

    public final int compareTo(E o) {
        Enum<?> other = (Enum<?>)o;
        Enum<E> self = this;
        if (self.getClass() != other.getClass() && // optimization
            self.getDeclaringClass() != other.getDeclaringClass())
            throw new ClassCastException();
        return self.ordinal - other.ordinal;
    }
}
```

We can see that this is mostly just a [regular abstract class](https://javarevisited.blogspot.com/2010/10/abstraction-in-java.html), with two fields, `name` and `ordinal`. Since Enums are all classes, they have many of the features of a regular class. We are able to provide Enums with instance methods, [constructors](https://javarevisited.blogspot.com/2012/12/what-is-constructor-in-java-example-chainning-overloading.html), and fields. We can override `toString()`, but not `hashCode()` or `equals(Object other)`.
 
Let's look at our example enum, `Operation`.

```java
enum Operation { 
  ADD, 
  SUBTRACT, 
  MULTIPLY 
}
```

This enum represents an operation that can be performed on two values and will produce a result. Your initial thought on how to implement this functionality might have been to use a [switch statement](https://www.java67.com/2012/09/how-to-use-java-enum-in-switch-case-example.html), like this:

```java
public int apply(Operation operation, int arg1, int arg2) { 
  switch(operation) { 
    case ADD: 
      return arg1 + arg2; 
    case SUBTRACT: 
      return arg1 - arg2; 
    case MULTIPLY: 
      return arg1 * arg2; 
    default: 
      throw new UnsupportedOperationException(); 
  } 
}
```

There's a few problems with this implementation. The first is that if we add a new operation to our `Operation` enum, we won't be notified by the compiler that this switch does not handle our new operation correctly. Even worse, if a lazy developer copied or re-wrote this code in another class, we would probably fail to update it.

The second issue is the `default` case, which is required even though we know that it can never happen. This is because the [Java compiler](https://javarevisited.blogspot.com/2011/12/jre-jvm-jdk-jit-in-java-programming.html) knows about the first issue above, and wants to make sure we handle the possibility that a new enum is added to `Operation` without our knowledge.

# Functional Enumeration Implementation

Since enums are classes, we can create an enum field to hold the function that performs the operation. But before we reach that solution, let's walk through a few refactors.

First, let's put our switch inside our enum class.

```java
enum Operation {
 ADD,
 SUBTRACT,
 MULTIPLY;
  
 public static int apply(Operation operation, int arg1, int arg2) { 
   switch(operation) {
     case ADD: 
       return arg1 + arg2;
     case SUBTRACT: 
       return arg1 - arg2;
     case MULTIPLY: 
       return arg1 * arg2;
     default: 
       throw new UnsupportedOperationException(); 
    } 
  } 
}
```

We can do an addition like this: `Operation.apply(Operation.ADD, 2, 3);`

Since we are now calling the method from within `Operation`, we can change it to an instance method and use `this` instead of passing the desired `Operation` as a parameter. `apply()` now looks like this:

```java
public int apply(int arg1, int arg2) { 
  switch(this) { 
    case ADD: 
      return arg1 + arg2; 
    case SUBTRACT: 
      return arg1 - arg2;
    case MULTIPLY: 
      return arg1 * arg2; 
    default: 
      throw new UnsupportedOperationException(); 
  }
}
```

Call the addition operation like this: `Operation.ADD.apply(2, 3);`

That looks pretty good. Now let's take it one step further, and eliminate the switch statement entirely by using [functional programming.](https://javarevisited.blogspot.com/2020/04/top-5-courses-to-learn-functional-programming-in-java-with-lambda-and-stream.html)

```java
enum Operation {
    ADD((x, y) -> x + y),
    SUBTRACT((x, y) -> x - y),
    MULTIPLY((x, y) -> x * y);

    Operation(BiFunction<Integer, Integer, Integer> operation) {
        this.operation = operation;
    }

    private final BiFunction<Integer, Integer, Integer> operation;

    public int apply(int x, int y) {
        return operation.apply(x, y);
    }
}
```

Here's what I did:

1. Added a `BiFunction<Integer, Integer, Integer> operation` field.
2. Created a constructor for `Operation` with a `BiFunction` arg.
3. Called the constructor in our enum definition and specified the `BiFunction<Integer, Integer, Integer>` with a [lambda](https://javarevisited.blogspot.com/2018/08/top-5-java-8-courses-to-learn-online.html).

The `java.util.function.BiFunction` `operation` field is a reference to a function (method) that takes two arguments. In our case, both arguments are ints, and the return value is an int as well. Unfortunately, [Java parameterized types](https://javarevisited.blogspot.com/2012/08/how-to-write-parametrized-class-method-Generic-example.html) don't support primitives so we must use the boxed primitive `Integer`.

Because `BiFunction` is annotated with `@FunctionalInterface`, we can define one using Lambda notation. Since our function takes two arguments, we specify them using `(x, y)`. Then we define a single line method which returns a value using `-> x + y`. This is equivalent to the below, just more succinct.

```java
class Adder implements BiFunction<Integer, Integer, Integer> {
    @Override
    public Integer apply(Integer x, Integer y) {
        return x + y;
    }
}
```

Our new `Operation` implementation is used in the same way: `Operation.ADD.apply(2, 3);`. However, this implementation is better because the compiler will tell us when a new `Operation` is added, requiring us to implement the new function. Without this, it is possible to get an `UnsupportedOperationException()` if we didn't also remember to update our switch statement when adding a new `Operation`.

# Key Takeaways

1. Java enums are classes which extend `Enum<T>`.
2. Enums can have fields, constructors, and instance methods.
3. Java enum fields can store functions. In concert with lambdas, you can create clean, safe enum-specific implementations of a function, and enforce them at compile time (as opposed to using `switch`).

Here is the [GitHub repo](https://github.com/alex-power/java-enum-example) for this example.