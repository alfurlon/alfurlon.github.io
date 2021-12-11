package learn.field_agent.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import learn.field_agent.data.AliasRepository;
import learn.field_agent.models.Alias;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AliasControllerTest {

    @MockBean
    AliasRepository repository;

    @Autowired
    MockMvc mvc;

    @Test
    void shouldAdd() throws Exception {
        Alias aliasIn = makeAlias();
        aliasIn.setAliasId(0);
        Alias aliasOut = makeAlias();
        aliasOut.setAliasId(1);

        ObjectMapper mapper = new ObjectMapper();
        String jsonIn = mapper.writeValueAsString(aliasIn);
        String expectedJson = mapper.writeValueAsString(aliasOut);


        when(repository.add(any())).thenReturn(aliasOut);

        var request = post("/api/alias").contentType(MediaType.APPLICATION_JSON).content(jsonIn);

        mvc.perform(request).andExpect(status().isCreated()).andExpect(content().contentType(MediaType.APPLICATION_JSON)).andExpect(content().json(expectedJson));

    }

    @Test
    void shouldNotAddInvalidAlias() throws Exception {
        Alias aliasIn = makeAlias();
        aliasIn.setAliasId(3);

        ObjectMapper mapper = new ObjectMapper();
        String jsonIn = mapper.writeValueAsString(aliasIn);

        var request = post("/api/alias").contentType(MediaType.APPLICATION_JSON).content(jsonIn);

        mvc.perform(request).andExpect(status().isBadRequest());
    }

    @Test
    void shouldUpdateAlias() throws Exception {
        Alias aliasIn = makeAlias();
        aliasIn.setAliasId(1);

        when(repository.update(any())).thenReturn(true);

        ObjectMapper mapper = new ObjectMapper();
        String jsonIn = mapper.writeValueAsString(aliasIn);

        var request = put("/api/alias/1").contentType(MediaType.APPLICATION_JSON).content(jsonIn);

        mvc.perform(request).andExpect(status().isNoContent());
    }

    @Test
    void shouldNotUpdateAndShouldReturn409WhenIdsDontMatch() throws Exception {
        Alias aliasIn = makeAlias();
        aliasIn.setAliasId(1);

        ObjectMapper mapper = new ObjectMapper();
        String jsonIn = mapper.writeValueAsString(aliasIn);

        var request = put("/api/alias/2").contentType(MediaType.APPLICATION_JSON).content(jsonIn);

        mvc.perform(request).andExpect(status().isConflict());
    }

    @Test
    void shouldNotUpdateAndReturn400WhenInvalid() throws Exception {
        Alias aliasIn = makeAlias();
        aliasIn.setAliasId(1);
        aliasIn.setName("");

        when(repository.update(any())).thenReturn(true);

        ObjectMapper mapper = new ObjectMapper();
        String jsonIn = mapper.writeValueAsString(aliasIn);

        var request = put("/api/alias/1").contentType(MediaType.APPLICATION_JSON).content(jsonIn);

        mvc.perform(request).andExpect(status().isBadRequest());
    }

    @Test
    void shouldNotUpdateAndReturn404WhenAliasDoesntExist() throws Exception {
        Alias aliasIn = makeAlias();
        aliasIn.setAliasId(10);

        ObjectMapper mapper = new ObjectMapper();
        String jsonIn = mapper.writeValueAsString(aliasIn);

        when(repository.update(any())).thenReturn(false);

        var request = put("/api/alias/10").contentType(MediaType.APPLICATION_JSON).content(jsonIn);

        mvc.perform(request).andExpect(status().isNotFound());
    }

    @Test
    void shouldDeleteAlias() throws Exception {
        when(repository.deleteById(anyInt())).thenReturn(true);

        var request = delete("/api/alias/1");

        mvc.perform(request).andExpect(status().isNoContent());
    }

    @Test
    void shouldNotDeleteAlias() throws Exception {
        when(repository.deleteById(anyInt())).thenReturn(false);

        var request = delete("/api/alias/2");

        mvc.perform(request).andExpect(status().isNotFound());
    }

    private Alias makeAlias() {
        Alias alias = new Alias();
        alias.setName("Boss");
        alias.setPersona(null);
        alias.setAgentId(4);
        return alias;
    }
}
