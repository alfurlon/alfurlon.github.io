package learn.field_agent.data;

import learn.field_agent.domain.Result;
import learn.field_agent.domain.ResultType;
import learn.field_agent.models.SecurityClearance;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class SecurityClearanceJdbcTemplateRepositoryTest {

    @Autowired
    SecurityClearanceJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindById() {
        SecurityClearance secret = new SecurityClearance(1, "Secret");
        SecurityClearance topSecret = new SecurityClearance(2, "Top Secret");

        SecurityClearance actual = repository.findById(1);
        assertEquals(secret, actual);

        actual = repository.findById(2);
        assertEquals(topSecret, actual);

        actual = repository.findById(10);
        assertEquals(null, actual);
    }

    @Test
    void shouldFindAll() {
        List<SecurityClearance> securityClearances = repository.findAll();
        assertNotNull(securityClearances);

        assertTrue(securityClearances.size() >= 1);
    }

    @Test
    void shouldAdd() {
        SecurityClearance securityClearance = new SecurityClearance(0, "uber-secret");
        SecurityClearance actual = repository.add(securityClearance);
        assertNotNull(actual);

        assertEquals(3, actual.getSecurityClearanceId());
    }

    @Test
    void shouldUpdate() {
        SecurityClearance securityClearance = new SecurityClearance(1, "uber-secret");
        assertTrue(repository.update(securityClearance));
        securityClearance.setSecurityClearanceId(10);
        assertFalse(repository.update(securityClearance));
    }

    @Test
    void shouldDelete() {
        Result<SecurityClearance> actual = repository.deleteById(2);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotDeleteReferencedSecurityClearance() {
        Result<SecurityClearance> actual = repository.deleteById(1);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldNotDeleteNotExisting() {
        Result<SecurityClearance> actual = repository.deleteById(10);
        assertEquals(ResultType.NOT_FOUND, actual.getType());
    }
}