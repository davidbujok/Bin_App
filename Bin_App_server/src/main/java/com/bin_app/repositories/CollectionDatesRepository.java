package com.bin_app.repositories;
import com.bin_app.modules.CollectionDates;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface CollectionDatesRepository extends JpaRepository<CollectionDates, Long> {

    List<CollectionDates> findCollectionDatesByStreetsNameAndDateGreaterThanOrderByDateAsc(String streetName,Date date);


}
