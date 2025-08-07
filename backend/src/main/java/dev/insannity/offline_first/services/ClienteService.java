package dev.insannity.offline_first.services;

import dev.insannity.offline_first.entities.Cliente;
import dev.insannity.offline_first.repositories.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ClienteService {

    private final ClienteRepository repository;

    public Cliente criar(Cliente cliente) {
        return repository.save(cliente);
    }

    @Transactional(readOnly = true)
    public List<Cliente> listarTodos() {
        return repository.findAllNotDeleted();
    }

    @Transactional(readOnly = true)
    public Page<Cliente> listarTodos(Pageable pageable) {
        return repository.findAllNotDeleted(pageable);
    }

    @Transactional(readOnly = true)
    public Optional<Cliente> buscarPorId(String id) {
        return repository.findByIdNotDeleted(id);
    }

    public Cliente atualizar(String id, Cliente cliente) {
        return repository.findByIdNotDeleted(id)
                .map(clienteExistente -> {
                    clienteExistente.setNome(cliente.getNome());
                    clienteExistente.setEmail(cliente.getEmail());
                    clienteExistente.setCgc(cliente.getCgc());
                    clienteExistente.setEstado(cliente.getEstado());
                    clienteExistente.setCidade(cliente.getCidade());
                    clienteExistente.setEndereco(cliente.getEndereco());
                    return repository.save(clienteExistente);
                })
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado com ID: " + id));
    }

    public void deletar(String id) {
        repository.findByIdNotDeleted(id)
                .map(cliente -> {
                    cliente.setDeletado(LocalDateTime.now());
                    return repository.save(cliente);
                })
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado com ID: " + id));
    }

    @Transactional(readOnly = true)
    public boolean existe(String id) {
        return repository.findByIdNotDeleted(id).isPresent();
    }

    @Transactional(readOnly = true)
    public long contar() {
        return repository.countNotDeleted();
    }
}
