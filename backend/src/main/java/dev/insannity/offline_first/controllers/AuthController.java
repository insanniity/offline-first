package dev.insannity.offline_first.controllers;

import dev.insannity.offline_first.dao.AuthenticationResponse;
import dev.insannity.offline_first.dao.LoginRequest;
import dev.insannity.offline_first.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginRequest signInRequest){
        return ResponseEntity.ok(authenticationService.signIn(signInRequest));
    }

}

