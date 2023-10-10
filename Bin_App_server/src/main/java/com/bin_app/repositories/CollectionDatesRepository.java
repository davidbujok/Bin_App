package com.bin_app.repositories;

import com.bin_app.modules.CollectionDates;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollectionDatesRepository extends JpaRepository<CollectionDates, Long> {

}
