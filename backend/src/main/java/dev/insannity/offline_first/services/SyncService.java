package dev.insannity.offline_first.services;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dev.insannity.offline_first.dao.ChangeObject;
import dev.insannity.offline_first.dao.ClienteDAO;
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

        ChangeObject<ClienteDAO> changes = request.getChanges().getClientes();
        if (changes == null) {
            return response;
        }

        if (changes.getCreated() != null && !changes.getCreated().isEmpty()) {
            for (ClienteDAO c : changes.getCreated()) {
                Cliente entity = new Cliente();
                copyClienteDtoToEntity(c, entity);
                clienteRepository.save(entity);
            }
        }

        if (changes.getUpdated() != null && !changes.getUpdated().isEmpty()) {
            for (ClienteDAO c : changes.getUpdated()) {
                Cliente entity = clienteRepository.findById(c.getId()).orElse(new Cliente());
                copyClienteDtoToEntity(c, entity);
                clienteRepository.save(entity);
            }
        }

        if (changes.getDeleted() != null && !changes.getDeleted().isEmpty()) {
            for (String id : changes.getDeleted()) {
                clienteRepository.findById(id).ifPresent(entity -> {
                    entity.setDeleted_at(LocalDateTime.now());
                    clienteRepository.save(entity);
                });
            }
        }

        return response;
    }

    
    
    private ChangeObject<ClienteDAO> getClientesChange(Instant data) {
        ChangeObject<ClienteDAO> clienteChanges = new ChangeObject<>();
        List<Cliente> clientes =  new ArrayList<>();
        if(data == null){
            clientes = clienteRepository.findAll();
            for (Cliente cliente : clientes) {
                clienteChanges.addCreated(new ClienteDAO(cliente));
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
                    clienteChanges.addCreated(new ClienteDAO(cliente));
                    continue;
                }
                clienteChanges.addUpdated(new ClienteDAO(cliente));
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

    private void copyClienteDtoToEntity(ClienteDAO dto, Cliente entity) {
        entity.setId(dto.getId());
        entity.setNome(dto.getNome());
        entity.setEmail(dto.getEmail());
        entity.setCgc(dto.getCgc());
        entity.setEstado(dto.getEstado());
        entity.setCidade(dto.getCidade());
        entity.setEndereco(dto.getEndereco());
        entity.setCreated_at(toLocalDateTime(dto.getCreated_at()));
        entity.setUpdated_at(toLocalDateTime(dto.getUpdated_at()));
        entity.setDeleted_at(toLocalDateTime(dto.getDeleted_at()));
    }

    private LocalDateTime toLocalDateTime(Long epoch) {
        if (epoch == null) return null;
        if (epoch <= 0) return null;
        Instant inst = epoch > 9_999_999_999L ? Instant.ofEpochMilli(epoch) : Instant.ofEpochSecond(epoch);
        return LocalDateTime.ofInstant(inst, ZoneId.systemDefault());
    }

}
