<a href="https://github.com/dbelob/twitter-emulation/actions"><img alt="GitHub Actions status" src="https://github.com/dbelob/twitter-emulation/workflows/Build/badge.svg"></a>
[![codecov](https://codecov.io/gh/dbelob/twitter-emulation/branch/master/graph/badge.svg)](https://codecov.io/gh/dbelob/twitter-emulation)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=dbelob_twitter-emulation&metric=alert_status)](https://sonarcloud.io/dashboard?id=dbelob_twitter-emulation)

# Twitter emulation in Java and React/Angular

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
1. *Spring Boot*, *React*
1. *Spring Boot*, *Angular*

## Requirements

* [JDK 21+](https://www.oracle.com/java/technologies/downloads/)
* [Apache Maven 3.9.0+](https://maven.apache.org/download.cgi)
* [Node.js 22.20.0+](https://nodejs.org) (optional)
* [Docker](https://www.docker.com) (optional)

## Running

### Spring MVC, JSP

1. From the command line with *Maven* (in the root directory):

    `mvn clean install -Dmaven.test.skip=true`

1. Change directory:

    `cd twitter-emulation-spring-mvc-jsp`

1. From the command line run one of the commands with *Maven*:

    `mvn jetty:run` (*H2*)  
    `mvn jetty:run -P development` (*H2*)  
    `mvn jetty:run -P production` (*Oracle Database*)  
    (*Oracle Database* connection properties: `etc/jetty.xml`)

1. Access the deployed web application at:

    http://localhost:8080

1. Log in with existing accounts (`jsmith/password`, `jdoe/password`, `rroe/password`, `alone/password`) or create a new account

### Spring Boot, JSP

1. From the command line with *Maven* (in the root directory):

    `mvn clean install -Dmaven.test.skip=true`

1. Change directory:

    `cd twitter-emulation-spring-boot-jsp`

1. From the command line run one of the commands with *Maven*:

    `mvn spring-boot:run` (*H2*)  
    `mvn spring-boot:run -P development` (*H2*)  
    `mvn spring-boot:run -P production` (*Oracle Database*)  
    (*Oracle Database* connection properties: `src/main/resources/application.yml`)

1. Access the deployed web application at:

    http://localhost:8080

1. Log in with existing accounts (`jsmith/password`, `jdoe/password`, `rroe/password`, `alone/password`) or create a new account

### Spring Boot, React

#### Method 1

1. From the command line with *Maven* (in the root directory):

   `mvn clean install -Dmaven.test.skip=true`

1. Change directory:

   `cd twitter-emulation-spring-boot-react-server`

1. From the command line run one of the commands with *Maven*:

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

   `cd twitter-emulation-spring-boot-react-server`

1. From the command line run one of the commands with *Maven*:

   `mvn spring-boot:run` (*H2*)  
   `mvn spring-boot:run -P development` (*H2*)  
   `mvn spring-boot:run -P production` (*Oracle Database*)  
   (*Oracle Database* connection properties: `src/main/resources/application.yml`)

1. Change directory:

   `cd twitter-emulation-spring-boot-react-web`

1. From the command line with *npm*:

   `npm start`

1. Access the deployed web application at:

   http://localhost:5173

1. Log in with existing accounts (`jsmith/password`, `jdoe/password`, `rroe/password`, `alone/password`) or create a new account

#### Method 3

1. From the command line with *Maven* (in the root directory):

   `mvn clean package -DskipTests`

1. Change directory:

   `cd twitter-emulation-distrib/target`

1. Find distribution file:

   `twitter-emulation-react-<version>.zip`

1. Extract files from ZIP, for example:

   `unzip twitter-emulation-react-<version>.zip`

1. Change directory:

   `cd twitter-emulation-react-<version>`

1. Run:

   `runme.bat` (*Windows*)  
   `runme.sh` (*macOS* or *Linux*)

1. Access the running web application at:

   http://localhost:8080

1. Log in with existing accounts (`jsmith/password`, `jdoe/password`, `rroe/password`, `alone/password`) or create a new account

### Spring Boot, Angular

#### Method 1

1. From the command line with *Maven* (in the root directory):

    `mvn clean install -Dmaven.test.skip=true`

1. Change directory:

    `cd twitter-emulation-spring-boot-angular-server`

1. From the command line run one of the commands with *Maven*:

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

1. From the command line run one of the commands with *Maven*:

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

#### Method 3

1. From the command line with *Maven* (in the root directory):

    `mvn clean package -DskipTests`

1. Change directory:

    `cd twitter-emulation-distrib/target`

1. Find distribution file:

    `twitter-emulation-angular-<version>.zip`

1. Extract files from ZIP, for example:

    `unzip twitter-emulation-angular-<version>.zip`

1. Change directory:

    `cd twitter-emulation-angular-<version>`

1. Run:

    `runme.bat` (*Windows*)  
    `runme.sh` (*macOS* or *Linux*)

1. Access the running web application at:

    http://localhost:8080

1. Log in with existing accounts (`jsmith/password`, `jdoe/password`, `rroe/password`, `alone/password`) or create a new account

## Monitoring

1. Change directory:

    `cd twitter-emulation-spring-boot-admin`

1. From the command line with *Maven*:

    `mvn spring-boot:run`

1. Change directory:

    `cd twitter-emulation-spring-boot-react-server`

    or

    `cd twitter-emulation-spring-boot-angular-server`

1. From the command line with *Maven*:

    `mvn spring-boot:run`

1. Access *Spring Boot Admin* application at:

    http://localhost:9000

1. Log in with existing account `admin/password`
  
## Testing

### Backend unit testing for DAOs and services

1. Install *Docker* (optional, only for *Oracle Database* testing)

1. Change directory:

    `cd twitter-emulation-common`

1. From the command line run one of the commands with *Maven*:

    `mvn test` (*H2*)  
    `mvn test -P development` (*H2*)  
    `mvn test -P production` (*Oracle Database*)  

### Backend unit testing for controllers, integration testing

1. Change directory:

    `cd twitter-emulation-spring-boot-common-server`

1. From the command line with *Maven*:

    `mvn test`  

### Frontend unit testing

#### Jest, React Testing Library, Vitest tests

1. Change directory:

   `cd twitter-emulation-spring-boot-react-web`

1. From the command line with *npm*:

   `npm run test`

#### Jasmine tests

1. Change directory:

    `cd twitter-emulation-spring-boot-angular-web`

1. From the command line with *npm*:

    `npm run test`

### Frontend end-to-end testing

#### Puppeteer tests

1. Change directory:

   `cd twitter-emulation-spring-boot-react-web`

1. From the command line with *npm*:

   `npm run e2e`

#### Protractor tests

1. Change directory:

    `cd twitter-emulation-spring-boot-angular-web`

1. From the command line with *npm*:

    `npm run e2e`

## Development

* [H2 Database Console](http://localhost:8082)
* Swagger:
  * [Swagger UI](http://localhost:8080/swagger-ui.html)  
  * [Swagger JSON](http://localhost:8080/v3/api-docs)
  * [Swagger YAML](http://localhost:8080/v3/api-docs.yaml)

## Frameworks and libraries

* [Spring](https://spring.io):
  * [Spring MVC](https://spring.io/projects/spring-framework)
  * [Spring Boot](https://spring.io/projects/spring-boot)
  * [Spring Security](https://spring.io/projects/spring-security)
  * [Spring Test](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-testing.html)
  * [Spring Boot Admin](https://github.com/codecentric/spring-boot-admin)
* [React](https://react.dev)
* [Angular](https://angular.dev)
* [H2](http://www.h2database.com) or [Oracle Database](https://www.oracle.com/database/index.html) (data storage)
* [Swagger](https://swagger.io) (*REST API* documentation)
* [JUnit](https://junit.org) (*Java* unit testing)
* [Mockito](https://site.mockito.org) (mocking for unit tests in *Java*)
* [TestContainers](https://www.testcontainers.org) (testing with [Docker](https://www.docker.com) containers)
* [Jest](https://jestjs.io) (*JavaScript* unit testing)
* [React Testing Library](https://testing-library.com/react) (*JavaScript* unit testing for *React*)
* [Jasmine](https://jasmine.github.io) (*JavaScript* unit testing)
* [Puppeteer](https://pptr.dev) (*JavaScript* end-to-end testing)
* [Protractor](https://www.protractortest.org) (end-to-end testing for *Angular*)
* [Vitest](https://vitest.dev) (*JavaScript* testing by *Vite*)

## CI/CD

* [GitHub Actions](https://github.com/features/actions) (automation of workflows)
* [Dependabot](https://github.com/dependabot) (automated dependency updates)
* [Mergify](https://mergify.com) (automated merging of pull requests)

## Tools

* [ToDoList 7.1.5+](http://www.abstractspoon.com) (planning)
* [Pencil 3.0.4+](https://pencil.evolus.vn) (GUI prototyping)
* [Violet 0.21.1](http://violet.sourceforge.net) (UML diagrams)

## Article

[The evolution of creating web applications in Java](https://habr.com/ru/companies/jugru/articles/453468/) (Russian)
