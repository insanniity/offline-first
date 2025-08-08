package dev.insannity.offline_first.services;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
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
        Instant lastPulledAt = parseInstant(request.getLastPulledAt());

        response.setClientesChange(getClientesChange(lastPulledAt));
        
        return response;
    }
    

    public SyncPushResponse push(SyncPushRequest request) {
        SyncPushResponse response = new SyncPushResponse();

        ChangeObject<Cliente> changes = request.getChanges().getClientes();
        if (changes == null) {
            return response;
        }

        if (changes.getCreated() != null && !changes.getCreated().isEmpty()) {
            for (Cliente c : changes.getCreated()) {
                if (c.getDeleted_at() != null) {
                    c.setDeleted_at(null);
                }
                clienteRepository.save(c);
            }
        }

        if (changes.getUpdated() != null && !changes.getUpdated().isEmpty()) {
            for (Cliente c : changes.getUpdated()) {
                if (c.getId() == null || !clienteRepository.existsById(c.getId())) {
                    clienteRepository.save(c);
                } else {
                    clienteRepository.save(c);
                }
            }
        }

        if (changes.getDeleted() != null && !changes.getDeleted().isEmpty()) {
            for (String id : changes.getDeleted()) {
                clienteRepository.findById(id).ifPresent(entity -> {
                    if (entity.getDeleted_at() == null) {
                        entity.setDeleted_at(LocalDateTime.now());
                        clienteRepository.save(entity);
                    }
                });
            }
        }

        return response;
    }

    
    
    private ChangeObject<Cliente> getClientesChange(Instant data) {
        ChangeObject<Cliente> clienteChanges = new ChangeObject<>();
        List<Cliente> clientes =  new ArrayList<>();
        if(data == null){
            clientes = clienteRepository.findAll();
            for (Cliente cliente : clientes) {
                clienteChanges.addCreated(cliente);
            }
        }else{
            LocalDateTime localData = LocalDateTime.ofInstant(data, ZoneId.systemDefault());
            clientes = clienteRepository.findAllAfter(localData);
            for (Cliente cliente : clientes) {
                if(cliente.getDeleted_at() != null){
                    clienteChanges.addDeleted(cliente.getId());
                    continue;
                }
                if(cliente.getCreated_at().isAfter(localData) & cliente.getDeleted_at() == null){
                    clienteChanges.addCreated(cliente);
                    continue;
                }
                clienteChanges.addUpdated(cliente);
            }
        }

        return clienteChanges;
    }

    private Instant parseInstant(String value) {
        if (value == null || value.isBlank()) return null;
        try {
            return Instant.parse(value);
        } catch (Exception ignored) {
            try {
                String v = value.trim();
                long epoch = Long.parseLong(v);
                if (v.length() <= 10) {
                    return Instant.ofEpochSecond(epoch);
                }
                return Instant.ofEpochMilli(epoch);
            } catch (NumberFormatException e) {
                return null;
            }
        }
    }

    

}
