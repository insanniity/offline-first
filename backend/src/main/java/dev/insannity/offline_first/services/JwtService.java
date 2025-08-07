package dev.insannity.offline_first.services;

import java.time.Instant;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import dev.insannity.offline_first.entities.Usuario;
import dev.insannity.offline_first.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JwtService {


    @Value("${jwt.expiration.days}")
    private Integer dias;
    @Value("${jwt.refresh.expiration}")
    private Integer refreshExpiration;
    @Value("${jwt.issuer}")
    private String issuer;

    private final JwtEncoder jwtEncoder;
    private final JwtDecoder jwtDecoder;
    private final UsuarioRepository usuarioRepository;

    public String generateToken(){
        Instant now = Instant.now();

        var usuario = getUsuario();
        String name = usuario.getNome();

        String scope = usuario.getRole().toString();

        var claims = JwtClaimsSet.builder()
                .issuer(issuer)
                .subject(usuario.getUsuario())
                .issuedAt(now)
                .expiresAt(now.plusSeconds(60L * 60 * 24 * dias))
                .claim("name", name)
                .claim("scope", scope)
                .claim("id", usuario.getId())
                .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

    }

    public String generateRefreshToken(){
        var usuario = getUsuario();

        var claims = JwtClaimsSet.builder()
                .issuer(issuer)
                .subject(usuario.getUsuario())
                .issuedAt(Instant.now())
                .expiresAt(Instant.now().plusSeconds(60L * 60 * 24 * refreshExpiration))
                .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }


    public String extractUserName(String token){
        var tokenDecoded = decodeJwt(token);
        return tokenDecoded.getSubject();
    }

    public boolean isTokenValid(String token, UserDetails userDetails){
        final String username = extractUserName(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        var tokenDecoded = decodeJwt(token);
        return Objects.requireNonNull(tokenDecoded.getExpiresAt()).isBefore(Instant.now());
    }

    private Jwt decodeJwt(String token){
        return jwtDecoder.decode(token);
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
