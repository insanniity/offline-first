package dev.insannity.offline_first.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dev.insannity.offline_first.dao.SyncPullRequest;
import dev.insannity.offline_first.dao.SyncPullResponse;
import dev.insannity.offline_first.dao.SyncPushRequest;
import dev.insannity.offline_first.dao.SyncPushResponse;
import dev.insannity.offline_first.services.SyncService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;




@RestController
@RequiredArgsConstructor
@SecurityRequirement(name = "Bearer Authentication")
@RequestMapping("/sync")
public class SyncController {


    private final SyncService syncService;


    @GetMapping
    public SyncPullResponse pull(
            @RequestParam(required = false) String lastPulledAt,
            @RequestParam(required = false) Integer schemaVersion,
            @RequestParam(required = false) String migration
        ) {
        SyncPullRequest request = new SyncPullRequest(lastPulledAt, schemaVersion, migration);
        return syncService.pull(request);
    }


    @PutMapping
    public SyncPushResponse push(
        @RequestBody SyncPushRequest request
        ) {
        return syncService.push(request);
    }
    



}
