package com.bin_app.repositories;
import com.bin_app.modules.Street;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Date;
import java.util.List;

@Repository
public interface StreetRepository extends JpaRepository<Street, Long> {

    List<Street> findByNameContainsAndCollectionDatesDateGreaterThan(String streetName, Date date, PageRequest of);

    default List<Street> find10Streets(String streetName, Date date) {
        return findByNameContainsAndCollectionDatesDateGreaterThan(streetName, date, PageRequest.of(0,10));
    }

    @Query("SELECT s.name FROM Street s WHERE s.name LIKE %:streetName%")
    List<String> findByNameContains(@Param("streetName")String streetName, PageRequest of);

    @Query("SELECT s.name FROM Street s")
    List<String> findAllStreets();

    default List<String> findMax10Streets(String streetName) {
        return findByNameContains(streetName, PageRequest.of(0,10));
    }
    ;}
