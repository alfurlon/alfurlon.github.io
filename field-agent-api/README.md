# Field Agent Assessment

## Test Plan
_If the trainee followed instructions during kickoff, they should have an HTTP file with a good sequence of events for demonstrating CRUD capabilities._

### Security Clearance
* [ ] GET all security clearances
* [ ] GET a security clearance by ID
* [ ] For GET return a 404 if security clearance is not found
* [ ] POST a security clearance
* [ ] For POST return a 400 if the security clearance fails one of the domain rules
  * [ ] Security clearance name is required
  * [ ] Name cannot be duplicated
* [ ] PUT an existing security clearance
* [ ] For PUT return a 400 if the security clearance fails one of the domain rules
* [ ] DELETE a security clearance that is not in use by ID
* [ ] For DELETE return a 404 if the security clearance is not found
* [ ] For DELETE return a 400 if the security clearance is in use 

### Alias
* [x] create model for alias
* [ ] GET an agent record with aliases attached
* [ ] POST an alias
* [ ] For POST return a 400 if the alias fails one of the domain rules
  * [ ] Name is required
  * [ ] Persona is not required unless a name is duplicated. The persona differentiates between duplicate names.
* [ ] PUT an alias
* [ ] For PUT return a 400 if the alias fails one of the domain rules
* [ ] DELETE an alias by ID
* [ ] For DELETE Return a 404 if the alias is not found

### Global Error Handling
* [ ] Return a specific data integrity error message for data integrity issues
* [ ] Return a general error message for issues other than data integrity


## Security Clearance CRUD


### Http Requests

Find all security clearances

```
GET http://localhost:8080/api/security/clearance HTTP/1.1
```

Find a security clearance by its identifier

```
GET http://localhost:8080/api/security/clearance/{id} HTTP/1.1
```

Add a security clearance

```
POST http://localhost:8080/api/security/clearance HTTP/1.1
Content-Type: application/json

{
    ???
}
```

Update an existing security clearance

```
PUT http://localhost:8080/api/security/clearance/{id} HTTP/1.1

Content-Type: application/json

{
    ???
}
```

delete an existing security clearance

```
DELETE http://localhost:8080/api/security/clearance/{id}
```
Success: 204 No Content

Fails (Cannot be found): 404, id does not exist

Fails (conflict): 409, id is currently in use

### Controller

_Refer to AgentController class for the below methods_

* [ ] create SecurityClearanceController

* [ ] findAll()
* [ ] findById()
* [ ] add()
* [ ] update()
* [ ] deleteById() Result<SecurityClearance>

### Domain

_Refer to AgentService_
* [ ] create SecurityClearanceService
* [ ] create SecurityClearanceServiceTest (mock or no?)

* [ ] findAll()
* [ ] findById()
* [ ] add()
* [ ] update()
* [ ] deleteById() Result<SecurityClearance> Check for domain rules before going into the repository.deleteByid

#### Domain Rules

* [ ] security clearance name is required
* [ ] name cannot be duplicated
    * [ ] Retrieve existing security clearances and check to see if the security clearance to add/update is in that list

#### Deleting Security Clearances

```
select count(*) from agency_agent where security_clearance_id = 1;
```

if this is greater than 0 then it can't delete that security clearance. In that case we need to handle that so it doesn't fail

### Data Layer

_Refer to AgentJdbcTemplate but simpler_
SecurityClearanceJdbcTemplateRepository
create SecurityClearanceRepository (interface)

** To support testing, update the set known good state procedure as needed **

## Aliases CRUD

### Alias Model

* [x] private int aliasId
* [x] private String name
* [x] private String persona
* [x] private int agentId

### Http Requests

Find all individual agent with aliases attach (take from agent controller)

```
GET http://localhost:8080/api/agent/{id} HTTP/1.1
```

**Review the code paths through the app for retreiving an agent... need to add aliases**

Add an alias

```
POST http://localhost:8080/api/alias HTTP/1.1
Content-Type: application/json

{
    ???
}
```

Update an existing alias

```
PUT http://localhost:8080/api/alias/{id} HTTP/1.1

Content-Type: application/json

{
    ???
}
```

delete an existing alias

```
DELETE http://localhost:8080/api/alias/{id}
```

#### Response

Success: 204

Fails: 404

### Controller

_Refer to AgentController class for the below methods_

* [ ] create AliasController

findAll()??
findById()??
* [ ] add()
* [ ] update()
* [ ] deleteById() Result<Alias>??

### Domain

_Refer to AgentService_
* [ ] create AliasService
* [ ] create AliasServiceTest (Mock or no?)

findAll()??
findById()??
* [ ] add()
* [ ] update()
* [ ] deleteById() Result<Alias> Check for domain rules before going into the repository.deleteByid???

#### Domain Rules

* [ ] name is required
* [ ] persona is not required unless there is another name equals the name being updated/add
    * [ ] if duplicate require persona

### Data Layer

* [ ] create AliasJdbcTemplateRepository
* [ ] create AliasRepository (interface)
* [ ] create AliasMapper
* [ ] creat tests

**To support testing, update the set known good state procedure as needed**

## Agent

### Agent Model
* [ ] add private List<Alias> aliases for aliases


## Global Error Handling
 * [ ] need specific **data integrity** exception handler (more specific than data access exception)
 * [ ] Create a general error handler with "sorry, not sorry" response