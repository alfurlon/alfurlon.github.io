package learn.field_agent.domain;

import learn.field_agent.data.AliasRepository;
import learn.field_agent.models.Alias;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class AliasServiceTest {

    @Autowired
    AliasService service;

    @MockBean
    AliasRepository repository;

    @Test
    void shouldAdd() {
        Alias alias = makeAlias();
        Alias mockOut = makeAlias();
        mockOut.setAliasId(1);

        when(repository.add(alias)).thenReturn(mockOut);

        Result<Alias> actual = service.add(alias);

        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(mockOut, actual.getPayload());
    }

    @Test
    void shouldNotAddWhenInvalid() {
        Alias alias = null;
        Result<Alias> actual = service.add(alias);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("alias cannot be null", actual.getMessages().get(0));

        alias = makeAlias();
        alias.setName(" ");
        actual = service.add(alias);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("name is required", actual.getMessages().get(0));
    }

    @Test
    void shouldUpdate() {
        Alias alias = makeAlias();
        alias.setAliasId(1);

        when(repository.update(alias)).thenReturn(true);

        Result<Alias> actual = service.update(alias);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotUpdateWhenInvalid() {
        Alias alias = null;
        Result<Alias> actual = service.update(alias);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("alias cannot be null", actual.getMessages().get(0));

        alias = makeAlias();
        alias.setName(" ");
        actual = service.update(alias);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("name is required", actual.getMessages().get(0));

        alias = makeAlias();
        alias.setAliasId(0);
        actual = service.update(alias);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("aliasId must be set for `update` operation", actual.getMessages().get(0));
    }

    @Test
    void shouldDelete() {
        when(repository.deleteById(anyInt())).thenReturn(true);
        boolean actual = service.deleteById(42);
        assertTrue(actual);
    }

    @Test
    void shouldNotDeleteNotExisting() {
        boolean actual = service.deleteById(1);

        assertFalse(actual);
    }

    private Alias makeAlias() {
        Alias alias = new Alias();
        alias.setName("Boss");
        alias.setPersona(null);
        alias.setAgentId(4);
        return alias;
    }
}
