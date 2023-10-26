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

        List<Street> expectedList = Arrays.asList(street2,street3);

        String searchVar = "street";

        given(streetRepository.findMax10Streets(searchVar)).willReturn(expectedList);

        mockMvc.perform(get("/streets?name={x}",searchVar)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]",hasSize(2)))
                .andExpect(jsonPath("$[*].name").isNotEmpty())
                .andExpect(jsonPath("$[*].postcode").isNotEmpty())
                .andExpect(jsonPath("$[*].recyclingAndWasteId").isNotEmpty())
                .andExpect(jsonPath("$[*].gardenWasteId").isNotEmpty())
                .andExpect(jsonPath("$[*].recyclingAndWasteUrl").isNotEmpty())
                .andExpect(jsonPath("$[*].gardenWasteUrl").isNotEmpty())
                .andExpect(jsonPath("$[*].collectionDates").isArray())
                .andExpect(jsonPath("$[*].collectionDates").isNotEmpty());
    }

    @Test
    public void testGetStreetAndDate_ShouldReturn200OK() throws Exception {
        Date date = new Date(2023,10,20);
        CollectionDates collectionDate1  =new CollectionDates("monday","friday","glass",date);
        Street street1 = new Street("street name", "EH6 5NQ", "monday","www.url.com");
        street1.setId(1L);
        List<CollectionDates> listOfColDates = Arrays.asList(collectionDate1);
        street1.setCollectionDates(listOfColDates);


        List<Street> expectedList = Arrays.asList(street1);

        given(streetRepository.find10Streets(street1.getName(),date)).willReturn(expectedList);

        mockMvc.perform(get("/streets?name=street name&date=39231120")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$",hasSize(1)))
                .andExpect(jsonPath("$[*].name").isNotEmpty())
                .andExpect(jsonPath("$[*].postcode").isNotEmpty())
                .andExpect(jsonPath("$[*].recyclingAndWasteId").isNotEmpty())
                .andExpect(jsonPath("$[*].gardenWasteId").isNotEmpty())
                .andExpect(jsonPath("$[*].recyclingAndWasteUrl").isNotEmpty())
                .andExpect(jsonPath("$[*].gardenWasteUrl").isNotEmpty())
                .andExpect(jsonPath("$[*].collectionDates").isArray())
                .andExpect(jsonPath("$[*].collectionDates").isNotEmpty());
    }
}
