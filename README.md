# Twitter emulation in Java and Angular

![Screenshot](/images/screenshot.png)

The application emulates the main features of *Twitter*:
* login, logout;
* account management (registration, editing, deleting, search by substring);
* main page (account properties, timeline, tweets, following, followers);
* tweet creating;
* follow/unfollow.

in several ways:

1. *Spring MVC*, *JSP*
1. *Spring Boot*, *JSP*
1. *Spring Boot*, *Angular*

## Requirements

* [JDK 8+](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
* [Apache Maven 3.5.0+](https://maven.apache.org/download.cgi)
* [Node.js 10.16.0](https://nodejs.org) (optional)
* [Docker](https://www.docker.com) (optional)

## Running

### Spring MVC, JSP

1. Change directory:

    `cd twitter-emulation-spring-mvc-jsp`

1. From the command line with *Maven*:

    `mvn jetty:run` (*H2*)  
    `mvn jetty:run -P development` (*H2*)  
    `mvn jetty:run -P production` (*Oracle Database*)  
    (*Oracle Database* connection properties: `etc/jetty.xml`)

1. Access the deployed web application at:

    http://localhost:8080

1. Log in with existing accounts (`jsmith/password`, `jdoe/password`, `rroe/password`, `alone/password`) or create a new account

### Spring Boot, JSP

1. Change directory:

    `cd twitter-emulation-spring-boot-jsp`

1. From the command line with *Maven*:

    `mvn spring-boot:run` (*H2*)  
    `mvn spring-boot:run -P development` (*H2*)  
    `mvn spring-boot:run -P production` (*Oracle Database*)  
    (*Oracle Database* connection properties: `src/main/resources/application.yml`)

1. Access the deployed web application at:

    http://localhost:8080

1. Log in with existing accounts (`jsmith/password`, `jdoe/password`, `rroe/password`, `alone/password`) or create a new account

### Spring Boot, Angular

#### Method 1

1. From the command line with *Maven* (in the root directory):

    `mvn clean install -Dmaven.test.skip=true`

1. Change directory:

    `cd twitter-emulation-spring-boot-angular-server`

1. From the command line with *Maven*:

    `mvn spring-boot:run` (*H2*)  
    `mvn spring-boot:run -P development` (*H2*)  
    `mvn spring-boot:run -P production` (*Oracle Database*)  
    (*Oracle Database* connection properties: `src/main/resources/application.yml`)

1. Access the deployed web application at:

    http://localhost:8080

1. Log in with existing accounts (`jsmith/password`, `jdoe/password`, `rroe/password`, `alone/password`) or create a new account

#### Method 2

1. Install *Node.js*

1. Run to ensure that *npm* is working:

    `npm -v`

1. Change directory:

    `cd twitter-emulation-spring-boot-angular-server`

1. From the command line with *Maven*:

    `mvn spring-boot:run` (*H2*)  
    `mvn spring-boot:run -P development` (*H2*)  
    `mvn spring-boot:run -P production` (*Oracle Database*)  
    (*Oracle Database* connection properties: `src/main/resources/application.yml`)

1. Change directory:

    `cd twitter-emulation-spring-boot-angular-web`

1. From the command line with *npm*:

    `npm start`

1. Access the deployed web application at:

    http://localhost:4200

1. Log in with existing accounts (`jsmith/password`, `jdoe/password`, `rroe/password`, `alone/password`) or create a new account

## Monitoring

1. Change directory:

    `cd twitter-emulation-spring-boot-admin`

1. From the command line with *Maven*:

    `mvn spring-boot:run`

1. Change directory:

    `cd twitter-emulation-spring-boot-angular-server`

1. From the command line with *Maven*:

    `mvn spring-boot:run`

1. Access *Spring Boot Admin* application at:

    http://localhost:9000
  
## Testing

### Backend unit testing for DAOs and services

1. Install *Docker* (optional, only for *Oracle Database* testing)

1. Change directory:

    `cd twitter-emulation-common`

1. From the command line with *Maven*:

    `mvn test` (*H2*)  
    `mvn test -P development` (*H2*)  
    `mvn test -P production` (*Oracle Database*)  

### Backend unit testing for controllers, integration testing

1. Change directory:

    `cd twitter-emulation-spring-boot-angular-server`

1. From the command line with *Maven*:

    `mvn test`  

### Frontend unit testing

1. Change directory:

    `cd twitter-emulation-spring-boot-angular-web`

1. From the command line with *npm*:

    `npm run test`

### Frontend end-to-end testing

1. Change directory:

    `cd twitter-emulation-spring-boot-angular-web`

1. From the command line with *npm*:

    `npm run e2e`

## Development

* [H2 Database Console](http://localhost:8082)
* Swagger:
  * [Swagger UI](http://localhost:8080/swagger-ui.html)  
  * [Swagger JSON](http://localhost:8080/v2/api-docs)  

## Frameworks and libraries

* [Spring](https://spring.io):
  * [Spring MVC](https://spring.io/projects/spring-framework)
  * [Spring Boot](https://spring.io/projects/spring-boot)
  * [Spring Security](https://spring.io/projects/spring-security)
  * [Spring Test](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-testing.html)
  * [Spring Boot Admin](https://github.com/codecentric/spring-boot-admin)
* [H2](http://www.h2database.com) or [Oracle Database](https://www.oracle.com/database/index.html) (data storage)
* [Swagger](https://swagger.io) (*REST API* documentation)
* [JUnit](https://junit.org) (*Java* unit testing)
* [Mockito](https://site.mockito.org) (mocking for unit tests in *Java*)
* [TestContainers](https://www.testcontainers.org) (testing with [Docker](https://www.docker.com) containers)
* [Jasmine](https://jasmine.github.io) (*JavaScript* unit testing)
* [Protractor](https://www.protractortest.org) (end-to-end testing for *Angular*)

## Tools

* [ToDoList 7.1.5+](http://www.abstractspoon.com) (planning)
* [Pencil 3.0.4+](https://pencil.evolus.vn) (GUI prototyping)
* [Violet 0.21.1](http://violet.sourceforge.net) (UML diagrams)
