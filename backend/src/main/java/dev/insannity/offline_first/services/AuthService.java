package dev.insannity.offline_first.services;

import dev.insannity.offline_first.dao.AuthenticationResponse;
import dev.insannity.offline_first.dao.LoginRequest;
import dev.insannity.offline_first.entities.Usuario;
import dev.insannity.offline_first.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Transactional
@Service("authService")
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse signIn (LoginRequest loginRequest){
        try {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsuario(),loginRequest.getSenha()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            var jwt = jwtService.generateToken();
            var refreshToken = jwtService.generateRefreshToken();

            AuthenticationResponse jwtAuthenticationResponse = new AuthenticationResponse();
            jwtAuthenticationResponse.setAccessToken(jwt);
            jwtAuthenticationResponse.setRefreshToken(refreshToken);

            return jwtAuthenticationResponse;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public Usuario getUsuario() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            return usuarioRepository.findByUsuarioAndDeletadoIsNull(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("Usuario não encontrado"));
        } catch (Exception e) {
            throw new RuntimeException("Usuario não encontrado");
        }
    }


}
