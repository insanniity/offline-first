package dev.insannity.offline_first.repositories;

import dev.insannity.offline_first.entities.Cliente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;


public interface ClienteRepository extends MongoRepository<Cliente, String> {

    @Query("{ 'deleted_at': null }")
    List<Cliente> findAllNotDeleted();

    @Query("{ 'deleted_at': null }")
    Page<Cliente> findAllNotDeleted(Pageable pageable);

    @Query("{ '_id': ?0, 'deleted_at': null }")
    Optional<Cliente> findByIdNotDeleted(String id);

    @Query(value = "{ 'deleted_at': null }", count = true)
    long countNotDeleted();

    @Query("{ 'updated_at': { $gt: ?0 }}")
    List<Cliente> findAllAfter(LocalDateTime atualizado);

}
