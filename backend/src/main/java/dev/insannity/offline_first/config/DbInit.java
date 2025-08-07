package dev.insannity.offline_first.config;

import dev.insannity.offline_first.entities.Usuario;
import dev.insannity.offline_first.enums.Role;
import dev.insannity.offline_first.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DbInit implements ApplicationRunner {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) throws Exception {

        List<Usuario> usuarios = usuarioRepository.findAll();

        if(usuarios.isEmpty()) {
            Usuario usuario = new Usuario();
            usuario.setUsuario("admin");
            usuario.setSenha(passwordEncoder.encode("123456"));
            usuario.setNome("Administrador");
            usuario.setRole(Role.ADMIN);
            usuarioRepository.save(usuario);
        }

    }

}
