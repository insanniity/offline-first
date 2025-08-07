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

    @Query("{ 'deletado': null }")
    List<Cliente> findAllNotDeleted();

    @Query("{ 'deletado': null }")
    Page<Cliente> findAllNotDeleted(Pageable pageable);

    @Query("{ '_id': ?0, 'deletado': null }")
    Optional<Cliente> findByIdNotDeleted(String id);

    @Query(value = "{ 'deletado': null }", count = true)
    long countNotDeleted();

    @Query("{ 'atualizado': { $gt: ?0 }}")
    List<Cliente> findAllAfter(LocalDateTime atualizado);

}
