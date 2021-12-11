package learn.field_agent.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import learn.field_agent.data.SecurityClearanceRepository;
import learn.field_agent.models.SecurityClearance;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class SecurityClearanceControllerTest {

    @MockBean
    SecurityClearanceRepository repository;

    @Autowired
    MockMvc mvc;

    @Test
    void shouldFindAll() throws Exception {

        List<SecurityClearance> securityClearanceList = List.of(
                new SecurityClearance(1, "Secret"),
                new SecurityClearance(2, "Top Secret"),
                new SecurityClearance(3, "basic")
        );

        ObjectMapper mapper = new ObjectMapper();
        String expectedJson = mapper.writeValueAsString(securityClearanceList);

        when(repository.findAll()).thenReturn(securityClearanceList);

        var request = get("/api/security/clearance");

        var response = mvc.perform(request);

        response.andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON)).andExpect(content().json(expectedJson));
    }

    @Test
    void shouldFindById() throws Exception {
        SecurityClearance securityClearance = new SecurityClearance(1, "Top Secret");

        when(repository.findById(securityClearance.getSecurityClearanceId())).thenReturn(securityClearance);

        ObjectMapper mapper = new ObjectMapper();
        String expectedJson = mapper.writeValueAsString(securityClearance);

        var request = get("/api/security/clearance/1");

        mvc.perform(request).andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON)).andExpect(content().json(expectedJson));
    }

    @Test
    void shouldNotFindMissingById() throws Exception {
        when(repository.findById(anyInt())).thenReturn(null);

        mvc.perform(get("/api/security/clearance/10")).andExpect(status().isNotFound());
    }

    @Test
    void shouldNotAddInvalidSecurityClearance() throws Exception {
        SecurityClearance scIn = new SecurityClearance(1, "Top Secret");

        ObjectMapper mapper = new ObjectMapper();
        String jsonIn = mapper.writeValueAsString(scIn);

        var request = post("/api/security/clearance").contentType(MediaType.APPLICATION_JSON).content(jsonIn);

        mvc.perform(request).andExpect(status().isBadRequest());
    }

    @Test
    void shouldAddSecurityClearance() throws Exception {
        SecurityClearance scIn = new SecurityClearance(0, "Top Secret");
        SecurityClearance scOut = new SecurityClearance(1, "Top Secret");

        ObjectMapper mapper = new ObjectMapper();
        String jsonIn = mapper.writeValueAsString(scIn);
        String expectedJson = mapper.writeValueAsString(scOut);

        when(repository.add(any())).thenReturn(scOut);

        var request = post("/api/security/clearance").contentType(MediaType.APPLICATION_JSON).content(jsonIn);

        mvc.perform(request).andExpect(status().isCreated()).andExpect(content().contentType(MediaType.APPLICATION_JSON)).andExpect(content().json(expectedJson));
    }

    @Test
    void shouldUpdateSecurityClearance() throws Exception {
        SecurityClearance scIn = new SecurityClearance(1, "Top Secret");

        when(repository.update(any())).thenReturn(true);

        ObjectMapper mapper = new ObjectMapper();
        String jsonIn = mapper.writeValueAsString(scIn);

        var request = put("/api/security/clearance/1").contentType(MediaType.APPLICATION_JSON).content(jsonIn);

        mvc.perform(request).andExpect(status().isNoContent());
    }

    @Test
    void shouldNotUpdateAndShouldReturn409WhenIdsDontMatch() throws Exception {
        SecurityClearance scIn = new SecurityClearance(1, "Top Secret");

        ObjectMapper mapper = new ObjectMapper();
        String jsonIn = mapper.writeValueAsString(scIn);

        var request = put("/api/security/clearance/2").contentType(MediaType.APPLICATION_JSON).content(jsonIn);

        mvc.perform(request).andExpect(status().isConflict());
    }

    @Test
    void shouldNotUpdateAndReturn400WhenInvalid() throws Exception {
        SecurityClearance scIn = new SecurityClearance(1, "");

        ObjectMapper mapper = new ObjectMapper();
        String jsonIn = mapper.writeValueAsString(scIn);

        var request = put("/api/security/clearance/1").contentType(MediaType.APPLICATION_JSON).content(jsonIn);

        mvc.perform(request).andExpect(status().isBadRequest());
    }

    @Test
    void shouldNotUpdateAndReturn404WhenAliasDoesntExist() throws Exception {
        SecurityClearance scIn = new SecurityClearance(10, "Top Secret");

        ObjectMapper mapper = new ObjectMapper();
        String jsonIn = mapper.writeValueAsString(scIn);

        when(repository.update(any())).thenReturn(false);

        var request = put("/api/security/clearance/10").contentType(MediaType.APPLICATION_JSON).content(jsonIn);

        mvc.perform(request).andExpect(status().isNotFound());
    }

    // need to test delete after it is added
}
