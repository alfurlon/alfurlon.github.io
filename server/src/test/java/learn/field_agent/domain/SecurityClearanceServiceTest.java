package learn.field_agent.domain;

import learn.field_agent.data.SecurityClearanceRepository;
import learn.field_agent.models.SecurityClearance;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class SecurityClearanceServiceTest {

    @Autowired
    SecurityClearanceService service;

    @MockBean
    SecurityClearanceRepository repository;

    @Test
    void shouldFindTopSecret() {
        SecurityClearance expected = new SecurityClearance(2, "Top Secret");
        when(repository.findById(2)).thenReturn(expected);
        SecurityClearance actual = service.findById(2);
        assertEquals(expected, actual);
    }

    @Test
    void shouldAdd() {
        SecurityClearance securityClearance = new SecurityClearance(0, "Uber Secret");
        SecurityClearance mockOut = new SecurityClearance(1, "Uber Secret");
        when(repository.add(any())).thenReturn(mockOut);

        Result<SecurityClearance> actual = service.add(securityClearance);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(mockOut, actual.getPayload());
    }

    @Test
    void shouldNotAddWhenInvalid() {
        SecurityClearance securityClearance = null;
        Result<SecurityClearance> actual = service.add(securityClearance);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("securityClearance cannot be null", actual.getMessages().get(0));

        securityClearance = new SecurityClearance(0, "");
        actual = service.add(securityClearance);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("securityClearance name is required", actual.getMessages().get(0));
    }

    @Test
    void shouldUpdate() {
        SecurityClearance securityClearance = new SecurityClearance(1, "Uber Secret");

        when(repository.update(securityClearance)).thenReturn(true);

        Result<SecurityClearance> actual = service.update(securityClearance);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotUpdateWhenInvalid() {
        SecurityClearance securityClearance = null;
        Result<SecurityClearance> actual = service.update(securityClearance);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("securityClearance cannot be null", actual.getMessages().get(0));

        securityClearance = new SecurityClearance(1, "Uber Secret");
        securityClearance.setName("");
        actual = service.update(securityClearance);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("securityClearance name is required", actual.getMessages().get(0));

        securityClearance = new SecurityClearance(0, "Uber Secret");
        actual = service.update(securityClearance);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("securityClearanceId must be set for `update` operation", actual.getMessages().get(0));
    }

    
}
