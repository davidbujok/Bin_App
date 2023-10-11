package com.bin_app.repositories;

import com.bin_app.modules.Street;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Repository
public interface StreetRepository extends JpaRepository<Street, Long> {


    List<Street> findByCollectionDatesDateGreaterThan(Date date);
}
