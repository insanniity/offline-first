package dev.insannity.offline_first.services;

import dev.insannity.offline_first.entities.AuthUsuario;
import dev.insannity.offline_first.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UsuarioDetail implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String usuario) throws UsernameNotFoundException {
        return usuarioRepository.findByUsuarioAndDeletadoIsNull(usuario).map(AuthUsuario::new).orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
    }

}
