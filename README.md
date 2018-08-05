# Twitter emulation on Java

The application emulates the main features of Twitter in several ways:

1. Spring MVC (*Java* configuration)
1. Spring Boot

## Requirements

* [JDK 8+](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
* [Apache Maven 3.5.0+](https://maven.apache.org/download.cgi)

## Running

1. Change directory:
    `cd <maven module directory>`

1. From the command line with Maven:

    `mvn jetty:run`

    (for *twitter-emulation-spring-mvc-java* module)

    `mvn spring-boot:run`

    (for *twitter-emulation-spring-boot* module)

1. Access the deployed web application at: http://localhost:8080

## Tools

* [ToDoList 7.1.5+](http://www.abstractspoon.com) (planning)
* [Pencil 3.0.4+](https://pencil.evolus.vn) (GUI prototyping)
* [Violet 0.21.1](http://violet.sourceforge.net) (UML diagrams)