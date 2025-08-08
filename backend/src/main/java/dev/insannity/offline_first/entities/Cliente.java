package dev.insannity.offline_first.entities;


import lombok.*;
import lombok.experimental.FieldDefaults;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
public class Cliente {

    @Id
    @ToString.Include
    @EqualsAndHashCode.Include
    String id = new ObjectId().toString();

    String nome;
    String email;
    String cgc;
    String estado;
    String cidade;
    String endereco;


    @CreatedDate
    @Setter(value = AccessLevel.PROTECTED)
    LocalDateTime created_at = LocalDateTime.now();

    @LastModifiedDate
    @Setter(value = AccessLevel.PROTECTED)
    LocalDateTime updated_at = LocalDateTime.now();

    LocalDateTime deleted_at;

}
