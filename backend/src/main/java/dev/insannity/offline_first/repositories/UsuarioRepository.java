package dev.insannity.offline_first.repositories;

import dev.insannity.offline_first.entities.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends MongoRepository<Usuario, String> {

    Optional<Usuario> findByUsuarioAndDeletadoIsNull(String usuario);

}
