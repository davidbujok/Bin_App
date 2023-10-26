package com.bin_app;

import com.bin_app.modules.CollectionDates;
import com.bin_app.modules.Street;
import com.bin_app.repositories.CollectionDatesRepository;
import com.bin_app.repositories.StreetRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import javax.print.attribute.standard.Media;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.mockito.BDDMockito.given;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class StreetControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private StreetRepository streetRepository;

    @MockBean
    private CollectionDatesRepository collectionDatesRepository;

    @Test
    public void testGetStreetByName_ShouldReturn200OK() throws Exception{
        Street street1 = new Street("llll", "EH6 5NQ", "monday","www.url.com");
        street1.setId(1L);

        Street street2 = new Street("street name2", "EH6 5NQ", "monday","www.url.com");
        street2.setId(2L);

        Street street3 = new Street("street name3", "", "monday","www.url.com");
        street3.setId(3L);

        List<String> expectedList = Arrays.asList(street2.getName(),street3.getName());

        String searchVar = "street";

        given(streetRepository.findMax10Streets(searchVar)).willReturn(expectedList);

        mockMvc.perform(get("/streets?name={x}",searchVar)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$",hasSize(2)))
                .andExpect(jsonPath("$[*]").isArray())
                .andExpect(jsonPath("$[*]").value(everyItem(is(anyOf(instanceOf(String.class), is(nullValue()))))));
    }
}
