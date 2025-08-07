package dev.insannity.offline_first.services;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dev.insannity.offline_first.dao.ChangeObject;
import dev.insannity.offline_first.dao.SyncPullRequest;
import dev.insannity.offline_first.dao.SyncPullResponse;
import dev.insannity.offline_first.dao.SyncPushRequest;
import dev.insannity.offline_first.dao.SyncPushResponse;
import dev.insannity.offline_first.entities.Cliente;
import dev.insannity.offline_first.repositories.ClienteRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class SyncService {

    private final ClienteRepository clienteRepository;

    public SyncPullResponse pull(SyncPullRequest request) {
        SyncPullResponse response = new SyncPullResponse();

        response.setClientesChange(getClientesChange(request.getTimestamp()));
        
        return response;
    }
    

    public SyncPushResponse push(SyncPushRequest request) {
        return new SyncPushResponse();
    }

    
    
    private ChangeObject<Cliente> getClientesChange(Instant data) {
        ChangeObject<Cliente> clienteChanges = new ChangeObject<>();
        LocalDateTime localData = LocalDateTime.ofInstant(data, ZoneId.systemDefault());
        List<Cliente> clientes = clienteRepository.findAllAfter(localData);

        for (Cliente cliente : clientes) {
            if(cliente.getDeletado() != null){
                clienteChanges.addDeleted(cliente.getId());
                continue;
            }
            if(cliente.getCriado().isAfter(localData) & cliente.getDeletado() == null){
                clienteChanges.addCreated(cliente);
                continue;
            }
            clienteChanges.addUpdated(cliente);
        }

        return clienteChanges;
    }


}
