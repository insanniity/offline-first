package dev.insannity.offline_first.dao;


import dev.insannity.offline_first.entities.Cliente;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.time.ZoneOffset;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
public class ClienteDAO {

    String id;
    String nome;
    String email;
    String cgc;
    String estado;
    String cidade;
    String endereco;
    Long created_at;
    Long updated_at;
    Long deleted_at;


    public ClienteDAO(Cliente entity){
        this.id = entity.getId();
        this.nome = entity.getNome();
        this.email = entity.getEmail();
        this.cgc = entity.getCgc();
        this.estado = entity.getEstado();
        this.cidade = entity.getCidade();
        this.endereco = entity.getEndereco();
        this.created_at = (entity.getCreated_at() != null) ? entity.getCreated_at().toEpochSecond(ZoneOffset.UTC) : null;
        this.updated_at = (entity.getUpdated_at() != null) ? entity.getUpdated_at().toEpochSecond(ZoneOffset.UTC) : null;
        this.deleted_at = (entity.getDeleted_at() != null) ? entity.getDeleted_at().toEpochSecond(ZoneOffset.UTC) : null;
    }


}
