package learn.field_agent.data;

import learn.field_agent.models.Alias;import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class AliasJdbcTemplateRepositoryTest {

    @Autowired
    AliasJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldAdd() {
        Alias alias = makeAlias();
        Alias actual = repository.add(alias);
        assertNotNull(actual);
        assertEquals(6, actual.getAliasId());
    }

    @Test
    void shouldUpdate() {
        Alias alias = makeAlias();
        alias.setAliasId(3);
        assertTrue(repository.update(alias));
        alias.setAliasId(10);
        assertFalse(repository.update(alias));
    }

    @Test
    void shouldDelete() {
        assertTrue(repository.deleteById(4));
        assertFalse(repository.deleteById(4));
    }

    private Alias makeAlias() {
        Alias alias = new Alias();
        alias.setName("Boss");
        alias.setPersona(null);
        alias.setAgentId(4);
        return alias;
    }

}
