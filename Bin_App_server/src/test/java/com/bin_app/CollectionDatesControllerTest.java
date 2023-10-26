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

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
public class CollectionDatesControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private StreetRepository streetRepository;

    @MockBean
    private CollectionDatesRepository collectionDatesRepository;


    @Test
    public void testGetStreetAndDate_ShouldReturn200OK() throws Exception {
        Date date = new Date(2023,10,20);
        CollectionDates collectionDate1  =new CollectionDates("monday","friday","glass",date);
        Street street1 = new Street("RandomStreet", "EH6 5NQ", "monday","www.url.com");
        street1.setId(1L);
        List<CollectionDates> listOfColDates = Arrays.asList(collectionDate1);
        street1.setCollectionDates(listOfColDates);


        List<CollectionDates> expectedList = street1.getCollectionDates();

        given(collectionDatesRepository.findCollectionDatesByStreetsNameAndDateGreaterThanOrderByDateAsc(street1.getName(),date)).willReturn(expectedList);

        mockMvc.perform(get("/collectionDates?street=RandomStreet&date=39231120")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$",hasSize(1)))
                .andExpect(jsonPath("$[*].recyclingCalendar").isNotEmpty())
                .andExpect(jsonPath("$[*].gardenCalendar").isNotEmpty())
                .andExpect(jsonPath("$[*].binType").isNotEmpty())
                .andExpect(jsonPath("$[*].date").isNotEmpty());
    }
}
