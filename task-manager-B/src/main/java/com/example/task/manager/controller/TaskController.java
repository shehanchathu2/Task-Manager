package com.example.task.manager.controller;


import com.example.task.manager.model.*;
import com.example.task.manager.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public Task create (@RequestBody Task task , Authentication authentication){
        String email = authentication.getName();

        return taskService.create(task,email);
    }

    @GetMapping
    public Page<Task> getTasks(Authentication authentication , Pageable pageable){
        String email = authentication.getName();

        Role role = authentication.getAuthorities()
                .stream()
                .map(a ->Role.valueOf(a.getAuthority()))
                .findFirst()
                .orElse(Role.USER);

        return taskService.getTasks(email,role,pageable);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deteleTask(@PathVariable Long id){
        taskService.deleteTask(id);
        return ResponseEntity.ok( "Taks detele successufully");
    }
}
