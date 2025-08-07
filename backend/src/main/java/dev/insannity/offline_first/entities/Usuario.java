package dev.insannity.offline_first.entities;

import java.time.LocalDateTime;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import dev.insannity.offline_first.enums.Role;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PROTECTED)
@Document("usuarios")
public class Usuario {

    @Id
    @ToString.Include
    @EqualsAndHashCode.Include
    String id = new ObjectId().toString();
    String nome;
    String usuario;
    String senha;
    Role role = Role.ADMIN;

    @CreatedDate
    @Setter(value = AccessLevel.PROTECTED)
    LocalDateTime criado = LocalDateTime.now();

    @LastModifiedDate
    @Setter(value = AccessLevel.PROTECTED)
    LocalDateTime atualizado;

    LocalDateTime deletado;


}
