package dev.insannity.offline_first.dao;

import java.time.Instant;

import dev.insannity.offline_first.entities.Cliente;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@EqualsAndHashCode
@ToString
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
public class SyncPullResponse {

    Changes changes = new Changes();
    Instant timestamp = Instant.now();


    public void setClientesChange (ChangeObject<Cliente> clienteChanges){
        this.changes.setClientes(clienteChanges);
    }


}
